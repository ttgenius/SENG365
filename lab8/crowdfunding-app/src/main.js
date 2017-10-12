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
import EditUser from './EditUser.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import Vuetify from 'vuetify';
Vue.use(Vuetify);

import Vuex from 'vuex';
Vue.use(Vuex);

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

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

// Vue.http.options.emulateJSON=true;


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
        path: "/users/:id",
        name:"user",
        component:EditUser
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
    //admin needs to be imp?
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

console.log("hahahahah");

// const store = new Vuex.Store({
//
//   state: {
//       token:"",
//       islogIn:false,
//       user_id:-1
//   },
//     // plugins: [
//     //     createPersistedState({
//     // // //         // storage: {
//     // // //         //     getItem: token => token,
//     // // //         //     setItem: (token) => {this.islogIn=true;this.token=token;},
//     // // //         //     removeItem: ()=>this.islogIn=false
//     // // //         // }
//     //     })
//     // ],
//
//   mutations: {
//     login(state,token,user_id) {
//       state.islogIn=true;
//       state.token = token;
//       state.user_id = user_id;
//
//     },
//       logout(state){
//         console.log("logggin out")
//         state.islogIn=false;
//         state.token="";
//         state.user_id=-1;
//           // localStorage.removeItem('token');
//           // localStorage.removeItem('id')
//       }
//
//   },
//     // getters: {
//     //     islogIn: state => {
//     //         return state.islogIn
//     //     }
//     // }
// actions:{
//       login({commit}){
//           commit('login')
//       }
//
// }

// });
// const LOGIN = "LOGIN";
// const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// const LOGOUT = "LOGOUT";
//
// const store = new Vuex.Store({
//     state: {
//         isLoggedIn: !!localStorage.getItem("token")
//     },
//     mutations: {
//         [LOGIN] (state) {
//             state.pending = true;
//         },
//         [LOGIN_SUCCESS] (state) {
//             state.isLoggedIn = true;
//             state.pending = false;
//         },
//         [LOGOUT](state) {
//             state.isLoggedIn = false;
//         }
//     },
//     actions: {
//         login({ commit }, token) {
//             commit(LOGIN); // show spinner
//             return new Promise(resolve => {
//                 setTimeout(() => {
//                     localStorage.setItem("token", token);
//                     commit(LOGIN_SUCCESS);
//                     resolve();
//                 }, 1000);
//             });
//         },
//         logout({ commit }) {
//             localStorage.removeItem("token");
//             commit(LOGOUT);
//         }
//     },
//     getters: {
//         isLoggedIn: state => {
//             return state.isLoggedIn
//         }
//     }
// });

new Vue({
    el: '#app',
    // store:store,
    router: router,
    render: h => h(App)
});
