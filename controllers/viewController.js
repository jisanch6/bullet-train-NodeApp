const Departure = require('../models/departureModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const departures = await Departure.find();

  res.status(200).render('overview', {
    title: 'All Departures',
    departures,
  });
});

exports.getDeparture = (req, res) => {
  res.status(200).render('departure', {
    title: 'To Houston',
  });
};
