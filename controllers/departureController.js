const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Departure = require('../models/departureModel');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  //   console.log(req.files);
  if (!req.files.imageCover || !req.files.images) return next();

  const imageCoverFilename = `departure-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`public/img/departures/${imageCoverFilename}`);

  req.body.imageCover = imageCoverFilename;

  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const imageFilename = `attractions-${req.params.id}-${Date.now()}-${
        i + 1
      }.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`public/img/departures/${imageFilename}`);

      req.body.images.push(imageFilename);
    })
  );

  next();
});

exports.getAllDepartures = factory.getAll(Departure);
exports.getDeparture = factory.getOne(Departure, { path: 'reviews' });
exports.createDeparture = factory.createOne(Departure);
exports.updateDeparture = factory.updateOne(Departure);
exports.deleteDeparture = factory.deleteOne(Departure);
