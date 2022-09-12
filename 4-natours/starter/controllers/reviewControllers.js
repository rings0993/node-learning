const express = require('express');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');

exports.getReview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const review = await Review.find(filter);
  if (!review) {
    return next(
      new AppError('Get Review Failed. Review not found with that id', 404)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: { review: newReview },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError('Review not found with that ID', 404));
  }
  req.status(200).json({
    status: 'success',
    data: { review },
  });
});

exports.deleteReview = factory.deleteOne(Review);
