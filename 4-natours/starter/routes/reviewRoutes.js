const express = require('express');
const reviewController = require('./../controllers/reviewControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getReview)
  .post(
    authController.protect,
    authController.restrictTo('public'),
    reviewController.createReview
  )
  .patch(reviewController.updateReview);

router.route('/:Id').delete(reviewController.deleteReview);

module.exports = router;
