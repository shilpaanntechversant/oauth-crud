const isObj = require('lodash.get');

export const getTagList = (state) => isObj(state, 'tagList', false);
export const getTagError = (state) => isObj(state, 'tagError', false);
export const getTagSuccess = (state) => isObj(state, 'tagSuccess', false);
export const getTagDetails = (state) => isObj(state, 'tagDetails', false);