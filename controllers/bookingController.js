const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Departure = require('../models/departureModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const Booking = require('../models/bookingModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get the departure being booked
  const departure = await Departure.findById(req.params.departureId);
  //Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.departureId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${departure.name} departure`,
            description: `To test credit card use 4242 4242 4242 4242\n${departure.summary}`,
          },
          unit_amount: departure.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/${departure.slug}`,
  });
  res.status(200).json({
    status: 'success',
    id: session.id,
  });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { departure, user, price } = req.query;
//   if (!departure && !user && !price) return next();
//   await Booking.create({ departure, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createBookingCheckout = async (session) => {
  const departure = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.line_items[0].price_data.unit_amount / 100;
  await Booking.create({ departure, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
