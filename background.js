import { processKey } from "./vietnameseEngine.js";

let contextID = -1;

// focus
chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
});

// blur
chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
});

// key event
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  // cho phép Ctrl
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
    chrome.input.ime.commitText({
      contextID,
      text: "\b" + result.text
    });
    return true;
  }

  return false;
});