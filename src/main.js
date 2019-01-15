import Vue from "vue";
import './plugins/vuetify';
import App from "./App.vue";
import router from "./router";
import store from "./pathStore";
import "./registerServiceWorker";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMoment from 'vue-moment';
import pathConst from '@/statics/pathConstants';

//custom plugin
import PathPlugin from '@/plugins/PathPlug.js';
Vue.use(PathPlugin, pathConst);
//custom plugin

//
CreateDb(pathConst);
// 
Vue.use(VueAxios, axios);
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

  this.pathVue.$pathSaveError(err);
  return true;
}

Vue.config.errorHandler = (error, vm, info) => {
  vm.$pathSaveError(error);
};
Vue.config.warnHandler = function (msg, vm, trace) {
  vm.$pathSaveError({ "message": msg, "stack": trace });
}

window.pathVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

function CreateDb(pathConst) {
  var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
  request.onupgradeneeded = function (event) {
    // Save the IDBDatabase interface
    var db = event.target.result;
    // Create an objectStore sfor this database
    db.createObjectStore(pathConst.dataStore.person, { keyPath: "Id" });
    db.createObjectStore(pathConst.dataStore.customer, { keyPath: "Id" });
    db.createObjectStore(pathConst.dataStore.account, { keyPath: "Id" });
    db.createObjectStore(pathConst.dataStore.sessionData, { keyPath: "Id" });
    db.createObjectStore(pathConst.dataStore.error, { keyPath: "Date" });
  };
}
