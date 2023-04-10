import AuthenticationService from '@/services/AuthenticationService';

import * as types from './mutation-types';

const authenticationService = new AuthenticationService();

export const userSignup = ({ commit }, userData) => new Promise((resolve, reject) => {
  authenticationService
    .registerUser(userData)
    .then((response) => {
      commit(types.SET_SIGNUP_SUCCESS, response);
      resolve(response);
    })
    .catch((error) => {
      commit(types.SET_SIGNUP_ERRORS, error.response.data);
      reject(error);
    });
});

export const userLogin = ({ commit }, userData) => new Promise((resolve, reject) => {
  authenticationService
    .loginUser(userData)
    .then((response) => {
      commit(types.SET_LOGIN_SUCCESS, response);
      resolve(response);
    })
    .catch((error) => {
      commit(types.SET_LOGIN_ERRORS, error.response.data);
      reject(error);
    });
});
export const userLogout = ({ commit }, userToken) => new Promise((resolve, reject) => {
  authenticationService
    .logoutUser(userToken)
    .then((response) => {
      commit(types.SET_LOGOUT_SUCCESS, response);
      resolve(response);
    })
    .catch((error) => {
      console.log('error.response.data',error)
      commit(types.SET_LOGOUT_ERRORS, error.response);
      reject(error);
    });
});
