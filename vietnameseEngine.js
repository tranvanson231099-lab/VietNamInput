// ===== BUFFER =====
let buffer = "";

// ===== NGUYÊN ÂM =====
const vowels = "aeiouy";

// ===== BIẾN ĐỔI TELEX =====
const transformMap = {
  dd: "đ",
  aa: "â",
  aw: "ă",
  ee: "ê",
  oo: "ô",
  ow: "ơ",
  uw: "ư"
};

// ===== DẤU =====
const toneMap = {
  a: ["á", "à", "ả", "ã", "ạ"],
  e: ["é", "è", "ẻ", "ẽ", "ẹ"],
  i: ["í", "ì", "ỉ", "ĩ", "ị"],
  o: ["ó", "ò", "ỏ", "õ", "ọ"],
  u: ["ú", "ù", "ủ", "ũ", "ụ"],
  y: ["ý", "ỳ", "ỷ", "ỹ", "ỵ"],
  â: ["ấ", "ầ", "ẩ", "ẫ", "ậ"],
  ă: ["ắ", "ằ", "ẳ", "ẵ", "ặ"],
  ê: ["ế", "ề", "ể", "ễ", "ệ"],
  ô: ["ố", "ồ", "ổ", "ỗ", "ộ"],
  ơ: ["ớ", "ờ", "ở", "ỡ", "ợ"],
  ư: ["ứ", "ừ", "ử", "ữ", "ự"]
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

  // ===== DẤU =====
  if (toneKeys[key] !== undefined) {
    if (buffer.length === 0) return { action: "none" };

    let lastChar = buffer[buffer.length - 1];
    let newChar = applyTone(lastChar, toneKeys[key]);

    buffer = buffer.slice(0, -1) + newChar;

    return {
      action: "replace",
      text: newChar,
      replaceLength: 1
    };
  }

  // ===== CHỮ =====
  if (key && key.length === 1 && /^[a-zA-Z]$/.test(key)) {
    buffer += key;

    // ===== XỬ LÝ PHỤ ÂM ĐÚNG =====
    if (buffer.length >= 2) {
      let last2 = buffer.slice(-2);
      let last2Lower = last2.toLowerCase();

      // 🔥 chỉ transform nếu bắt đầu bằng nguyên âm
      if (
        vowels.includes(last2Lower[0]) &&
        transformMap[last2Lower]
      ) {
        let newChar = transformMap[last2Lower];

        if (last2 === last2.toUpperCase()) {
          newChar = newChar.toUpperCase();
        }

        buffer = buffer.slice(0, -2) + newChar;

        return {
          action: "replace",
          text: newChar,
          replaceLength: 2
        };
      }
    }

    return {
      action: "add",
      text: key
    };
  }

  // ===== BACKSPACE =====
  if (code === "Backspace") {
    buffer = buffer.slice(0, -1);
    return { action: "none" };
  }

  // ===== SPACE / ENTER =====
  if (code === "Space" || code === "Enter") {
    buffer = "";
    return { action: "none" };
  }

  return { action: "none" };
}