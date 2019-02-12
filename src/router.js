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
import pathConst from '@/statics/pathConstants';

Vue.use(Router);
// these routes point to areas of the app and can
// be blocked behind permission using the meta object,
// this is checked in main.js in router.beforeResolve
// https://router.vuejs.org/
export default new Router({
  routes: [
    {
      path: pathConst.route.login.path,
      name: pathConst.route.login.name,
      component: Login
    },
    {
      path: pathConst.route.home.path,
      name: pathConst.route.home.name,
      component: Home
    },
    {
      path: pathConst.route.myday.path,
      name: pathConst.route.myday.name,
      component: MyDay
    },
    {
      path: pathConst.route.patient.path,
      name: pathConst.route.patient.name,
      component: Patient
    },
    {
      path: pathConst.route.new.path,
      name: pathConst.route.new.name,
      component: NewEvent
    },
    {
      path: pathConst.route.offline.path,
      name: pathConst.route.offline.name,
      component: Offline
    },
    {
      path: pathConst.route.dev.path,
      name: pathConst.route.dev.name,
      component: Development,
      meta: {
        requiresAuth: true,
        authValue: 4321
      }
    },
    {
      path: pathConst.route.sandbox.path,
      name: pathConst.route.sandbox.name,
      component: SandBox
    },
    {
      path: pathConst.route.error.path,
      name: pathConst.route.error.name,
      component: Error
    },
    {
      path: pathConst.route.setting.path,
      name: pathConst.route.setting.name,
      component: Setting
    }
  ]
});


