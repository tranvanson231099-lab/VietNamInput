import { TelexEngine } from './telex_engine.js';

// Khởi tạo engine xử lý gõ Telex
const engine = new TelexEngine();

// ID của ô input hiện tại (Chrome IME cung cấp)
let contextID = 0;


// Khi người dùng focus vào ô nhập liệu
chrome.input.ime.onFocus.addListener((context) => {
    // Lưu lại contextID để biết đang nhập ở đâu
    contextID = context.contextID;
});


// Khi người dùng rời khỏi ô input
chrome.input.ime.onBlur.addListener(() => {
    // Reset context
    contextID = 0;

    // Reset buffer của engine (tránh lỗi khi quay lại gõ tiếp)
    engine.reset();
});


// Bắt sự kiện bàn phím
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {

    // Chỉ xử lý khi:
    // - Là sự kiện nhấn phím (keydown)
    // - Không phải tổ hợp Alt / Ctrl (tránh phá shortcut)
    if (keyData.type !== "keydown" || keyData.altKey || keyData.ctrlKey) {
        return false; // Không chặn → để hệ thống xử lý bình thường
    }

    // Lấy ký tự người dùng gõ (chuyển về chữ thường)
    const char = keyData.key.toLowerCase();


    // ===== 1. PHÍM KẾT THÚC TỪ =====
    // Khi gặp các phím này → coi như kết thúc 1 từ
    if ([" ", "enter", "escape"].includes(char)) {
        engine.reset(); // Xóa buffer
        return false;   // Cho phép phím được nhập bình thường
    }


    // ===== 2. PHÍM XOÁ =====
    if (char === "backspace") {
        // Xóa 1 ký tự trong buffer nội bộ
        engine.backspace();

        // Không chặn → để hệ thống tự xóa ký tự trên input
        return false;
    }


    // ===== 3. XỬ LÝ GÕ TELEX =====
    // Chỉ xử lý khi là chữ cái a-z
    if (/^[a-z]$/.test(char)) {

        // Gửi ký tự vào engine để xử lý
        const result = engine.processKey(char);

        /*
            result có dạng:
            {
                handled: true/false,      // Có xử lý hay không
                newChar: "á",            // Ký tự mới sau khi biến đổi
                lengthToRemove: 2        // Số ký tự cần xóa trước đó
            }
        */

        // Nếu engine đã xử lý (ví dụ: a + s → á)
        if (result.handled) {

            // Xóa các ký tự cũ trước đó
            chrome.input.ime.deleteSurroundingText({
                engineID: engineID,
                contextID: contextID,
                offset: -result.lengthToRemove, // lùi lại phía sau
                length: result.lengthToRemove   // số ký tự cần xóa
            }, () => {

                // Sau khi xóa xong → chèn ký tự mới
                chrome.input.ime.commitText({
                    contextID: contextID,
                    text: result.newChar
                });
            });

            // Chặn ký tự gốc không cho hiện ra
            return true;
        }
    }

    // Mặc định: không xử lý → để input nhận bình thường
    return false;
});