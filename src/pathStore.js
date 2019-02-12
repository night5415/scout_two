import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// this is the single source of truth for the app,  we can store
// session data here that does not need to be persisted across
// multiple sessions. Persisted data will need to be stored in IndexedDB
export default new Vuex.Store({
  state: {
    encryptionKey: null,
    isOnline: true,
    isLoggedIn: false,
    user: {
      Id: null,
      UserName: "night5415",
      PassWord: "11111111",
      Pin: null,
      hash: null,
      location: {}
    },
    settings: {
      theme: {
        light: false,
        dark: true,
        pathfinder: false
      }
    }
  },
  getters: {
    User: state => {
      return state.user;
    },
    Key: state => {
      return state.encryptionKey;
    },
    Dark: state => {
      return state.settings.theme.dark;
    }
  },
  mutations: {
    _updateEncryptionKey(state, val) {
      state.encryptionKey = val;
    },
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
    },
    _resetState(state, val) {
      state.isLoggedIn = false;
      state.user.Id = val;
      state.user.UserName = val;
      state.encryptionKey = val;
      state.user.Pin = val;
      state.user.PassWord = val;
    },
    _updateDark(state, val) {
      state.settings.theme.dark = val;
    }
  },
  //put asynchronous code here, not in mutations
  actions: {
    updateEncryptionKey: (context, value) => {
      context.commit("_updateEncryptionKey", value);
    },
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
    },
    resetState: (context, value) => {
      context.commit("_resetState", null);
    },
    updateDark: (context, value) => {
      context.commit("_updateDark", value);
    }
  }
});
