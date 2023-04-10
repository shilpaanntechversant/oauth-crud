const isObj = require('lodash.get');

export const getUserList = (state) => isObj(state, 'userList', false);
