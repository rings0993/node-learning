// 從預先定義好的class倒入error 的prototype
const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate Fields: ${value}`;
  return new AppError(message, 400);
};

const handleValidationfailedDB = (err) => {
  // 若有多個錯誤可以將erroes合併起來顯示
  const errors = Object.values(err.errors).map((err) => err.message);

  const message = `Invalid input data: ${errors.join('. ')}`;
  // const message = `Invalid input data`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () => {
  return new AppError('Token Invalid.', 401);
};

const handleJWTExpiredError = () =>
  new AppError('Token Expired! Please Login Again!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,

    // 加入stack，可以更好的追蹤錯誤，可以看到函數在哪裡被調用，在哪一個文件的甚麼位置等訊息
    stack: err.stack,
    error: err,
    status: err.status,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: 回傳錯誤給客戶端
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
    });

    // Programming or other unknown error: 不將錯誤細節返回給客戶，統一返回 500
  } else {
    // 1) Log the error
    console.log('Error💥', err);

    // 2) Send the error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // 如未指定 statuesCode 則預設返回 500
  err.statusCode = err.statusCode || 500;

  // 如未指定 status 則返回 error
  err.status = err.status || 'error';

  // 分別設定在 production、development 不同環境下的 error handling
  if (process.env.NODE_ENV === 'production') {
    // 若錯誤來自Mongoose，他的error name可能不在原先的物件裡面
    let error = Object.assign(err);

    // 這邊要依照 error 可以被區分的方式分別處理 error message，有可能是透過 error.name 或是 error.code
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationfailedDB(error);
    if (error.name === 'JsonWebTokenError')
      error = handleJsonWebTokenError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  } else if (process.env.NODE_ENV === 'development') {
    // 通常Dev下會不處理，方便可以看到所有的Error Message
    sendErrorDev(err, res);
  }
};
