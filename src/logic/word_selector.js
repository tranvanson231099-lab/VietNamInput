
/**
 * Tìm ranh giới (vị trí bắt đầu và kết thúc) của từ tại vị trí con trỏ.
 * Một "từ" được định nghĩa là một chuỗi ký tự không chứa dấu cách.
 *
 * @param {string} text Toàn bộ chuỗi văn bản.
 * @param {number} cursor Vị trí hiện tại của con trỏ.
 * @returns {{start: number, end: number, word: string} | null} Trả về đối tượng chứa từ và vị trí, hoặc null.
 */
export function findWordAtCursor(text, cursor) {
  if (!text) {
    return null;
  }

  // Tìm vị trí bắt đầu của từ (vị trí của dấu cách liền trước con trỏ, hoặc đầu chuỗi)
  const start = text.lastIndexOf(' ', cursor - 1) + 1;

  // Tìm vị trí kết thúc của từ (vị trí của dấu cách liền sau, hoặc cuối chuỗi)
  let end = text.indexOf(' ', start);
  if (end === -1) {
    end = text.length;
  }

  // Lấy ra từ
  const word = text.substring(start, end);

  // Nếu con trỏ không thực sự nằm trên từ (ví dụ, nó nằm giữa nhiều dấu cách),
  // hoặc nếu chuỗi tìm được là rỗng, thì không trả về gì cả.
  if (!word || cursor < start || cursor > end) {
    return null;
  }

  return { start, end, word };
}

/**
 * GHI CHÚ:
 * Logic đã được cập nhật để tìm từ tại vị trí con trỏ.
 *
 * Bước tiếp theo là sửa đổi file 'keyboard_handler.js' để:
 * 1. Theo dõi vị trí của con trỏ (cursor) trong vùng văn bản đang gõ (composition).
 * 2. Sử dụng hàm `findWordAtCursor` mới này.
 * 3. Xử lý các phím mũi tên (trái/phải) để di chuyển con trỏ và cập nhật lại vùng bôi đen.
 */
