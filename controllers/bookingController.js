const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Departure = require('../models/departureModel');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get the departure being booked
  const departure = await Departure.findById(req.params.departureId);
  //Create checkout session
  const session = await stripe.checkout.sessions.create({
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/${departure.slug}`,
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.departureId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${departure.name} departure`,
            description: departure.summary,
          },
          unit_amount: departure.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });
  res.status(200).json({
    status: 'success',
    id: session.id,
  });
});
