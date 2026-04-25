// background.js

import { registerImeListeners } from './src/logic/keyboard_handler.js';

// Wrap the listener registration in the onInstalled event
chrome.runtime.onInstalled.addListener(() => {
  // Đăng ký các hàm lắng nghe sự kiện của IME
  registerImeListeners();
  console.log("Vietnam Input IME listeners registered.");
});

console.log("Vietnam Input background script loaded.");
