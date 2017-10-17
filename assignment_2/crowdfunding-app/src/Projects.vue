<template>
<v-app id="inspire">
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>

    <div v-else>
                    <v-layout column>

                            <v-toolbar color="indigo" dark>
                                <v-toolbar-side-icon></v-toolbar-side-icon>

                                <v-btn color="white" style="overflow: hidden;" flat router to="/projects/create">
                                    Create a Project
                                </v-btn>


                                <v-btn color="white" flat hidden @click="toProjects">View All Projects</v-btn>

                                <v-flex xs6 offset-1>
                                    <v-btn color="white" flat hidden style="font-size :20px" router to="/">Crowdfunding Home
                                    </v-btn>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-form>
                                    <v-layout row>

                                            <v-text-field
                                                    solo
                                                    label="Search"
                                                    name="search"
                                                    id="search"
                                                    v-model="search"
                                                    type="search"
                                            ></v-text-field>

                                        <v-btn @click="searchProject" icon>
                                            <v-icon>search</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-form>

                                <v-btn  color="white" flat v-if="logTxt==='LOG IN'" router to="/users">Sign Up
                                </v-btn>

                                <v-btn color="white" flat v-if="logTxt==='LOG IN'" router to="/users/login">

                                    {{logTxt}}

                                </v-btn>
                                <v-btn color="white" flat v-else v-on:click="logout">
                                    {{logTxt}}
                                </v-btn>
                                <div v-if="user_id!==null" class="text-xs-center">
                                    <v-menu offset-y>
                                        <v-btn color="white" flat slot="activator" >Filter</v-btn>
                                        <v-list>
                                            <v-list-tile v-for="item in items" :key="item" v-on:click="filter(item)">
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </div>
                                <div v-else class="text-xs-center">

                                        <v-btn color="white" dark slot="activator" disabled>Filter</v-btn>

                                </div>
                            </v-toolbar>

                            <v-container fluid grid-list-md class="grey lighten-4">
                                <v-layout row wrap>
                                    <v-flex xs4 style="padding-left:15px;padding-right:15px;padding-top:15px;ingmargin:auto;height:100%"

                                            v-for="project in projects"
                                            :key="project.id"

                                    >
                                        <v-card style="margin:auto;height:100%">
                                            <v-card-media style="height:200px">
                                                <img
                                                    v-bind:src="'http://csse-s365.canterbury.ac.nz:4842/api/v2'+project.imageUri"
                                                   style="height:100%; width:50%;margin: auto" alt="no project image" onerror="this.onerror=null;this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png';">


                                            </v-card-media>
                                                <v-card-title style="padding:20px" primary-title>
                                                    <div>
                                                        <h3 class="headline mb-0" style="height:60px">{{project.title}}<span v-if="!project.open" style="text-align: left;padding:10px;color:red">(Closed)</span></h3>
                                                        <p style="text-align: left;height:60px;padding:10px">{{project.subtitle}}</p>
                                                    </div>

                                                </v-card-title>
                                            <div style="margin-bottom: 10px">
                                                <v-card-actions>
                                                    <v-btn flat color="orange" v-on:click="goto(project.id)">View Project</v-btn>
                                                </v-card-actions>
                                            </div>
                                        </v-card>
                                    </v-flex>

                                    <v-flex xs12 sm6 offset-sm3>
                                        <div v-if="!searched">
                                        <v-btn class="primary" dark v-if="startIndex>0" @click="previous">previous</v-btn>
                                        <v-btn class="primary" dark v-if="projects.length!=0" @click="next">next</v-btn>
                                    </div>
                                        </v-flex>


                                </v-layout>
                            </v-container>

                    </v-layout>
    </div>

</v-app>


</template>

<script>
    export default{

        data(){
            return {
                error: "",
                errorFlag: false,
                startIndex:0,
                count:6,
                projects:[],
                items:[
                    'Creator View',
                    'Backer View',
                    'Clear Filter'
                ],
                user_id:localStorage.getItem('user_id'),
                filters:null,
                item:null,
                logTxt:"",
                search:"",
                searched:false
            }
        },

        mounted:function(){
            this.updateProjects();
            this.checkLogin();
        },

        methods: {

            updateProjects: function () {
                this.searched = false;
                let params = {
                    params: {
                        startIndex: this.startIndex,
                        count: this.count,
                        open: true,
                    }
                };
                if (this.filters === 'Creator View') {
                    params = {
                        params: {
                            startIndex: this.startIndex,
                            count: this.count,
                            creator: parseInt(this.user_id)
                }
                }

                }
                if (this.filters === 'Backer View') {
                    params = {
                        params: {
                            startIndex: this.startIndex,
                            count: this.count,
                            backer: parseInt(this.user_id)
                        }
                    }
                }

                this.$http.get('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects?', params).then(function (response) {
                    if (response.body.length === 0) {
                        alert("Nothing here");
                        this.projects = []

                    }
                    else {
                        this.projects = response.body;
                        console.log(this.projects);
                    }

                }, function (error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },

            next: function () {
                this.startIndex += this.count;
                this.updateProjects()
            },
            previous: function () {

                this.startIndex -= this.count;
                this.updateProjects()
            },
            goto: function (id) {
                this.$router.push('/projects/' + id);
            },

            filter: function (item) {
                this.filters = item;
                this.startIndex = 0;
                this.updateProjects();

            },
            toHome: function () {
                this.$router.push('/')
            },
            checkLogin: function () {

                if (localStorage.getItem('token')) {
//                    alert(localStorage.getItem('token'))
                    this.logTxt = 'LOG OUT'
                } else {
                    this.logTxt = 'LOG IN'
                }
            },
            toSignUp: function () {
                this.$router.push('users')
            },

            toLogIn: function () {
                this.$router.go('users/login')
            },
            logout: function () {

                this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/logout', "", {headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {
//                    alert("logint out");
                    localStorage.clear();
                    this.logTxt = 'LOG IN';
                    alert("successfully logged out")
                    this.$router.push('/')
                }, function (error) {
                    this.error = error;
                    localStorage.clear();
                    this.errorFlag = true;
                });

            },
            toProjects:function(){

                    this.searched = false;
                    this.startIndex = 0;
                    this.filters='Clear Filter';
                    this.updateProjects();



            },
            searchProject: function () {
                if (this.search !=='') {
                    this.searched = true;
                    let params = {
                        params: {
                            startIndex: 0,
                            open: true,
                        }
                    };
                    this.$http.get('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects?', params).then(function (response) {
                        if (response.body.length === 0) {
                            alert("Nothing here");
                            this.projects = []

                        }
                        else {

                            let matchedProject = []
                            this.projects = response.body;
                            console.log("searching", this.search.toLowerCase());


                            for (let project of this.projects) {
                                console.log("title", project.title.toLowerCase())
                                console.log("includes?", project.title.toLowerCase().includes(this.search.toLowerCase()) || project.subtitle.toString().includes(this.search.toLowerCase()))
                                if ((project.title.toLowerCase().includes(this.search.toLowerCase())) || (project.subtitle.toString().includes(this.search.toLowerCase()))) {
                                    matchedProject.push(project)
                                    console.log("title", project.title)

                                } else {
                                    console.log("dafas")
                                }
                            }
                            if (matchedProject.length === 0) {
                                return alert("nothing matches!");

                            } else {
                                console.log("found projects", this.projects)
                                this.projects = matchedProject
                            }

                        }

                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
                }else{
                    this.updateProjects();
                }

            }
        }
    }
</script>

