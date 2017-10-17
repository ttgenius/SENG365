<template>
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>
    <div v-else>
        <v-app id="inspire">


                <v-layout column>
                    <v-toolbar color="indigo" dark>

                        <v-toolbar-side-icon></v-toolbar-side-icon>

                        <v-btn color="white" style="overflow: hidden;" flat router to="/projects/create">
                            Create a Project
                        </v-btn>


                        <v-btn color="white" flat hidden router to="/projects/">View All Projects</v-btn>

                        <v-flex xs6 offset-1>
                            <v-btn color="white" flat hidden style="font-size :20px" router to="/">Crowdfunding Home
                            </v-btn>
                        </v-flex>

                        <v-spacer></v-spacer>

                        <!--<v-btn icon>-->
                            <!--<v-icon>search</v-icon>-->
                        <!--</v-btn>-->
                        <!--<v-btn icon>-->
                            <!--<v-icon>account_circle</v-icon>-->
                        <!--</v-btn>-->
                        <v-btn color="white" flat v-if="logTxt==='LOG IN'" router to="/users">Sign Up
                        </v-btn>

                        <v-btn color="white" flat v-if="logTxt==='LOG IN'" router to="/users/login">

                            {{logTxt}}

                        </v-btn>
                        <v-btn color="white" flat v-else v-on:click="logout">
                            {{logTxt}}
                        </v-btn>
                    </v-toolbar>
                    <v-flex xs12>
                        <v-carousel style="height:100%" v-if="loaded">
                            <v-carousel-item v-for="(item,i) in items" v-bind:src="item.uri" v-bind:key="i"
                                             style="background-size:contain;">
                                <div class="title">{{item.title}}</div>
                            </v-carousel-item>
                        </v-carousel>
                    </v-flex>
                </v-layout>

        </v-app>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                loaded:false,
                logTxt: "",
                items: [

                ],
                error: '',
                errorFlag: '',

            }
        },
        mounted: function () {

            alert(localStorage.getItem('token'));
//            localStorage.clear();
            this.checkLogin();
            this.getProjects();
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
            toEditUser: function () {
                if (localStorage.getItem('user_id')){
                this.$router.push('/users/' + localStorage.getItem('user_id'))
            }else{
                    alert("not logged in!");
                    this.$router.push('/');
                }
            },

            getProjects: function () {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects')
                    .then(function (response) {
                        let projects = response.data;
                        console.log("dsafdsafsaf", response.data);
                        let count = 0;
                        for (let project of projects) {
                            console.log("xx"+project.imageUri)
                            if (count < 4 && project.open === true && project.imageUri !== null && project.imageUri !== undefined) {


                                let uri = 'http://csse-s365.canterbury.ac.nz:4842/api/v2' + project.imageUri;
                                this.items.push({"uri": uri, "title": project.title, "id": '/projects/' + project.id});
                                count++;
                            }
                        }
                        this.loaded=true;
                        console.log("rui", this.items)
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

        }
    }
</script>
<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        left:0px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
        margin-bottom: 0px;
    }
</style>