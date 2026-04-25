
import { findLastWord } from './word_selector.js';

// --- Trạng thái của Module ---

let contextID = 0; // ID của ô nhập liệu đang được focus
let compositionText = ""; // Chuỗi văn bản đang được gõ

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

    const lastWordInfo = findLastWord(compositionText);

    if (lastWordInfo) {
        chrome.input.ime.setComposition({
            contextID: contextID,
            text: compositionText,
            cursor: compositionText.length,
            selectionStart: lastWordInfo.start,
            selectionEnd: lastWordInfo.end
        });
    } else {
         chrome.input.ime.setComposition({
            contextID: contextID,
            text: compositionText,
            cursor: compositionText.length,
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
    }
}

// --- Các Hàm Lắng Nghe Sự Kiện IME ---

function onFocus(context) {
    console.log("IME focused:", context);
    contextID = context.contextID;
    resetComposition();
}

function onBlur(blurredContextID) {
    console.log("IME blurred, context ID:", blurredContextID);
    resetComposition();
    contextID = 0;
}

function onKeyEvent(engineID, keyData) {
    if (keyData.type !== 'keydown') {
        return false;
    }

    if (keyData.key === ' ' || keyData.key === 'Enter') {
        commitText(compositionText + (keyData.key === ' ' ? ' ' : ''));
        return true;
    }

    if (keyData.key === 'Backspace') {
        if (compositionText.length > 0) {
            compositionText = compositionText.slice(0, -1);
            updateComposition();
            return true;
        }
        return false;
    }

    if (keyData.key.length === 1 && !keyData.ctrlKey && !keyData.altKey) {
        compositionText += keyData.key;
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
