import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Users from './Users.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const routes=[
    {
      path: "/",
        component: Home
    },
    {
      path: "/users",
        name:"users",
      component: Users
    },
    {
    path: "/users/:userId",
        name:"user",
        component:Users
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});



new Vue({
  el: '#app',
    router: router,
  render: h => h(App)
});
