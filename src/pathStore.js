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
    user: {
      Id: null,
      UserName: "night5415",
      PassWord: "11111111",
      Pin: null,
      hash: null,
      location: {}
    },
    isLoggedIn: false
  },
  getters: {
    User: state => {
      return state.user;
    },
    Kye: state => {
      return state.encryptionKey;
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
    }
  }
});
