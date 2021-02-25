const Departure = require('../models/departureModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllDepartures = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Departure.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const departures = await features.query;

  res.status(200).json({
    status: 'success',
    results: departures.length,
    data: {
      departures,
    },
  });
});

exports.createDeparture = catchAsync(async (req, res, next) => {
  const newDeparture = await Departure.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      departure: newDeparture,
    },
  });
});

exports.getDeparture = catchAsync(async (req, res, next) => {
  const departure = await Departure.findById(req.params.id).populate('reviews');

  if (!departure) {
    return next(new AppError('No departure found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      departure,
    },
  });
});

exports.updateDeparture = catchAsync(async (req, res, next) => {
  const departure = await Departure.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!departure) {
    return next(new AppError('No departure found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      departure,
    },
  });
});

exports.deleteDeparture = catchAsync(async (req, res, next) => {
  const departure = await Departure.findByIdAndDelete(req.params.id);

  if (!departure) {
    return next(new AppError('No departure found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
