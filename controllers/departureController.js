const Departure = require('../models/departureModel');

exports.getAllDepartures = async (req, res) => {
  try {
    // FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    //regular expression
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    let query = Departure.find(JSON.parse(queryStr));

    //SORTING
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    //EXECUTE QUERY
    const departures = await query;

    res.status(200).json({
      status: 'success',
      results: departures.length,
      data: {
        departures,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDeparture = async (req, res) => {
  try {
    const newDeparture = await Departure.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        departure: newDeparture,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDeparture = async (req, res) => {
  try {
    const departure = await Departure.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        departure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateDeparture = async (req, res) => {
  try {
    const departure = await Departure.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        departure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDeparture = async (req, res) => {
  try {
    await Departure.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
