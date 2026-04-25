let contextID = -1;
let composingText = "";

chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  // Backspace
  if (keyData.key === "Backspace") {
    composingText = composingText.slice(0, -1);

    chrome.input.ime.setComposition({
      contextID,
      text: composingText,
      cursor: composingText.length
    });

    return true;
  }

  // Space → commit
  if (keyData.key === " ") {
    chrome.input.ime.commitText({
      contextID,
      text: composingText + " "
    });

    composingText = "";

    chrome.input.ime.clearComposition({
      contextID
    });

    return true;
  }

  // ký tự thường
  if (keyData.key.length === 1) {
    composingText += keyData.key;

    chrome.input.ime.setComposition({
      contextID,
      text: composingText,
      cursor: composingText.length
    });

    return true;
  }

  return false;
});