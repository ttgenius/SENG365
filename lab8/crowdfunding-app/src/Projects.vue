<template>


            <v-layout row>

                <v-flex xs12 sm6 offset-sm3>
                    <v-toolbar class="grey lighten-4" light>
                        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                        <v-toolbar-title><router-link :to="{path: '/'}">Crowdfunding Home
                        </router-link></v-toolbar-title>
                        <v-spacer></v-spacer>

                        <!--<v-btn icon>-->
                        <!--<v-icon>more_vert</v-icon>-->
                        <!--</v-btn>-->
                        <!--<v-tabs-item>-->

                            <!--<router-link :to="{path: 'users'}">Sign Up</router-link>-->

                        <!--</v-tabs-item>-->
                        <!--<v-tabs-item>-->

                            <!--<router-link :to="{path: 'users/login'}">Log in</router-link>-->

                        <!--</v-tabs-item>-->
                    </v-toolbar>
                    <v-card>
                        <v-toolbar class="cyan" dark>
                            <v-toolbar-title>All Projects</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>search</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-list two-line>
                            <div v-for="item in projects">


                                <v-list-tile  v-bind:key="item.title" @click="goto(item.id)" >
                                    <v-list-tile-avatar>
                                        <!--<img v-bind:src="item.avatar">-->
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider  v-bind:inset="true"></v-divider>
                            </div>
                        </v-list>
                        <v-btn v-if="startIndex>0" @click="previous">previous</v-btn>
                        <v-btn  @click="next">next</v-btn>
                    </v-card>
                </v-flex>
            </v-layout>



    <!--<div>-->
        <!--<div v-for="project in projects">-->  <!--<div v-if="$route.params.id == item.id">-->
                                    <!--<span>Project title: {{viewProject(item.id).title}}</span><br>-->
                                    <!--<span>Project subtitle: {{viewProject(item.id).subtitle}}</span><br>-->
                                    <!--<span>Project description: {{viewProject(item.id).description}}</span><br>-->
                                <!--</div>-->
            <!--&lt;!&ndash;<v-divider v-bind:inset="true"></v-divider>&ndash;&gt;-->
            <!--{{project.title}}-->
            <!--{{project.subtitle}}-->
        <!--</div>-->
    <!--</div>-->


</template>

<script>
    export default{
        data(){
            return {
                startIndex:0,
                count:10,
                projects:[],

            }
        },
        mounted:function(){
            this.updateProjects()
        },
        methods: {

            updateProjects: function () {

                    this.$http.get('http://localhost:4941/api/v2/projects?', {params:{
                        startIndex:this.startIndex,
                        count:this.count,
                        open:true,
                    }
                }).then(function (response){
                    if(response.body.length===0){
                        alert("end of list");
                        this.previous();
                    }
                    else {
                        this.projects = response.body;
                    }

                    })
            },
            next:function(){
                this.startIndex += this.count;
                this.updateProjects()
            },
            previous:function(){

                this.startIndex -= this.count;
                this.updateProjects()
            },
            goto:function(id){
                this.$router.push("projects/"+id);
            }


        }
    }
</script>

