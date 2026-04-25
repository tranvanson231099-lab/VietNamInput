
/**
 * Tìm ranh giới (vị trí bắt đầu và kết thúc) của từ cuối cùng trong một chuỗi.
 * Trong phiên bản này, một "từ" được định nghĩa đơn giản là một chuỗi ký tự được ngăn cách bởi dấu cách.
 *
 * @param {string} text Chuỗi văn bản cần tìm kiếm.
 * @returns {{start: number, end: number, word: string} | null} Một đối tượng chứa từ và ranh giới của nó, hoặc null nếu không tìm thấy từ nào.
 */
export function findLastWord(text) {
  if (!text || text.trim() === '') {
    return null;
  }

  // Xóa khoảng trắng ở cuối để xác định chính xác điểm kết thúc của từ cuối cùng.
  const trimmedText = text.trimEnd();
  const end = trimmedText.length;

  // Tìm vị trí bắt đầu của từ cuối cùng.
  const start = trimmedText.lastIndexOf(' ') + 1;

  const word = trimmedText.substring(start, end);

  if (word) {
    return { start, end, word };
  }

  return null;
}

/**
 * GHI CHÚ:
 * Để tự động *bôi đen* (chọn) một từ trong ô nhập liệu, chúng ta cần sử dụng API
 * `chrome.input.ime.setComposition()`.
 *
 * Bước tiếp theo là sửa đổi file 'keyboard_handler.js' để:
 * 1. Theo dõi văn bản đang được gõ.
 * 2. Sử dụng hàm `findLastWord` này để tìm ra từ cần xử lý.
 * 3. Gọi `setComposition()` để trình duyệt làm nổi bật (bôi đen) từ đó.
 *
 * File này cung cấp logic cho bước 2.
 */
