import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

import floor6 from "./modules/floor6";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    floor6,
    app,
    user,
    permission
  },
  getters
});

export default store
