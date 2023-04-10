import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

export default {
  state() {
    return {
      userList: {},
    };
  },
  mutations,
  actions,
  getters,
};
