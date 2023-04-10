import { createStore } from 'vuex'
import authentication from './Authentication';
import user from './User';
import tag from './Tag';


const store = createStore({
  modules: {
    authentication,
    user,
    tag
  }
});

export default store;
