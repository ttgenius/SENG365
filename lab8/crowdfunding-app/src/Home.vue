<template>
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>
    <div v-else>
    <v-app id="inspire">
        <v-tabs dark grow>
            <v-toolbar class="grey lighten-4" light>
                <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                <v-toolbar-title><router-link :to="{path: '/'}">Crowdfunding Home
                    </router-link></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon dark>account_circle</v-icon>
                </v-btn>
                <!--<v-btn icon>-->
                    <!--<v-icon>more_vert</v-icon>-->
                <!--</v-btn>-->
                <v-btn v-on:click="toSignUp">Sign Up

                    <!--<router-link :to="{path: 'users'}">Sign Up</router-link>-->

                </v-btn>
                <v-btn v-if="logTxt==='LOG IN'" v-on:click="toLogIn">

                   {{logTxt}}

                </v-btn>
                <v-btn v-else v-on:click="logout">
                   {{logTxt}}
                </v-btn>
                <v-tabs-bar class="grey lighten-4" light slot="extension">

                    <v-tabs-item>

                        <router-link :to="{path: 'projects/create'}">Create a project</router-link>

                    </v-tabs-item>
                    <v-tabs-item>

                        <router-link :to="{path: 'projects'}">View all projects</router-link>

                    </v-tabs-item>
                </v-tabs-bar>
            </v-toolbar>
        </v-tabs>

    </v-app>
    <!--<v-app id="inspire">-->
        <!--<v-tabs dark fixed centered>-->
            <!--<v-toolbar extended class="light-blue" dark>-->
                <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                <!--<v-spacer></v-spacer>-->
                <!--<v-btn icon>-->
                    <!--<v-icon>search</v-icon>-->
                <!--</v-btn>-->
                <!--<v-btn icon>-->
                    <!--<v-icon>more_vert</v-icon>-->
                <!--</v-btn>-->
                <!--<v-toolbar-title slot="extension" class="display-2">-->
                    <!--<router-link :to="{path: '/'}">Crowdfunding-->
                    <!--</router-link></v-toolbar-title>-->
            <!--</v-toolbar>-->
            <!--<v-tabs-bar class="cyan">-->
                <!--<v-tabs-slider class="yellow"></v-tabs-slider>-->
                <!--<v-tabs-item>-->

                <!--<router-link :to="{path: 'users'}">Sign Up</router-link>-->

                <!--</v-tabs-item>-->
                <!--<v-tabs-item>-->

                <!--<router-link :to="{path: 'users/login'}">Log in</router-link>-->

                <!--</v-tabs-item>-->
            <!--</v-tabs-bar>-->

        <!--</v-tabs>-->
        <!--</v-app>-->

    <!--</div>-->
        <!--Home Page-->
        <!--<a href="users">Sign up</a>-->
        <!--<a href="users/login">Log in</a>-->
        <!--<a href="projects">View all project</a>-->
        <!--<a href="projects/create">Create a project</a>-->
    <!--</div>-->
    </div>
</template>

<script>
    export default{
        data(){
            return {
                logTxt:""

            }
        },
        mounted: function () {

            alert(localStorage.getItem('token'));
//            localStorage.clear();
            this.checkLogin();

        },

        methods: {
            checkLogin: function () {

                if (localStorage.getItem('token')) {
                    alert(localStorage.getItem('token'))
                    this.logTxt = 'LOG OUT'
                } else {
                    this.logTxt = 'LOG IN'
                }
            },
            toSignUp: function () {
                this.$router.push('users')
            },

            toLogIn: function () {
                this.$router.push('users/login')
            },
            logout: function () {
                this.$http.post('http://localhost:4941/api/v2/users/logout',"",{headers:{'X-Authorization':localStorage.getItem('token')}}).then(function (response) {
                    alert("logint out");
                    localStorage.clear();
                    this.logTxt = 'LOG IN';
                    alert("successfully logged out")
                }, function (error) {
                this.error = error;
                this.errorFlag = true;
                });

            },
            toEditUser:function(){
                this.$router.push('/users/'+localStorage.getItem('user_id'))
            }

        }
    }
</script>