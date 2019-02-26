import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// app specific state goes here
const app = {
  state: {
    dark: true,
    isOnline: true,
    isLoggedIn: false,
    baseUrl: 'https://test-lighthouse.abpathfinder.net'
  },
  mutations: {
    _updateLogin(state, val) {
      state.isLoggedIn = val;
    },
    _updateIsOnline(state, val) {
      state.isOnline = val;
    },
    _updateDark(state, val) {
      state.dark = val;
    }
  },
  getters: {
    Dark: state => {
      return state.dark;
    },
    isOnline: state => {
      return state.isOnline;
    },
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
    baseUrl: state => {
      return state.baseUrl;
    }
  },
  actions: {
    updateIsOnline: (context, value) => {
      context.commit("_updateIsOnline", value);
    },
    updateLogin: (context, value) => {
      context.commit("_updateLogin", value);
    },
    updateDark: (context, value) => {
      context.commit("_updateDark", value);
    }
  }
};
//security specific state should go here
const security = {
  state: { token: null, encryptionKey: null },
  mutations: {
    _updateSecurityToken(state, val) {
      state.token = val;
    },
    _updateEncryptionKey(state, val) {
      state.encryptionKey = val;
    }
  },
  actions: {
    updateSecurityToken: (context, value) => {
      context.commit("_updateSecurityToken", value);
    },
    updateEncryptionKey: (context, value) => {
      context.commit("_updateEncryptionKey", value);
    }
  },
  getters: {
    Token: state => {
      return state.token;
    },
    Key: state => {
      return state.encryptionKey;
    }
  }
};
//state dealing with the logged in user goes here
const user = {
  state: {
    Id: null,
    UserName: "night5415",
    PassWord: "11111111",
    Pin: null,
    hash: null,
    location: {}
  },
  getters: {
    User: state => {
      return state.user;
    }
  },
  mutations: {
    _updatePin(state, val) {
      state.Pin = val;
    },
    _updateUserName(state, val) {
      state.UserName = val;
    },
    _updateUserId(state, val) {
      state.Id = val;
    },
    _updatePassWord(state, val) {
      state.PassWord = val;
    },
    _updateLocation(state, val) {
      state.location = val;
    }
  },
  actions: {
    updateUserId: (context, value) => {
      context.commit("_updateUserId", value);
    },
    updateUserName: (context, value) => {
      context.commit("_updateUserName", value);
    },
    updatePassWord: (context, value) => {
      context.commit("_updatePassWord", value);
    },
    updateLocation: (context, value) => {
      context.commit("_updateLocation", value);
    },
    updatePin: (context, value) => {
      context.commit("_updatePin", value);
    }
  }
};
const list = {
  state: {
    participantList: []
  },
  getters: {
    ParticipantList: function (state) {
      return state.participantList;
    }
  },
  mutations: {
    _updateParticipantList(state, val) {
      state.participantList.push(val);
    }
  },
  actions: {
    updateParticipantList: (context, value) => {
      context.commit("_updateParticipantList", value);
    }
  }
};
// this is the single source of truth for the app,  we can store
// session data here that does not need to be persisted across
// multiple sessions. Persisted data will need to be stored in IndexedDB
export default new Vuex.Store({
  modules: {
    app: app,
    security: security,
    user: user,
    list: list
  },
  //mutations are synchronous
  mutations: {
    _resetState(state, val) {
      this.dispatch("updateLogin", false);
      this.dispatch("updateUserId", null);
      this.dispatch("updateUserName", null);
      this.dispatch("updatePassWord", null);
    }
  },
  //actions are asynchronous
  actions: {
    resetState: (context, value) => {
      context.commit("_resetState", null);
    }
  }
});
