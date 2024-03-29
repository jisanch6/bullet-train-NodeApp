const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  departure: {
    type: mongoose.Schema.ObjectId,
    ref: 'Departure',
    required: [true, 'Booking must belong to a Tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user'],
  },
  price: {
    type: Number,
    require: [true, 'Booking a departure must have a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({ path: 'departure', select: 'name' });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
