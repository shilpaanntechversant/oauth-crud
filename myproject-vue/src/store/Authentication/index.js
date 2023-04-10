import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

export default {
  state() {
    return {
      isLoading: true,
      signupErrors: {},
      signupSuccess: {},
      loginSuccess: {},
      loginErrors: {},
      logoutSuccess: {},
      logoutErrors: {},
    };
  },
  mutations,
  actions,
  getters,
};
