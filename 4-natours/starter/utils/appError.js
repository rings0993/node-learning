class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // 只處理 operational errors
    this.isOperational = true;

    // 可以參考 https://segmentfault.com/a/1190000007076507
    // Error.captureStackTrace() 為源自V8引擎的Stack Trace API，可以較方便的對客戶端隱藏技術細節
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
