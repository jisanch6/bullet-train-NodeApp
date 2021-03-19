/* eslint-disable */
import { showAlert } from './alert.mjs';
import axios from 'axios';

const updateMe = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'api/v1/users/updateMe',
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'You have been updated!');
      location.forcedReload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};

const updateMyPassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password has been updated!');
      location.forcedReload(true);
      document.getElementById('passwordCurrent').value = '';
      document.getElementById('password').value = '';
      document.getElementById('passwordConfirm').value = '';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};

export { updateMe, updateMyPassword };
