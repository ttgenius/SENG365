<template>
    <v-app id="inspire">
        <v-toolbar color="indigo" dark>

            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-btn color="white" style="overflow: hidden;" flat router to="/projects/create">Create a Project</v-btn>


            <v-btn color="white" flat hidden router to="/projects/">View All Projects</v-btn>

            <v-flex xs6 offset-1>
                <v-btn color="white"  flat hidden style="font-size :20px"router to="/">Crowdfunding Home
                </v-btn>
            </v-flex>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon dark>account_circle</v-icon>
            </v-btn>

        </v-toolbar>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form v-on:submit.prevent="SignUp">
                                <v-layout row>
                                    <v-flex xs22>
                                        <v-text-field
                                                name="username"
                                                label="Username"
                                                id="username"
                                                v-model="username"
                                                type="username"
                                                :counter="128"
                                                :rules="nameRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs22>
                                        <v-text-field
                                                name="email"
                                                label="Email"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                :counter="128"
                                                :rules="emailRules"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                :count="20"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmedPassword"
                                                label="Confirm Password"
                                                id="confirmedPassword"
                                                v-model="confirmedPassword"
                                                type="password"
                                                :rules="[comparePasswords]"
                                                :count="20"
                                                required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs22>
                                        <v-text-field
                                                name="location"
                                                label="Location"
                                                id="location"
                                                v-model="location"
                                                type="location"
                                                :count="256"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">Sign up</v-btn>
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
</template>


<script>
    export default{
        data(){
            return {
                username: '',
                email: '',
                password: '',
                confirmedPassword: '',
                location: '',
                error: '',
                errorFlag: '',
                nameRules:[(v) => /^[a-zA-Z0-9_]*$/.test(v) || 'Username can only contain letters, numbers and underscores'],
                emailRules: [
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]

            }
        },

        methods: {
            comparePasswords:function(){

                return this.password !== this.confirmedPassword ? 'Passwords do not match' : true;
            },
            SignUp: function () {
                if (this.username == "") {

                    alert("Please enter an username!");
                } else if (this.password == "") {
                    alert("Please enter a password!")
                } else {
                    this.$resource['content-type'] = 'application/json';
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/users', {
                        "username": this.username,
                        "email":this.email,
                        "password": this.password,
                        "location":this.location

                    }).then(function (response) {
                        this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/login?username=' + this.username + '&email=' + this.email + "&password=" + this.password).then(function (response) {

                            console.log(response.body);
                            let token = response.body.token;
                            let user_id = response.body.id;
                            console.log(token);
//                            this.$store.commit('login', {token:token,user_id:user_id});
//                            this.$store.dispatch('login', {token:token,user_id:user_id});
//                            console.log("adsfasdf "+this.$store.state.islogIn);
//                            console.log("adsfasdf "+this.$store.state.token);
//                            console.log("adsfasdf "+this.$store.state.user_id);
                            localStorage.setItem('token',token);
                            localStorage.setItem('user_id',user_id);
//                            alert(islogIn);
                            alert(localStorage.getItem('token',token));
//
                            this.$router.push('/')
//
                        }, function (error) {
                            this.error = error;
                            this.errorFlag = true;
//                            alert(this.$store.state.islogIn);
//                            alert(this.$store.state.user_id);
//                            alert(window.localStorage.getItem('token'));
//                            alert(window.localStorage.getItem('user_id'));
                            alert(error.response.data);
                            console.log(error)
                        });


                    });


            }
            }


        }
    }
</script>

