<!--projectData.progress.currentpledged undifined-->

<template>
    <div v-if="errorFlag" style="color: red;">
        {{error}}
    </div>
    
    <div v-else>


        <v-app id="inspire">
        <!--<td>aaaaaaaaaaaaaa{{$route.params.userId}}</td>-->
        <v-layout>

            <v-flex xs12 lg8 offset-sm2>
                <v-card>
                    <v-card-text>

                <h2 class="black--text">{{projectData.title}}</h2>
                <h6 class="black--text">{{projectData.subtitle}}</h6><br>
                <div style="margin-bottom: 20px">
                    <img
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

                <ol>
                    <h4 style="margin-top: 40px">Backers</h4>
                    <li v-for="(item,index) in projectData.backers" v-if="index<5">
                        <span>Backer name: {{item.username}}</span><br>
                        <span>Amount: {{item.amount}}</span><br>
                    </li>
                </ol>

                <!--<v-card>-->
                    <!--<v-card-media-->
                            <!--class="white&#45;&#45;text"-->

                            <!--height="200px"-->
                            <!--v-bind:src="imageUri">-->

                        <!--<v-container fill-height fluid>-->
                            <!--<v-layout fill-height>-->
                                <!--<v-flex lg12 flexbox>-->
                                    <!--<span class="headline"></span>-->
                                <!--</v-flex>-->
                            <!--</v-layout>-->
                        <!--</v-container>-->
                    <!--</v-card-media>-->
                    <!--<v-card-title>-->
                        <!--<div>-->
                                    <!--<span>Project title:{{projectData.title}} </span><br>-->
                                    <!--<span>Project subtitle: {{projectData.subtitle}}</span><br>-->
                            <!--<span>Project description:{{projectData.description}}</span><br>-->
                            <!--<span>Current Pledged: {{projectData.progress.currentPledged}}</span><br>-->
                            <!--<span>Number of Backers: {{projectData.progress.numberOfBackers}}</span><br>-->


                            <!--<ol>-->
                                <!--<li v-for="(item,index) in projectData.creators" v-if="index<5">-->
                                    <!--creator name: {{item.username}}</li>-->
                            <!--</ol>-->


                            <!--<ol>-->
                            <!--<li v-for="(item,index) in projectData.rewards" v-if="index<5">-->
                               <!--Reward id: {{item.id}},  Amount: {{item.amount}}</li>-->
                        <!--</ol>-->

                            <!--<ol>-->
                            <!--<li v-for="(item,index) in projectData.backers" v-if="index<5">-->
                            <!--Backer name: {{item.username}},  Amount: {{item.amount}}</li>-->
                            <!--</ol>-->

                        <!--</div>-->
                    <!--</v-card-title>-->


                <v-layout row >  <!--<v-card-actions>-->
                <v-flex xs6>

                        <v-btn color="orange" dark @click="goBack" >Back to Projects</v-btn>
                </v-flex>
                <v-flex xs6 offset-xs6>
                    <div v-if="found===true">   <!--<div v-if="found===true">-->
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
                ratio:0

            }
        },

        mounted: function () {
            this.getSingleProject(this.$route.params.id);
        },


        methods: {
//            getProjects: function () {
//                this.$http.get('http://localhost:4941/api/v2/projects')
//                    .then(function (response) {
//                        this.projects = response.data;
//                        console.log("dsafdsafsaf",response.data)
//                        for (let project of this.projects){
//                            console.log("project",this.projects[0].length)
//                            if (project.id==this.$route.params.id && project.open===true){
//                                console.log("found img"+project.id+"img   "+project.imageUri)
//                                this.imageUri='http://localhost:4941/api/v2/'+project.imageUri;
//                                break;
//                            }
//                        }
//                        console.log("adfasdfdafdfads", this.imageUri)
//                    }, function (error) {
//                        this.error = error;
//                        this.errorFlag = true;
//                    });
//            },
            getSingleProject: function (project_id) {
                this.$http.get('http://localhost:4941/api/v2/projects/' + project_id.toString())
                    .then(function (response) {
                        this.projectData = response.body;
                        this.imageUri='http://localhost:4941/api/v2'+response.body.imageUri
                        this.ratio=this.projectData.progress.currentPledged/this.projectData.target*100;
                        console.log("ratio",this.projectData.progress.currentPledged/this.projectData.target);
                        for (let creator of this.projectData.creators) {
                            if (creator.id == localStorage.getItem('user_id')) {
                                alert("is creator");
                                this.found = true;
                                break;
                            } else {
                                alert("not a creator")
                            }
                        }
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });


            },


//            viewProject: function (project) {
//                alert("hahaha");
////                this.$resource['content-type'] = 'application/json';
//                console.log(typeof project.id);
//                this.$http.get('http://localhost:4941/api/v2/projects/'+ project.id.toString())
//
//                    .then(function (response){
////                        for (let i = 0; i < this.projects.length; i++) {
////                            if (parseInt(projects[i].id) === parseInt(response.data.id)) {
//////                                console.log("this response",response.data);
//                        console.log("response",response.data.title);
//                        this.title = response.data.title;
//                        return response.data
////                            }
////                        }
//                    }, function (error) {
//                        this.error = error;
//                        this.errorFlag = true;
//                    });
//            },

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


