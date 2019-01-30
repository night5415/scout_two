import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOnline: true,
    user: {
      Id: null,
      UserName: null,
      PassWord: null,
      Pin: null,
      hash: null,
      location: {}
    },
    isLoggedIn: false
  },
  getters: {
    User: state => {
      return state.user;
    }
  },
  mutations: {
    _updateIsOnline(state, val) {
      state.isOnline = val;
    },
    _updatePin(state, val) {
      state.user.Pin = val;
    },
    _updateUserName(state, val) {
      state.user.UserName = val;
    },
    _updateUserId(state, val) {
      state.user.Id = val;
    },
    _updatePassWord(state, val) {
      state.user.PassWord = val;
    },
    _updateLogin(state, val) {
      state.isLoggedIn = val;
    },
    _updateLocation(state, val) {
      state.user.location = val;
    }
  },
  //put asynchronous code here, not in mutations
  actions: {
    updateIsOnline: (context, value) => {
      context.commit("_updateIsOnline", value);
    },
    updatePin: (context, value) => {
      context.commit("_updatePin", value);
    },
    updateUserId: (context, value) => {
      context.commit("_updateUserId", value);
    },
    updateUserName: (context, value) => {
      context.commit("_updateUserName", value);
    },
    updatePassWord: (context, value) => {
      context.commit("_updatePassWord", value);
    },
    updateLogin: (context, value) => {
      context.commit("_updateLogin", value);
    },
    updateLocation: (context, value) => {
      context.commit("_updateLocation", value);
    }
  }
});
