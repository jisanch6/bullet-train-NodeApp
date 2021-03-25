/* eslint-disable */
import { showAlert } from './alert.mjs';
import axios from 'axios';

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Reset email sent!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    // console.log(err.response.data.message);
  }
};

export const resetUserPassword = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '',
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password has been reset!');
      location.forcedReload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    // console.log(err.response.data.message);
  }
};
