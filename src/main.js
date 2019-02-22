import Vue from "vue";
import "./plugins/vuetify";
import material from "material-design-icons-iconfont";
import App from "./App.vue";
import router from "./router";
import store from "./pathStore";
import "./registerServiceWorker";
import Axios from "axios";
import VueAxios from "vue-axios";
import VueMoment from "vue-moment";
import PathDb from "@/plugins/PathDb";
import VueSignaturePad from "vue-signature-pad";

//custom plugin
import PathUtil from "@/plugins/PathUtil.js";
import PathLocation from "@/plugins/PathLocation.js";
import PathFilter from "@/plugins/PathFilter.js";
Vue.use(PathUtil, getBaseUrl());
Vue.use(PathLocation);
Vue.use(PathFilter);
Vue.use(PathDb);
//custom plugin

Vue.use(VueSignaturePad);
Vue.use(VueAxios, Axios);
Vue.use(VueMoment);
Vue.config.productionTip = true;
//this is going to need some work
window.onerror = function (messageOrEvent, source, lineno, colno, error) {
  let err = {
    message: messageOrEvent,
    error: {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    },
    source: source,
    line: lineno,
    column: colno
  };

  // var deferredPrompt;

  // window.addEventListener('beforeinstallprompt', function (e) {
  //   // Prevent Chrome 67 and earlier from automatically showing the prompt
  //   e.preventDefault();
  //   // Stash the event so it can be triggered later.
  //   deferredPrompt = e;

  //   deferredPrompt.prompt();
  //   // Wait for the user to respond to the prompt
  //   deferredPrompt.userChoice.then((choiceResult) => {
  //     if (choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the A2HS prompt');
  //     } else {
  //       console.log('User dismissed the A2HS prompt');
  //     }
  //     deferredPrompt = null;
  //   }); 
  // });

  //this.pathVue.$pathData.error.Save(err);
  return true;
};

Vue.config.errorHandler = (error, vm, info) => {
  //vm.$pathData.error.Save(error);
};

Vue.config.warnHandler = function (msg, vm, trace) {
  //vm.$pathData.error.Save({ message: msg, stack: trace });
};

// DECLARATION
window.pathVue = new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    version: 1
  },
  created: function () {
    console.log(`Data Collector version ${this.version}`);
  }
}).$mount("#app");
/**
 * This gets the base url for all API calls, we will use
 * :9013 for localhost, in the CLI set the VUE project to run
 * in HTTPS. The browser will complain about the site being unsafe
 * but we know better :)
 */
function getBaseUrl() {
  return "https://test-lighthouse.abpathfinder.net";
  // let hostName = window.location.hostname,
  //   local = "https://test-lighthouse.abpathfinder.net";

  // return hostName === "localhost" ? local : window.location.host;
}
