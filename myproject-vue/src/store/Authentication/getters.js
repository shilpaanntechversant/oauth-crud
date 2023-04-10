const isObj = require('lodash.get');

export const getSignupSuccess = (state) => isObj(state, 'signupSuccess', false);
export const getSignupErrors = (state) => isObj(state, 'signupErrors', false);
export const getLoadingStatus = (state) => isObj(state, 'isLoading', false);
export const getLoginSuccess = (state) => isObj(state, 'loginSuccess', false);
export const getLoginErrors = (state) => isObj(state, 'loginErrors', false);
export const getLogoutSuccess = (state) => isObj(state, 'logoutSuccess', false);
export const getLogoutErrors = (state) => isObj(state, 'logoutErrors', false);