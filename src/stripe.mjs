/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert.mjs';
// prettier-ignore
const stripe = Stripe('pk_test_51IJ9XaJhWumwQBaCJH6Gdzl98ZIQRKkHFaRdDo9cVb58YY6Rb1hswTOCAGZ2NLmn9ml9hZMFGtKQhvdObYEPqLKn00tuoT388a');

export const bookDeparture = async (departureId) => {
  try {
    //Checkout session from departure endpoint
    const session = await axios(
      `/api/v1/bookings/checkout-session/${departureId}`
    );
    //use stripe object to make checkout form & charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
