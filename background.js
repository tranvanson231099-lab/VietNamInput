let contextID = -1;
let composingText = "";

// focus vào input
chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
  console.log("Focus:", contextID);
});

// blur (rời input)
chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
  composingText = "";
  console.log("Blur");
});

// hàm update composition (🔥 fix lỗi cursor)
function updateComposition(text) {
  if (contextID === -1) return;

  const safeText = text || "";
  const cursor = Math.min(safeText.length, safeText.length); // luôn hợp lệ

  chrome.input.ime.setComposition({
    contextID,
    text: safeText,
    cursor: cursor
  });
}

// commit text
function commitText(text) {
  if (contextID === -1) return;

  chrome.input.ime.commitText({
    contextID,
    text: text
  });

  composingText = "";

  chrome.input.ime.clearComposition({
    contextID
  });
}

// bắt phím
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  console.log("Key:", keyData.key, "Code:", keyData.code);

  // 🔥 BACKSPACE (fix lỗi "?")
  if (keyData.code === "Backspace") {
    if (composingText.length > 0) {
      composingText = composingText.slice(0, -1);
      updateComposition(composingText);
      return true;
    }
    return false;
  }

  // 🔥 ENTER
  if (keyData.code === "Enter") {
    if (composingText.length > 0) {
      commitText(composingText);
      return true;
    }
    return false;
  }

  // 🔥 SPACE
  if (keyData.code === "Space") {
    commitText(composingText + " ");
    return true;
  }

  // 🔥 chỉ nhận chữ cái (tránh "?")
  if (
    keyData.key &&
    keyData.key.length === 1 &&
    /[a-zA-Z]/.test(keyData.key)
  ) {
    composingText += keyData.key;
    updateComposition(composingText);
    return true;
  }

  return false;
});