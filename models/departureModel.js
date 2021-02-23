const mongoose = require('mongoose');
// const slugify = require('slugify');

const depatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A departure must have a name'],
    unique: true,
    maxLength: [
      50,
      'A departure name must have less or equal to 50 characters',
    ],
    minLength: [5, 'A departure name must have less or equal to 5 characters'],
  },
  slug: String,
  ratingsAverage: {
    type: Number,
    default: 1,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A departure must have a price'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A departure must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    //   required: [true, 'A departure must have a cover image']
  },
  images: [String],
  startLocation: {
    description: String,
    address: String,
  },
  endLocation: {
    description: String,
    address: String,
  },
});

const Departure = mongoose.model('Departure', depatureSchema);

module.exports = Departure;
