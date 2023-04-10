import * as types from './mutation-types';

const mutations = {
  [types.SET_USER_LIST](state, userList) {
    state.userList = userList;
  },
};

export default mutations;
