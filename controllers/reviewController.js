const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// const AppError = require('../utils/appError');

exports.setDepartureUserIds = (req, res, next) => {
  if (!req.body.departure) req.body.departure = req.params.departureId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
