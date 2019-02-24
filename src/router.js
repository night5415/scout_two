import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

import MyDay from "./views/ReportMyDay.vue";
import Patient from "./views/Patient.vue";
import NewEvent from "./views/NewEvent.vue";
import Offline from "./views/WorkOffline.vue";
import Error from "./views/Error.vue";
import Setting from "./views/Setting.vue";

import Development from "@/views/Development.vue";
import SandBox from "@/views/SandBox.vue";
import {
  route
} from "@/statics/pathConstants";

Vue.use(Router);
// these routes point to areas of the app and can
// be blocked behind permission using the meta object,
// this is checked in main.js in router.beforeResolve
// https://router.vuejs.org/
const pathRouter = new Router({
  routes: [{
      path: route.login.path,
      name: route.login.name,
      component: Login
    },
    {
      path: route.home.path,
      name: route.home.name,
      component: Home
    },
    {
      path: route.myday.path,
      name: route.myday.name,
      component: MyDay
    },
    {
      path: route.patient.path,
      name: route.patient.name,
      component: Patient
    },
    {
      path: route.new.path,
      name: route.new.name,
      component: NewEvent
    },
    {
      path: route.offline.path,
      name: route.offline.name,
      component: Offline
    },
    {
      path: route.dev.path,
      name: route.dev.name,
      component: Development,
      meta: {
        requiresAuth: true,
        authValue: 4321
      }
    },
    {
      path: route.sandbox.path,
      name: route.sandbox.name,
      component: SandBox
    },
    {
      path: route.error.path,
      name: route.error.name,
      component: Error
    },
    {
      path: route.setting.path,
      name: route.setting.name,
      component: Setting
    }
  ]
});

/**
 * this function fires before each route change, we can put custom
 * logic to control the flow.
 * https://router.vuejs.org/api/#router-beforeresolve
 */
pathRouter.beforeResolve((to, from, next) => {
  var self = this;
  if (to.name === "login") next();
  //if not logged in, go to login screen
  if (!window.pathVue || !window.pathVue.$store.getters.isLoggedIn) {
    next("/");
  } else {
    // permissions are implemented on the router, we will need
    // to setup a mechanism for checking if the user has a specific
    // permission to continue
    if (to.meta.requiresAuth) {
      const promptValue = window.prompt("Do you have permission to continue?");
      next(parseInt(promptValue) === to.meta.authValue);
    } else {
      next();
    }
  }
});

export default pathRouter;