import Vue from 'vue'
import App from './App.vue';
import Home from './Home.vue';
import LogIn from './LogIn.vue'
import SignUp from './SignUp.vue';
import Projects from './Projects.vue';
import Users from './Users.vue'
import singleProject from './singleProject.vue'
import CreateProject from './CreateProject.vue'
import EditProject from './EditProject.vue'
import Pledge from './Pledge.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import Vuetify from 'vuetify';
Vue.use(Vuetify);

import Vuex from 'vuex';
Vue.use(Vuex);


const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'en',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true
};

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate,config);



const routes=[
    {
        path: "/",
        component: Home
    },
    {
        path: "/users",
        name:"SignUp",
        component: SignUp  //sign up
    },

    {
        path: "/users/login",
        name:"login",
        component:LogIn
    },
    {
        path: "/users/logout",
        name:"logout",
        component:Users
    },

    {
        path: "/projects",
        name:"projects",
        component:Projects
    },
    {
        path: "/projects/create",
        name:"createProject",
        component:CreateProject
    },
    {
        path: "/projects/edit/:id",
        name:"editProject",
        component:EditProject
    },
    {
        path: "/projects/pledge/:id",
        name:"Pledge",
        component:Pledge
    },
    {
        path: "/projects/:id",
        name:"project",
        component:singleProject
    },
    {
        path: "/projects/:id/image",
        name:"image",
        component:Projects
    },
    {
        path: "/projects/:id/rewards",
        name:"rewards",
        component:Projects
    },
    {
        path: "/projects/:id/pledge",
        name: "pledge",
        component: Projects
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
