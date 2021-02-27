const mongoose = require('mongoose');
const Departure = require('./departureModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    departure: {
      type: mongoose.Schema.ObjectId,
      ref: 'Departure',
      required: [true, 'Review must belong to a departure.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ departure: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'departure',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calcAvgRatings = async function (departureId) {
  //this points to model
  const stats = await this.aggregate([
    {
      $match: { departure: departureId },
    },
    {
      $group: {
        _id: '$departure',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);
  if (stats.length > 0) {
    await Departure.findByIdAndUpdate(departureId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Departure.findByIdAndUpdate(departureId, {
      ratingsQuantity: 0,
      ratingsAverage: 1,
    });
  }
};

reviewSchema.post('save', function () {
  //construct points to current model
  this.constructor.calcAvgRatings(this.departure);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAvgRatings(this.review.departure);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
