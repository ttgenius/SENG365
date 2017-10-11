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
                <h2 class="black--text">{{projectData.title}}</h2>
                <h6 class="black--text">{{projectData.subtitle}}</h6><br>
                <div>
                    <img v-bind:src="imageUri" >
                </div>
                <h4>Project description</h4>
                <span>{{projectData.description}}</span>

                <v-divider></v-divider>

                <h4>Rewards</h4>
                <ol>
                <li v-for="(item,index) in projectData.rewards" v-if="index<5">

                        <span>Reward ID:{{item.id}}</span><br>
                         <span>Amount: {{item.amount}}</span><br>
                </li>
                </ol>
                <ol>
                    <v-divider></v-divider>

                    <h4>Creators</h4>
                <li v-for="(item,index) in projectData.creators" v-if="index<5">
                    <span>Creator Name: {{item.username}}</span><br></li>
                </ol>
                <v-divider></v-divider>
                <ol>
                    <h4>Backers</h4>
                <li v-for="(item,index) in projectData.backers" v-if="index<5">
                    <span>Backer name: {{item.username}}</span><br>
                    <span>Amount: {{item.amount}}</span><br>
                </li>
                </ol>
                <v-divider></v-divider>
                <span>Current Pledged: {{projectData.currentPledged}}</span><br>
                <span>Number of Backers: {{projectData.numberOfBackers}}</span><br>


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

                    <!--<v-card-actions>-->
                        <v-btn color="orange" dark @click="goBack" >Back</v-btn>
                    <div v-if="found===false">   <!--<div v-if="found===true">-->
                        <v-btn color="orange" dark @click="goEdit">Edit Project</v-btn>
                    </div>
                <!--</v-card-actions>-->

                <!--</v-card>-->

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
                imageUri:""

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
                        console.log(response.body)
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
//            getImg: function () {
//                this.$http.get('http://localhost:4941/api/v2/projects/'+this.$route.params.id+'/image')
//                    .then(function (response) {
//                        this.projects = response.data;
//                        console.log("dsafdsafsaf",response.data)
//                        for (let project of this.projects){
//                            console.log("project",project.imageUri.toString())
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

        }


        
        
    }
</script>


