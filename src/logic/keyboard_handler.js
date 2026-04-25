
import { findWordAtCursor } from './word_selector.js';

// --- Trạng thái của Module ---

let contextID = 0; // ID của ô nhập liệu đang được focus
let compositionText = ""; // Chuỗi văn bản đang được gõ
let cursorPosition = 0; // Vị trí của con trỏ trong chuỗi compositionText

// --- Các Hàm Xử Lý Logic ---

/**
 * Cập nhật vùng được bôi đen (composition) trong ô nhập liệu.
 */
function updateComposition() {
    if (contextID === 0) return;

    if (compositionText === "") {
         chrome.input.ime.clearComposition({ contextID: contextID });
         return;
    }

    const wordInfo = findWordAtCursor(compositionText, cursorPosition);

    // DEBUG: In ra kết quả của selector để gỡ lỗi
    console.log("Selector [DEBUG]:", { 
        text: compositionText, 
        cursor: cursorPosition, 
        result: wordInfo 
    });

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
        resetComposition();
    }
}

/**
 * Xóa sạch trạng thái của composition.
 */
function resetComposition() {
    if (compositionText) {
         chrome.input.ime.clearComposition({ contextID: contextID });
         compositionText = "";
         cursorPosition = 0;
    }
}

// --- Các Hàm Lắng Nghe Sự Kiện IME ---

function onFocus(context) {
    contextID = context.contextID;
    resetComposition();
}

function onBlur(blurredContextID) {
    resetComposition();
    contextID = 0;
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
    chrome.input.ime.onFocus.addListener(onFocus);
    chrome.input.ime.onBlur.addListener(onBlur);
    chrome.input.ime.onKeyEvent.addListener(onKeyEvent);
}
