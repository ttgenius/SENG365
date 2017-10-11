<template>
 <v-app id="inspire">
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{error.bodyText}}
        </div>

    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form v-on:submit.prevent="LogIn">
                                <v-layout row>
                                    <v-flex xs22>
                                        <v-text-field
                                                name="username"
                                                label="Username"
                                                id="username"
                                                v-model="username"
                                                type="username"
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
    </div>
 </v-app>

</template>


<script>
    export default{
        data(){
            return {
                username: '',
                email: '',
                password: '',
                error: '',
                errorFlag: '',
            }
        },

        methods: {

            LogIn: function () {


                        this.$http.post('http://localhost:4941/api/v2/users/login?username=' + this.username + '&email=' + this.email + "&password=" + this.password).then(function (response) {

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
                            alert(islogIn);
                            alert(localStorage.getItem('token',token));
                            this.$router.go('/')
//                            this.$store.dispatch("login", {
//                               "token":token
//                            }).then(() => {
//                                this.$router.push("/")
//                            });
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
                    }

            }



    }
</script>

