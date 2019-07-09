import Vue from 'vue';
import Vuex from 'vuex';
import {state, actions, mutations} from './state';
import storageVuex from './index';

Vue.use(Vuex);

export default new Vuex.Store({ ...state, plugins: [storageVuex()] });
