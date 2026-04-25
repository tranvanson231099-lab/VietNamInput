
import { findWordAtCursor } from './word_selector.js';
import { CompositionBuffer } from '../input_engine/composition_buffer.js';

// --- Trạng thái của Module ---

let contextID = 0; // ID của ô nhập liệu đang được focus
let compositionText = ""; // Chuỗi văn bản đang được gõ
let cursorPosition = 0; // Vị trí của con trỏ trong chuỗi compositionText

const compositionBuffer = new CompositionBuffer(); // Bộ đệm cho từ đang được xử lý

// --- Các Hàm Xử Lý Logic ---

/**
 * Đặt lại trạng thái nội bộ của bộ gõ (văn bản, con trỏ, bộ đệm).
 * Hàm này không thực hiện bất kỳ lệnh gọi API nào và an toàn để gọi từ bất kỳ đâu.
 */
function resetInternalState() {
    compositionText = "";
    cursorPosition = 0;
    compositionBuffer.clear();
}

/**
 * Cập nhật vùng được bôi đen (composition) trong ô nhập liệu.
 */
function updateComposition() {
    if (contextID === 0) return;

    const wordInfo = findWordAtCursor(compositionText, cursorPosition);

    if (wordInfo) {
        compositionBuffer.setText(wordInfo.word);
    } else {
        compositionBuffer.clear();
    }

    console.log("Buffer [DEBUG]:", compositionBuffer.getContent());

    if (wordInfo) {
        chrome.input.ime.setComposition({
            contextID: contextID,
            text: compositionText,
            cursor: cursorPosition,
            selectionStart: wordInfo.start,
            selectionEnd: wordInfo.end
        });
    } else {
         chrome.input.ime.setComposition({
            contextID: contextID,
            text: compositionText,
            cursor: cursorPosition,
        });
    }
}

/**
 * "Commit" (chấp nhận) văn bản và xóa vùng bôi đen.
 */
function commitText(text) {
    if (contextID !== 0) {
        chrome.input.ime.commitText({
            contextID: contextID,
            text: text
        });
        // Sau khi commit, API đã tự xóa vùng composition. Chúng ta chỉ cần reset trạng thái nội bộ.
        resetInternalState();
    }
}

// --- Các Hàm Lắng Nghe Sự Kiện IME ---

async function onFocus(context) {
    contextID = context.contextID;

    // FIX: Bọc lệnh gọi API không ổn định trong try-catch để ngăn chặn crash.
    // Lỗi "Context is not active" có thể xảy ra trong các trường hợp race condition
    // khi người dùng chuyển focus quá nhanh.
    try {
        // Cố gắng xóa mọi composition còn sót lại trên UI một cách chủ động.
        await chrome.input.ime.clearComposition({ contextID: context.contextID });
    } catch (e) {
        console.warn(`Could not clear composition on context ${context.contextID}. This is usually safe to ignore.`, e);
    }

    // Luôn reset trạng thái nội bộ để chuẩn bị cho lần gõ mới.
    resetInternalState();
}

function onBlur(blurredContextID) {
    // Khi một ô bị mất focus, context đó không còn hoạt động. ĐỪNG gọi API trên nó.
    // Chỉ cần reset trạng thái nội bộ nếu context bị blur là context chúng ta đang theo dõi.
    if (contextID === blurredContextID) {
        resetInternalState();
        contextID = 0;
    }
}

function onKeyEvent(engineID, keyData) {
    if (keyData.type !== 'keydown') {
        return false;
    }

    if (keyData.key === 'ArrowLeft') {
        cursorPosition = Math.max(0, cursorPosition - 1);
        updateComposition();
        return true;
    }
    if (keyData.key === 'ArrowRight') {
        cursorPosition = Math.min(compositionText.length, cursorPosition + 1);
        updateComposition();
        return true;
    }

    if (keyData.key === ' ') {
        commitText(compositionText + ' ');
        return true;
    }

    if (keyData.key === 'Enter') {
        if (compositionText.length > 0) {
            commitText(compositionText);
        }
        return false;
    }

    if (keyData.key === 'Backspace') {
        if (cursorPosition > 0) {
            const beforeCursor = compositionText.substring(0, cursorPosition - 1);
            const afterCursor = compositionText.substring(cursorPosition);
            compositionText = beforeCursor + afterCursor;
            cursorPosition--;
            updateComposition();
            return true;
        }
        return false;
    }

    if (keyData.key.length === 1 && !keyData.ctrlKey && !keyData.altKey) {
        const beforeCursor = compositionText.substring(0, cursorPosition);
        const afterCursor = compositionText.substring(cursorPosition);
        compositionText = beforeCursor + keyData.key + afterCursor;
        cursorPosition++;
        updateComposition();
        return true;
    }

    return false;
}

function onCursorUpdate(properties) {
    // Khi người dùng nhấp chuột hoặc di chuyển con trỏ trong vùng soạn thảo,
    // cập nhật lại vị trí con trỏ và tính toán lại vùng bôi đen.
    if (contextID !== 0 && properties.visible) {
        cursorPosition = properties.cursor;
        updateComposition();
    }
}

// --- Hàm Export Chính ---

/**
 * Đăng ký tất cả các hàm lắng nghe sự kiện của IME.
 */
export function registerImeListeners() {
    // Defensive check to ensure the IME API is available
    if (chrome.input && chrome.input.ime) {
        chrome.input.ime.onFocus.addListener(onFocus);
        chrome.input.ime.onBlur.addListener(onBlur);
        chrome.input.ime.onKeyEvent.addListener(onKeyEvent);
        chrome.input.ime.onCursorUpdate.addListener(onCursorUpdate);
        console.log("IME listeners registered successfully.");
    } else {
        console.error("`chrome.input.ime` API is not available. This is unexpected. Check the extension's permissions and context.");
    }
}
