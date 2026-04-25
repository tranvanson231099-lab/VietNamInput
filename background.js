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

  // cho phép Ctrl / Alt / Meta
  if (keyData.ctrlKey || keyData.altKey || keyData.metaKey) {
    return false;
  }

  // 🔥 CHỈ xử lý chữ a-z
  const isLetter =
    keyData.key &&
    keyData.key.length === 1 &&
    /^[a-zA-Z]$/.test(keyData.key);

  if (isLetter) {
    chrome.input.ime.commitText({
      contextID,
      text: keyData.key
    });

    return true; // chặn Chrome gõ lại
  }

  // 🔥 tất cả phím khác → hệ thống xử lý
  return false;
});