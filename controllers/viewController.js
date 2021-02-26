const Departure = require('../models/departureModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const departures = await Departure.find();

  res.status(200).render('overview', {
    title: 'All Departures',
    departures,
  });
});

exports.getDeparture = catchAsync(async (req, res) => {
  const departure = await Departure.findOne({ slug: req.params.slug }).populate(
    {
      path: 'reviews',
      fields: 'review rating user',
    }
  );

  res.status(200).render('departure', {
    title: 'To Houston',
    departure,
  });
});
