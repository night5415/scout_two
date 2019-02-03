import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
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
    }
  ]
});


