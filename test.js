import Vue from 'vue';
import Vuex from 'vuex';
import {state, actions, mutations} from './state';
import sharedVuex from './index';

Vue.use(Vuex);

export default new Vuex.Store({ ...state, plugins: [sharedVuex()] });
