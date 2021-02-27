const Departure = require('../models/departureModel');
const factory = require('./handlerFactory');

exports.getAllDepartures = factory.getAll(Departure);
exports.getDeparture = factory.getOne(Departure, { path: 'reviews' });
exports.createDeparture = factory.createOne(Departure);
exports.updateDeparture = factory.updateOne(Departure);
exports.deleteDeparture = factory.deleteOne(Departure);
