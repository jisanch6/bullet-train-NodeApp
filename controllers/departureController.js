const Departure = require('../models/departureModel');

exports.getAllDepartures = async (req, res) => {
  try {
    const departures = await Departure.find();

    return res.status(200).json({
      status: 'success',
      results: departures.length,
      data: {
        departures,
      },
    });
  } catch (err) {
    return res.status(404).json({
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

    return res.status(200).json({
      status: 'success',
      data: {
        departure,
      },
    });
  } catch (err) {
    return res.status(404).json({
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

    return res.status(200).json({
      status: 'success',
      data: {
        departure,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteDeparture = async (req, res) => {
  try {
    await Departure.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
