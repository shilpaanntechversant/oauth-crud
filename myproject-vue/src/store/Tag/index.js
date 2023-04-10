import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';

export default {
  state() {
    return {
      tagList: {},
      tagSuccess:{},
      tagError:{},
      tagDetails:{}

    };
  },
  mutations,
  actions,
  getters,
};