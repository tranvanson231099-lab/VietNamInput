import { processKey } from "./vietnameseEngine.js";

let contextID = -1;

// ===== FOCUS =====
chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
});

// ===== BLUR =====
chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
});

// ===== KEY EVENT =====
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  // cho phép Ctrl / Alt
  if (keyData.ctrlKey || keyData.altKey || keyData.metaKey) {
    return false;
  }

  const result = processKey(keyData.key, keyData.code);

  // ===== ADD =====
  if (result.action === "add") {
    chrome.input.ime.commitText({
      contextID,
      text: result.text
    });
    return true;
  }

  // ===== REPLACE =====
  if (result.action === "replace") {

    chrome.input.ime.deleteSurroundingText({
      contextID,
      offset: -result.replaceLength,
      length: result.replaceLength
    });

    chrome.input.ime.commitText({
      contextID,
      text: result.text
    });

    return true;
  }

  return false;
});