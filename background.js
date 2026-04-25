// background.js

import { registerImeListeners } from './src/logic/keyboard_handler.js';

// Đăng ký các hàm lắng nghe sự kiện của IME
registerImeListeners();

console.log("Vietnam Input background script loaded and listeners registered.");
