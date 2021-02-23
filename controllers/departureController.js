const Departure = require('../models/departureModel');

exports.getAllDepartures = async (req, res) => {
  try {
    const departures = await Departure.find();

    res.status(204).json({
      status: 'SUCCESS',
      data: {
        departures,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'FAIL',
      message: error.message,
    });
  }
};

exports.createDeparture = async (req, res) => {};

exports.getDeparture = async (req, res) => {};

exports.deleteDeparture = async (req, res) => {};

exports.updateDeparture = async (req, res) => {};
