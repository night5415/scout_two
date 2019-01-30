import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Development from "@/views/Development.vue";
import pathConst from '@/statics/pathConstants';

Vue.use(Router);

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
      component: Home,
      //meta: { requiresAuth: true, authValue: 1234 } //can check permissions before routing
    },
    {
      path: pathConst.route.dev.path,
      name: pathConst.route.dev.name,
      component: Development,
      meta: { requiresAuth: true, authValue: 4321 } //can check permissions before routing
    },
    {
      path: "/about",
      name: "about"
    }
  ]
});


