import * as types from './mutation-types';

const mutations = {
  [types.SET_TAG_LIST](state, tagList) {
    state.tagList = tagList;
  },
  [types.SET_TAG_SUCCESS](state, tagSuccess) {
    state.tagSuccess = tagSuccess;
  },
  [types.SET_TAG_ERROR](state, tagError) {
    state.tagError = tagError;
  },
  [types.SET_TAG_DETAILS](state, tagDetails) {
    state.tagDetails = tagDetails;
  },
}
export default mutations;
