import TagService from '@/services/TagService';
import * as types from './mutation-types';

const tagService = new TagService();

export const tagList = ({ commit }, param) => new Promise((resolve, reject) => {
    tagService
    .tagList(param)
    .then((response) => {
      commit(types.SET_TAG_LIST, response);
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});

export const tagFullList = ({commit} ) => new Promise((resolve, reject) => {
  tagService
  .tagListWithOutPagination()
  .then((response) => {
    commit(types.SET_TAG_LIST, response);
    resolve(response);
  })
  .catch((error) => {
    reject(error);
  });
});
export const tagCreate = ({ commit },tagData) => new Promise((resolve, reject) => {
    tagService
      .tagCreate(tagData)
      .then((response) => {
        commit(types.SET_TAG_SUCCESS, response);
        resolve(response);
      })
      .catch((error) => {
        commit(types.SET_TAG_ERROR, error.response.data);
        reject(error);
      });
  });
  
  
  
  export const tagDetails = ({ commit },tagId) => new Promise((resolve, reject) => {
    tagService
      .tagDetails(tagId)
      .then((response) => {
        commit(types.SET_TAG_DETAILS, response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
  export const tagUpdate = ({ commit },tagData) => new Promise((resolve, reject) => {
    tagService
      .tagUpdate(tagData)
      .then((response) => {
        commit(types.SET_TAG_SUCCESS, response);
        resolve(response);
      })
      .catch((error) => {
        commit(types.SET_TAG_ERROR, error.response.data);
        reject(error);
      });
  });
    

export const tagDelete = ({ commit },tagId) => new Promise((resolve, reject) => {
    tagService
      .tagDelete(tagId)
      .then((response) => {
        commit(types.SET_TAG_SUCCESS, response);
        resolve(response);
      })
      .catch((error) => {
        commit(types.SET_TAG_ERROR, error.response.data);
        reject(error);
      });
  });