const express = require('express');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // const features = new APIFeatures(User.find(), req.query)
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  const user = req.user;
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("You can't update your password with this way.", 400)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// Create User is in the authController
// exports.createUser = factory.createOne(User);
