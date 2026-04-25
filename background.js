let contextID = -1;
let composingText = "";

// ===== FOCUS =====
chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
  console.log("Focus:", contextID);
});

// ===== BLUR =====
chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
  composingText = "";
  console.log("Blur");
});

// ===== UPDATE COMPOSITION =====
function updateComposition(text) {
  if (contextID === -1) return;

  const safeText = text || "";

  chrome.input.ime.setComposition({
    contextID,
    text: safeText,
    cursor: safeText.length // 🔥 luôn đúng, không crash
  });
}

// ===== COMMIT =====
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

// ===== KEY EVENT =====
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  // 🔥 CHO PHÉP PHÍM CHỨC NĂNG
  if (keyData.ctrlKey || keyData.altKey || keyData.metaKey) {
    return false;
  }

  console.log("Key:", keyData.key, "Code:", keyData.code);

  // ===== BACKSPACE =====
  if (keyData.code === "Backspace") {
    if (composingText.length > 0) {
      composingText = composingText.slice(0, -1);
      updateComposition(composingText);
      return true;
    }
    return false;
  }

  // ===== ENTER =====
  if (keyData.code === "Enter") {
    if (composingText.length > 0) {
      commitText(composingText);
      return true;
    }
    return false;
  }

  // ===== SPACE =====
  if (keyData.code === "Space") {
    commitText(composingText + " ");
    return true;
  }

  // ===== CHỈ NHẬN CHỮ =====
  if (
    keyData.key &&
    keyData.key.length === 1 &&
    /[a-zA-Z]/.test(keyData.key)
  ) {
    composingText += keyData.key;
    updateComposition(composingText);
    return true;
  }

  // ===== PHÍM KHÁC =====
  return false;
});