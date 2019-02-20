import Vue from "vue";
import './plugins/vuetify';
import App from "./App.vue";
import router from "./router";
import store from "./pathStore";
import "./registerServiceWorker";
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueMoment from 'vue-moment';
import PathConst from '@/statics/pathConstants';
import PathDb from '@/plugins/PathDb';
import VueSignaturePad from 'vue-signature-pad';

//custom plugin
import PathUtil from '@/plugins/PathUtil.js';
import PathLocation from '@/plugins/PathLocation.js';
import PathData from '@/plugins/PathData.js'
Vue.use(PathUtil, getBaseUrl());
Vue.use(PathLocation);
Vue.use(PathData, getBaseUrl());
Vue.use(PathConst);
Vue.use(PathDb, PathConst);
//custom plugin 

Vue.use(VueSignaturePad);
Vue.use(VueAxios, Axios);
Vue.use(VueMoment);
Vue.config.productionTip = false;
//this is going to need some work 
window.onerror = function (messageOrEvent, source, lineno, colno, error) {
  let err = {
    "message": messageOrEvent,
    "error": {
      "code": error.code,
      "message": error.message,
      "name": error.name,
      "stack": error.stack
    },
    "source": source,
    "line": lineno,
    "column": colno
  };

  this.pathVue.$pathData.error.Save(err);
  return true;
}

Vue.config.errorHandler = (error, vm, info) => {
  vm.$pathData.error.Save(error);
};

Vue.config.warnHandler = function (msg, vm, trace) {
  vm.$pathData.error.Save({ "message": msg, "stack": trace });
}
/**
 * this function fires before each route change, we can put custom
 * logic to control the flow.
 * https://router.vuejs.org/api/#router-beforeresolve
 */
router.beforeResolve((to, from, next) => {
  var self = this;
  if (to.name === 'login')
    next();
  //if not logged in, go to login screen 
  if (!window.pathVue || !window.pathVue.$store.getters.isLoggedIn) {
    next('/');
  } else {
    // permissions are implemented on the router, we will need
    // to setup a mechanism for checking if the user has a specific
    // permission to continue
    if (to.meta.requiresAuth) {
      const promptValue = window.prompt('Do you have permission to continue?');
      next(parseInt(promptValue) === to.meta.authValue)
    } else {
      next();
    }
  }
});

window.pathVue = new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    version: 1,
    pathConst: PathConst
  },
  created: function () {
    console.log(`Data Collector version ${this.version}`);
    this.$pathUtil.CreateDatabase(this.PathConst);
  }
}).$mount("#app");
/**
 * This gets the base url for all API calls, we will use
 * :9013 for localhost, in the CLI set the VUE project to run
 * in HTTPS. The browser will complain about the site being unsafe
 * but we know better :)
 */
function getBaseUrl() {
  let hostName = window.location.hostname,
    local = 'http://localhost:9013';

  return hostName === 'localhost' ?
    local :
    window.location.host;
}
