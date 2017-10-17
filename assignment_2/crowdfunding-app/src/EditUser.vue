<template>
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>
    <div v-else>
    <v-app id="inspire">
        <v-toolbar color="indigo" dark>

            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-btn color="white" style="overflow: hidden;" flat router to="/users/create">
                Create a Project
            </v-btn>


            <v-btn color="white" flat router to="/users/">View All Projects</v-btn>

            <v-flex xs6 offset-1>
                <v-btn color="white" flat style="font-size :20px" router to="/">Crowdfunding Home
                </v-btn>
            </v-flex>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon dark>account_circle</v-icon>
            </v-btn>

            <v-btn color="white" flat v-on:click="logout">
                log out
            </v-btn>
        </v-toolbar>
        <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-form v-on:submit.prevent="updateUser">
                                    <v-layout row>
                                        <v-flex xs22>
                                            <v-container fluid grid-list-xl>
                                            <v-card>
                                                <v-card-text>

                                            <v-text-field
                                                    name="username"
                                                    label="Username"
                                                    id="username"
                                                    v-model="userData.username"
                                                    type="username"

                                            ></v-text-field>
                                            <v-text-field
                                                    name="email"
                                                    label="Email"
                                                    id="email"
                                                    v-model="userData.email"
                                                    type="email"

                                            ></v-text-field>
                                                    <v-text-field
                                                    name="location"
                                                    label="Location"
                                                    id="location"
                                                    v-model="userData.location"
                                                    type="userData.location"
                                                    ></v-text-field>
                                                </v-card-text>
                                                <v-btn type="submit">Update Detail</v-btn>
                                            </v-card>
                                            </v-container>

                                        </v-flex>
                                    </v-layout>
                                </v-form>
                                <v-form v-on:submit.prevent="updatePass">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-container fluid grid-list-xl>
                                            <v-card>
                                                <v-card-text>
                                                    <v-text-field
                                                            name="oldPassword"
                                                            label="old Password"
                                                            id="oldPassword"
                                                            v-model="oldPassword"
                                                            type="password">
                                                    </v-text-field>
                                            <v-text-field
                                                    name="password"
                                                    label="New Password"
                                                    id="password"
                                                    v-model="password"
                                                    type="password">

                                            </v-text-field>
                                            <v-text-field
                                                    name="confirmedPassword"
                                                    label="Confirm Password"
                                                    id="confirmedPassword"
                                                    v-model="confirmedPassword"
                                                    type="password"
                                                    :rules="[comparePasswords]"></v-text-field>
                                                </v-card-text>
                                                <v-btn type="submit">Update Password</v-btn>
                                            </v-card>
                                            </v-container>
                                        </v-flex>
                                    </v-layout>

                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
    </div>
</template>


<script>
    export default{
        data(){
            return {
              userData:{},
                oldPassword:'',
                password:'',
                confirmedPassword:'',
                error: '',
                errorFlag: ''
            }
        },
        mounted: function () {
            this.checklogin();
            this.getUser();

        },

        methods: {
            comparePasswords: function () {

                return this.password !== this.confirmedPassword ? 'Passwords do not match' : true;
            },
            checklogin: function () {
                if (!localStorage.getItem('token')) {
                    alert("not logged in!");
                    this.$router.push('/');
                }
            },

            logout: function () {

                this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/logout', "", {headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {
                    alert("logint out");
                    localStorage.clear();
                    this.logTxt = 'LOG IN';
                    alert("successfully logged out")
                }, function (error) {
                    this.error = error;
                    localStorage.clear();
                    this.errorFlag = true;
                });

            },
            getUser: function () {
                let id = localStorage.getItem('user_id');
                this.$http.get('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/' + id, {headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {
                    this.userData = response.data;
                    console.log("user_data",this.userData)
                }, function (error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },

            updateUser: function () {
                let id = localStorage.getItem('user_id');

                this.$resource['content-type'] = 'application/json';
                this.$http.put('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/' + id, {
                    "username": this.userData.username,
                    "email": this.userData.email,
                    "password": this.userData.password,
                    "location": this.userData.location

                },{headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {

                }, function (error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },
            updatePass: function () {
                let id = localStorage.getItem('user_id');
                if (this.oldPassword === this.userData.password) {
                    this.$resource['content-type'] = 'application/json';
                    this.$http.put('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/' + id, {
                        "username": this.userData.username,
                        "email": this.userData.email,
                        "password": this.userData.password,
                        "location": this.userData.location

                    },{headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {

                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });

                } else {
                    alert("wrong original password!")
                    this.$router.push('/users/' + id)
                }

            }
        }
    }
</script>

