const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    index: true,
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    default: 'median',
  },
  ratingAverage: { type: Number, default: 4.5 },
  ratingQuantity: { type: Number, default: 0 },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  discount: { type: Number, default: 0 },
  summary: { type: String, trim: true },
  discription: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  image: [String],
  createdAt: { type: Date, default: Date.now() },
  startDates: [String],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
