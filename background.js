let contextID = -1;

chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
});

chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  // cho phép Ctrl / Alt
  if (keyData.ctrlKey || keyData.altKey || keyData.metaKey) {
    return false;
  }

  // Backspace → hệ thống xử lý
  if (keyData.code === "Backspace") {
    return false;
  }

  // Enter → hệ thống xử lý
  if (keyData.code === "Enter") {
    return false;
  }

  // Space → hệ thống xử lý
  if (keyData.code === "Space") {
    return false;
  }

  // chỉ xử lý chữ
  if (
    keyData.key &&
    keyData.key.length === 1 &&
    /[a-zA-Z]/.test(keyData.key)
  ) {
    chrome.input.ime.commitText({
      contextID,
      text: keyData.key
    });

    return true;
  }

  return false;
});