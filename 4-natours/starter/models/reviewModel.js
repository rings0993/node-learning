// review / rating / createdAt / ref to tour / ref to user

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review can not be empty.'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be greater than 1'],
      max: [5, 'Rating must be less than 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must be belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must be belong to a user'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre('save', function (next) {
  this.createdAt = Date.now() + 1000 * 10 * 60;
  next();
});

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'tour',
  //     select: 'name',
  //   });
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

// POST /tour/2345asdf/reviews
// GET /tour/2345/reviews/
// GET /tour/2345/reviews/2344093if
