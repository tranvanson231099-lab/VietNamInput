let contextID = -1;
let composingText = "";

// Khi focus vào input
chrome.input.ime.onFocus.addListener((context) => {
  contextID = context.contextID;
  console.log("Focus:", contextID);
});

// Khi rời input
chrome.input.ime.onBlur.addListener(() => {
  contextID = -1;
  composingText = "";
  console.log("Blur");
});

// Bắt sự kiện bàn phím
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  if (keyData.type !== "keydown") return false;

  console.log("KeyData:", keyData);

  // 🔥 BACKSPACE (fix bug ra "?")
  if (keyData.code === "Backspace") {
    if (composingText.length > 0) {
      composingText = composingText.slice(0, -1);

      chrome.input.ime.setComposition({
        contextID,
        text: composingText,
        cursor: composingText.length
      });
    } else {
      // nếu không còn gì để xoá → cho Chrome xử lý bình thường
      return false;
    }

    return true;
  }

  // 🔥 ENTER → commit luôn
  if (keyData.code === "Enter") {
    if (composingText.length > 0) {
      chrome.input.ime.commitText({
        contextID,
        text: composingText
      });

      composingText = "";
      chrome.input.ime.clearComposition({ contextID });

      return true;
    }
    return false;
  }

  // 🔥 SPACE → commit + space
  if (keyData.code === "Space") {
    chrome.input.ime.commitText({
      contextID,
      text: composingText + " "
    });

    composingText = "";
    chrome.input.ime.clearComposition({ contextID });

    return true;
  }

  // 🔥 CHỈ nhận chữ cái (tránh "?")
  if (
    keyData.key &&
    keyData.key.length === 1 &&
    /[a-zA-Z]/.test(keyData.key)
  ) {
    composingText += keyData.key;

    chrome.input.ime.setComposition({
      contextID,
      text: composingText,
      cursor: composingText.length
    });

    return true;
  }

  // 🔥 các phím khác → cho hệ thống xử lý
  return false;
});