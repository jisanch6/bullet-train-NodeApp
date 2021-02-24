const Departure = require('../models/departureModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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
  const departure = await Departure.findById(req.params.id);

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

  res.status(200).json({
    status: 'success',
    data: {
      departure,
    },
  });
});

exports.deleteDeparture = catchAsync(async (req, res, next) => {
  await Departure.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
