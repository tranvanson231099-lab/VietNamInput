// ===== BUFFER =====
let buffer = "";

// ===== BẢNG DẤU =====
const toneMap = {
  a: ["á", "à", "ả", "ã", "ạ"],
  e: ["é", "è", "ẻ", "ẽ", "ẹ"],
  i: ["í", "ì", "ỉ", "ĩ", "ị"],
  o: ["ó", "ò", "ỏ", "õ", "ọ"],
  u: ["ú", "ù", "ủ", "ũ", "ụ"],
  y: ["ý", "ỳ", "ỷ", "ỹ", "ỵ"]
};

const toneKeys = {
  s: 0,
  f: 1,
  r: 2,
  x: 3,
  j: 4
};

// ===== APPLY TONE =====
function applyTone(char, toneIndex) {
  const lower = char.toLowerCase();

  if (!toneMap[lower]) return char;

  let newChar = toneMap[lower][toneIndex];

  if (char === char.toUpperCase()) {
    newChar = newChar.toUpperCase();
  }

  return newChar;
}

// ===== PROCESS KEY =====
export function processKey(key, code) {

  // xử lý dấu
  if (toneKeys[key] !== undefined) {
    if (buffer.length === 0) return { action: "none" };

    let lastChar = buffer[buffer.length - 1];
    let newChar = applyTone(lastChar, toneKeys[key]);

    buffer = buffer.slice(0, -1) + newChar;

    return {
      action: "replace",
      text: newChar
    };
  }

  // xử lý chữ
  if (key && key.length === 1 && /^[a-zA-Z]$/.test(key)) {
    buffer += key;

    return {
      action: "add",
      text: key
    };
  }

  // backspace
  if (code === "Backspace") {
    buffer = buffer.slice(0, -1);
    return { action: "none" };
  }

  // space → reset buffer
  if (code === "Space") {
    buffer = "";
    return { action: "none" };
  }

  return { action: "none" };
}