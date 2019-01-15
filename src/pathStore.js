import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      UserName: "cmarrero",
      PassWord: 11111111,
      Pin: 1,
      hash: null
    },
    isLoggedIn: false
  },
  mutations: {
    _updatePin(state, val) {
      state.user.Pin = val;
    },
    _updateUserName(state, val) {
      state.user.UserName = val;
    },
    _updatePassWord(state, val) {
      state.user.PassWord = val;
    },
    _updateLogin(state, val) {
      state.isLoggedIn = val;
    }
  },
  //put asynchronous code here, not in mutations
  actions: {
    updatePin: (context, value) => {
      context.commit("_updatePin", value);
    },
    updateUserName: (context, value) => {
      context.commit("_updateUserName", value);
    },
    updatePassWord: (context, value) => {
      context.commit("_updatePassWord", value);
    },
    updateLogin: (context, value) => {
      context.commit("_updateLogin", value);
    }
  }
});
