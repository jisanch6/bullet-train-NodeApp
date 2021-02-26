const mongoose = require('mongoose');
const slugify = require('slugify');

const departureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A departure must have a name'],
      unique: true,
      trim: true,
      maxLength: [
        40,
        'A departure name must have less or equal to 50 characters',
      ],
      minLength: [
        5,
        'A departure name must have greater or equal to 5 characters',
      ],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
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
    durationMinutes: {
      type: Number,
      default: 90,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtual populate
departureSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'departure',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
departureSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Departure = mongoose.model('Departure', departureSchema);

module.exports = Departure;
