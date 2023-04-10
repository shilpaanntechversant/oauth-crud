import UserService from '@/services/UserService';

import * as types from './mutation-types';

const userService = new UserService();

export const userList = ({ commit }, param) => new Promise((resolve, reject) => {
  userService
    .userList(param)
    .then((response) => {
      commit(types.SET_USER_LIST, response);
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});
