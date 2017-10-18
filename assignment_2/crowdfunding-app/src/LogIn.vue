<template>
 <v-app id="inspire">
    <div>

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
                        <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                            {{error}}
                        </v-alert>
                        <v-container>
                            <form v-on:submit.prevent="LogIn">
                                <v-layout row>
                                    <v-flex xs22>
                                        <v-text-field
                                                name="loginName"
                                                label="Username/Email"
                                                id="loginName"
                                                v-model="loginName"
                                                type="loginName"
                                                :rules="loginRules"
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
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">Log in</v-btn>
                                    </v-flex>
                                </v-layout>

                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
        <v-container><v-layout row>
            <v-flex xs12>
                <router-link :to="{name:'SignUp'}">No account? Click here to sign up!</router-link>
            </v-flex>
        </v-layout></v-container>
    </div>
 </v-app>

</template>


<script>
    export default{
        data(){
            return {
                logTxt:"",
                loginName:'',
                password: '',
                error: '',
                errorFlag: '',
                loginRules:[
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)||/^[a-zA-Z0-9_]*$/.test(v) || 'Username or E-mail must be valid'],

            }
        },

        methods: {
            LogIn: function () {
                let isEmail = false;
                for (let char of this.loginName) {
                    if (char === '@') {
                        isEmail = true;
                        break;
                    }
                }
                let pa ="";
                if(isEmail===false) {
                    pa = 'username=';
                }else {
                    pa = 'email=';
                }
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4824/api/v2/users/login?'+pa + this.loginName + "&password=" + this.password).then(function (response) {

                        console.log(response.body);
                        let token = response.body.token;
                        let user_id = response.body.id;
                        console.log(token);
                        localStorage.setItem('token', token);
                        localStorage.setItem('user_id', user_id);
                        this.$router.push('/')
                    }, function (error) {
                        this.error = error.bodyText;
                        this.errorFlag = true;

                    });
                }


            }

    }
</script>

