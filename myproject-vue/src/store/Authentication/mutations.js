import * as types from './mutation-types';

const mutations = {
  [types.SET_LOADING](state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  [types.SET_SIGNUP_SUCCESS](state, signupSuccess) {
    state.signupSuccess = signupSuccess;
  },
  [types.SET_SIGNUP_ERRORS](state, signupErrors) {
    state.signupErrors = signupErrors;
  },
  [types.SET_LOGIN_SUCCESS](state, loginSuccess) {
    state.loginSuccess = loginSuccess;
  },
  [types.SET_LOGIN_ERRORS](state, loginErrors) {
    state.loginErrors = loginErrors;
  },
  [types.SET_LOGOUT_SUCCESS](state, logoutSuccess) {
    state.logoutSuccess = logoutSuccess;
  },
  [types.SET_LOGOUT_ERRORS](state, logoutErrors) {
    state.logoutErrors = logoutErrors;
  },
};

export default mutations;
