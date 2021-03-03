/* eslint-disable */
require('@babel/polyfill');
const axios = require('axios');

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const forgotPasswordForm = document.querySelector('.form--forgotPass');
const logOutBtn = document.querySelector('.nav__link--logout');
const userDataForm = document.querySelector('.form--user-data');
const userPasswordForm = document.querySelector('.form--user-password');
// const passwordResetForm = document.querySelector('.form--resetPassword');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotPassword(email);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateMe(form);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('passwordCurrent').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    await updateMyPassword(passwordCurrent, password, passwordConfirm);

    document.getElementById('passwordCurrent').value = '';
    document.getElementById('password').value = '';
    document.getElementById('passwordConfirm').value = '';
  });
}

// if (passwordResetForm) {
//   passwordResetForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log();
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('passwordConfirm').value;
//     resetPassword(password, passwordConfirm);
//   });
// }

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if ((res.data.status = 'success')) {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const forgotPassword = async (email) => {
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
    console.log(err.response.data.message);
  }
};

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
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};

// const resetPassword = async (password, passwordConfirm) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'api/v1/users/resetPassword/:token',
//       data: {
//         password,
//         passwordConfirm,
//       },
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Password has been reset!');
//       location.forcedReload(true);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//     console.log(err.response.data.message);
//   }
// };
