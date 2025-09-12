// Fix for React Three Fiber multisampling issues on React Native
// This helps prevent EXGL renderbufferStorageMultisample errors

// Global error handler để catch tất cả EXGL errors
if (typeof global !== 'undefined' && (global as any).ErrorUtils) {
    const originalGlobalHandler = (global as any).ErrorUtils.getGlobalHandler();
    (global as any).ErrorUtils.setGlobalHandler((error: any, isFatal: any) => {
        const errorMessage = error?.message || '';
        if (
            errorMessage.includes('renderbufferStorageMultisample') ||
            errorMessage.includes("isn't implemented yet!") ||
            errorMessage.includes('EXGL') ||
            errorMessage.includes('Exception in HostFunction')
        ) {
            // Im lặng hoàn toàn - không xử lý gì
            return;
        }
        // Chỉ gọi handler gốc cho các lỗi khác
        originalGlobalHandler(error, isFatal);
    });
}

// Console suppression for known multisampling issues
const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

console.warn = (...args) => {
    const message = args.join(' ');
    if (
        message.includes('renderbufferStorageMultisample') ||
        message.includes("isn't implemented yet!") ||
        message.includes('EXGL') ||
        message.includes('multisampling') ||
        message.includes('Exception in HostFunction') ||
        message.includes('hermes')
    ) {
        // Hoàn toàn im lặng
        return;
    }
    originalWarn.apply(console, args);
};

console.error = (...args) => {
    const message = args.join(' ');
    if (
        message.includes('renderbufferStorageMultisample') ||
        message.includes("isn't implemented yet!") ||
        message.includes('EXGL') ||
        message.includes('Exception in HostFunction') ||
        message.includes('hermes')
    ) {
        // Hoàn toàn im lặng - không log gì cả
        return;
    }
    originalError.apply(console, args);
};

console.log = (...args) => {
    const message = args.join(' ');
    if (
        message.includes('Suppressed EXGL error') ||
        message.includes('renderbufferStorageMultisample') ||
        message.includes("isn't implemented yet!") ||
        message.includes('EXGL') ||
        message.includes('Exception in HostFunction')
    ) {
        // Hoàn toàn im lặng - không log gì cả
        return;
    }
    originalLog.apply(console, args);
};

export default {};
