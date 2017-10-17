<template>
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>
    
    <div v-else>

        <v-app id="inspire">
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
                    <!--<v-icon dark>account_circle</v-icon>-->
                <!--</v-btn>-->
                <v-btn  color="white" flat v-if="logTxt==='LOG IN'" router to="/users">Sign Up
                </v-btn>

                <v-btn color="white" flat v-if="logTxt==='LOG IN'" router to="/users/login">

                    {{logTxt}}

                </v-btn>
                <v-btn color="white" flat v-else v-on:click="logout">
                    {{logTxt}}
                </v-btn>
                <div v-else class="text-xs-center">

                    <v-btn color="white" dark slot="activator" disabled>Filter</v-btn>

                </div>
            </v-toolbar>
        <v-layout>

            <v-flex xs12 lg8 offset-sm2>
                <v-card>
                    <v-card-text>

                <h2 class="black--text">{{projectData.title}}</h2>
                <h6 class="black--text">{{projectData.subtitle}}</h6><br>
                <div style="margin-bottom: 20px" >
                    <!---->
                    <img style="height:auto;width:40%"
                            v-bind:src="imageUri"
                            alt="no project image" onerror="this.onerror=null;this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png';">

                </div>
                <h4 style="margin-top: 20px">Project description</h4>
                <span>{{projectData.description}}</span>

                <h4 style="margin-top: 40px">Progress</h4>
                    <v-flex xs10 offset-xs1>
                    <v-progress-linear v-model="ratio"></v-progress-linear>
                    </v-flex>
                    <span>Target: {{projectData.target}}</span><br>
                <span>Current Pledged: {{projectData.progress.currentPledged}}</span><br>
                <span>Number of Backers: {{projectData.progress.numberOfBackers}}</span><br>
                        <ol>
                            <h4 style="margin-top: 40px">Recent Pledges</h4>
                            <li v-for="(item,index) in backers">
                                <span>Backer name: {{item.username}}</span><br>
                                <span>Amount: {{item.amount}}</span><br>
                            </li>
                        </ol>

                        <h4 style="margin-top: 40px">Rewards</h4>
                <ol>
                    <li v-for="(item,index) in projectData.rewards">

                        <span>Reward ID:{{item.id}}</span><br>
                        <span>Amount: {{item.amount}}</span><br>
                    </li>
                </ol>

                <ol>
                    <h4 style="margin-top: 40px">Creators</h4>
                    <li v-for="(item,index) in projectData.creators" >
                        <span>Creator Name: {{item.username}}</span><br></li>
                </ol>


                <v-layout row >  <!--<v-card-actions>-->
                <v-flex xs6>

                        <v-btn color="orange" dark @click="goBack" >Back to Projects</v-btn>
                </v-flex>
                <v-flex xs6 offset-xs6 v-if="projectData.open===true">
                    <div v-if="found===true">
                        <v-btn color="orange" dark @click="goEdit">Edit Project</v-btn>
                    </div>
                <div v-else>
                    <v-btn color="orange" dark @click="goPledge">Pledge this project</v-btn>
                </div>

                </v-flex>
                </v-layout>
                <!--</v-card-actions>-->
                    </v-card-text>
                </v-card> <!--</v-card>-->

            </v-flex>

        </v-layout>
        </v-app>
    </div>

</template>


<script>

    export default{
        data(){
            return {
                error: "",
                errorFlag: false,
                projects: [],
                projectData: "",
                dialog: false,
                select: 'open',
                items: [
                    'open',
                    'close'
                ],
                found: false,
                imageUri:"",
                ratio:0,
                backers:[],
                logTxt: "",
            }
        },

        mounted: function () {

            this.checkLogin();
            this.getSingleProject(this.$route.params.id);

        },


        methods: {
            checkLogin: function () {

                if (localStorage.getItem('token')) {
//                    alert(localStorage.getItem('token'))
                    this.logTxt = 'LOG OUT'
                } else {
                    this.logTxt = 'LOG IN'
                }
            },

            logout: function () {

                this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/users/logout', "", {headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {
//                    alert("logint out");
                    localStorage.clear();
                    this.logTxt = 'LOG IN';
                    alert("successfully logged out")
                }, function (error) {
                    this.error = error;
                    localStorage.clear();
                    this.errorFlag = true;
                });

            },
//
            getSingleProject: function (project_id) {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects/' + project_id.toString())
                    .then(function (response) {
                        this.projectData = response.body;
                        console.log(this.projectData);
                        let i=0;
                        let anon_flag=false;
                        let anon_index=-1;
                        while (i!==this.projectData.backers.length && this.backers.length<5){
                            if(this.projectData.backers[i].username==="anonymous"){
                                if(!anon_flag){
                                    this.backers.push(this.projectData.backers[i]);
                                    anon_index=this.backers.length-1;
                                    anon_flag=true;
                                }
                                else{
                                    this.backers[anon_index].amount+=this.projectData.backers[i].amount;
                                }
                            }else{
                                this.backers.push(this.projectData.backers[i]);

                            }
                            i++

                        }


                        this.imageUri='http://csse-s365.canterbury.ac.nz:4842/api/v2'+response.body.imageUri;
                        this.ratio=this.projectData.progress.currentPledged/this.projectData.target*100;
                        console.log("ratio",this.projectData.progress.currentPledged/this.projectData.target);
                        for (let creator of this.projectData.creators) {
                            if (creator.id == localStorage.getItem('user_id')) {
//                                alert("is creator");
                                this.found = true;
                                break;
                            } else {
//                                alert("not a creator")
                            }
                        }
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });


            },


            goBack: function () {
                this.$router.push("/projects");
            },

            goEdit:function(){
                let id = this.$route.params.id;
                id = id.toString();
            this.$router.push('/projects/edit/'+id)
            },
            goPledge:function(){
                this.$router.push('/projects/pledge/'+this.$route.params.id)
            }

        }


        
        
    }
</script>


