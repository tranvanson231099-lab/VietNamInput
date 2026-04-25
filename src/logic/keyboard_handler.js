
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

    // Check if chrome.input.ime and its methods are available before using them
    if (chrome.input && chrome.input.ime) {
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
}

/**
 * "Commit" (chấp nhận) văn bản và xóa vùng bôi đen.
 */
function commitText(text) {
    if (contextID !== 0 && chrome.input && chrome.input.ime) {
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

    try {
        if (chrome.input && chrome.input.ime) {
            await chrome.input.ime.clearComposition({ contextID: context.contextID });
        }
    } catch (e) {
        console.warn(`Could not clear composition on context ${context.contextID}. This is usually safe to ignore.`, e);
    }

    resetInternalState();
}

function onBlur(blurredContextID) {
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

// --- Hàm Export Chính ---

/**
 * Đăng ký tất cả các hàm lắng nghe sự kiện của IME.
 */
export function registerImeListeners() {
    if (!chrome.input || !chrome.input.ime) {
        console.error("`chrome.input.ime` API is not available. Cannot register listeners.");
        return;
    }

    // Register listeners individually and check for their existence
    if (chrome.input.ime.onFocus) {
        chrome.input.ime.onFocus.addListener(onFocus);
    } else {
        console.error("`onFocus` listener is not available.");
    }

    if (chrome.input.ime.onBlur) {
        chrome.input.ime.onBlur.addListener(onBlur);
    } else {
        console.error("`onBlur` listener is not available.");
    }

    if (chrome.input.ime.onKeyEvent) {
        chrome.input.ime.onKeyEvent.addListener(onKeyEvent);
    } else {
        console.error("`onKeyEvent` listener is not available.");
    }

    console.log("Finished attempting to register IME listeners.");
}
