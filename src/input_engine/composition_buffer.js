
/**
 * Quản lý trạng thái của từ đang được gõ (composition).
 * Lưu trữ chuỗi ký tự thô và cung cấp các phương thức để
 * biến đổi và phân tích nó trong tương lai.
 */
export class CompositionBuffer {
    constructor() {
        this.clear();
    }

    /**
     * Thêm một ký tự vào bộ đệm.
     * @param {string} char Ký tự để thêm.
     */
    add(char) {
        this.rawText += char;
        // Trong tương lai, logic phân tích từ sẽ được gọi ở đây.
    }

    /**
     * Xử lý phím Backspace, xóa ký tự cuối cùng.
     */
    backspace() {
        if (this.rawText.length > 0) {
            this.rawText = this.rawText.slice(0, -1);
        }
    }

    /**
     * Tải một chuỗi văn bản mới vào bộ đệm.
     * Thường được sử dụng khi người dùng chỉnh sửa một từ đã có.
     * @param {string} text
     */
    setText(text) {
        this.rawText = text || "";
        // TODO: Trong tương lai, có thể chạy decompose() ở đây để phân tích từ mới.
    }

    /**
     * Xóa sạch bộ đệm, reset lại trạng thái ban đầu.
     */
    clear() {
        this.rawText = ""; // Chuỗi ký tự người dùng gõ, ví dụ: "chanh"
        this.toneKey = null; // Dấu thanh, ví dụ: "s" (sắc)
        this.decomposed = { // Các thành phần của âm tiết
            initial: "", // Phụ âm đầu, ví dụ: "ch"
            vowel: "",   // Nguyên âm, ví dụ: "a"
            final: ""    // Phụ âm cuối, ví dụ: "nh"
        };
    }

    /**
     * Lấy nội dung chuỗi thô từ bộ đệm.
     * @returns {string}
     */
    getContent() {
        return this.rawText;
    }

    /**
     * Kiểm tra xem bộ đệm có rỗng không.
     * @returns {boolean}
     */
    isEmpty() {
        return this.rawText.length === 0;
    }

    /**
     * (CHỨC NĂNG TƯƠNG LAI)
     * Phân tích chuỗi `rawText` thành các thành phần âm vị học.
     * Ví dụ: "chanh" -> { initial: "ch", vowel: "a", final: "nh" }
     */
    decompose() {
        // TODO: Triển khai logic phân tích âm tiết Tiếng Việt ở đây.
        console.log(`[Buffer] Decomposing: ${this.rawText}`);
    }

     /**
     * (CHỨC NĂNG TƯƠNG LAI)
     * Áp dụng dấu thanh vào nguyên âm và trả về từ hoàn chỉnh.
     * Ví dụ: { vowel: "a", toneKey: "s" } -> "á"
     * @returns {string} Từ đã được bỏ dấu.
     */
    composeWithTone() {
        // TODO: Triển khai logic bỏ dấu ở đây.
        return this.rawText;
    }
}
