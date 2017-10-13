<template>
<v-app id="inspire">

            <!--<v-layout row>-->

                <!--<v-flex xs12 sm6 offset-sm3>-->
                    <!--<v-toolbar class="grey lighten-4" light>-->
                        <!--&lt;!&ndash;<v-toolbar-side-icon></v-toolbar-side-icon>&ndash;&gt;-->
                        <!--<v-toolbar-title><router-link :to="{path: '/'}">Crowdfunding Home-->
                        <!--</router-link></v-toolbar-title>-->
                        <!--<v-spacer></v-spacer>-->

                        <!--<v-btn icon>-->
                        <!--<v-icon>more_vert</v-icon>-->
                        <!--</v-btn>-->
                        <!--<v-tabs-item>-->

                            <!--<router-link :to="{path: 'users'}">Sign Up</router-link>-->

                        <!--</v-tabs-item>-->
                        <!--<v-tabs-item>-->

                            <!--<router-link :to="{path: 'users/login'}">Log in</router-link>-->

                        <!--</v-tabs-item>-->
                    <!--</v-toolbar>-->
                <!--</v-flex>-->
            <!--</v-layout>-->

                    <v-layout column>

                            <v-toolbar color="indigo" dark>
                                <v-toolbar-side-icon></v-toolbar-side-icon>
                                <v-toolbar-title>All Projects</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tabs-item class="">
                                <router-link :to="{path: '/'}">Crowdfunding Home
                                </router-link></v-tabs-item>
                                <v-btn icon>
                                    <v-icon>search</v-icon>
                                </v-btn>
                                <div v-if="user_id!==null" class="text-xs-center">
                                    <v-menu offset-y>
                                        <v-btn color="primary" dark slot="activator" >Filter</v-btn>
                                        <v-list>
                                            <v-list-tile v-for="item in items" :key="item" v-on:click="filter(item)">
                                                <v-list-tile-title>{{ item }}</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </div>
                                <div v-else class="text-xs-center">

                                        <v-btn color="primary" dark slot="activator" disabled>Filter</v-btn>

                                </div>
                            </v-toolbar>

                            <v-container fluid grid-list-md class="grey lighten-4">
adasdfasdf{{projects.length}}
                                <v-layout row wrap>
                                    <div style="width:500px;margin:auto;height:500px"

                                            v-for="project in projects"
                                            :key="project.id"
                                    >
                                        <v-card>
                                            <v-card-media height="200px">
                                                <img
                                                    v-bind:src="'http://localhost:4941/api/v2'+project.imageUri"
                                                   style="height:100%; width:50%;margin: auto" alt="no project image" onerror="this.onerror=null;this.src='https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png';">


                                            </v-card-media>
                                                <v-card-title primary-title>
                                                    <div>
                                                        <h3 class="headline mb-0">{{project.title}}</h3>
                                                        <h8>{{project.subtitle}}</h8>
                                                    </div>
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-btn flat color="orange" @click="goto(project.id)">View Project</v-btn>
                                                </v-card-actions>
                                        </v-card>
                                    </div>

                                    <v-flex xs12 sm6 offset-sm3>
                                        <div v-if="!filtered">qewqwer{{filtered}}
                                        <v-btn class="primary" dark v-if="startIndex>0" @click="previous">previous</v-btn>
                                        <v-btn class="primary" dark @click="next">next</v-btn>
                                    </div>
                                    <div v-else>
                                        aaaaaa{{filtered}}
                                            <v-btn class="primary" dark v-if="startIndex>0" @click="filterPrevious()">previous</v-btn>
                                            <v-btn class="primary" dark  @click="filterNext()">next</v-btn>
                                    </div>
                                        </v-flex>


                                </v-layout>
                            </v-container>

                    </v-layout>
                    <!--<v-card>-->
                        <!--<v-toolbar class="cyan" dark>-->
                            <!--<v-toolbar-title>All Projects</v-toolbar-title>-->
                            <!--<v-spacer></v-spacer>-->
                            <!--<v-btn icon>-->
                                <!--<v-icon>search</v-icon>-->
                            <!--</v-btn>-->
                        <!--</v-toolbar>-->
                        <!--<v-list two-line>-->
                            <!--<div v-for="item in projects">-->


                                <!--<v-list-tile  v-bind:key="item.title" @click="goto(item.id)" >-->
                                    <!--<v-list-tile-avatar>-->
                                        <!--&lt;!&ndash;<img v-bind:src="item.avatar">&ndash;&gt;-->
                                    <!--</v-list-tile-avatar>-->
                                    <!--<v-list-tile-content>-->
                                        <!--<v-list-tile-title v-html="item.title"></v-list-tile-title>-->
                                        <!--<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>-->
                                    <!--</v-list-tile-content>-->
                                <!--</v-list-tile>-->
                                <!--<v-divider  v-bind:inset="true"></v-divider>-->
                            <!--</div>-->
                        <!--</v-list>-->

                    <!--</v-card>-->
                <!--</v-flex>-->
            <!--</v-layout>-->



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

</v-app>

</template>

<script>
    export default{

        data(){
            return {
                startIndex:0,
                count:2,
                projects:[],
                items:[
                    'Creator View',
                    'Backer View',
                    'Clear Filter'
                ],
                user_id:localStorage.getItem('user_id'),
                filtered:false,
                item:null
            }
        },

        mounted:function(){
            this.updateProjects()
        },
        methods: {

            updateProjects: function () {

                this.$http.get('http://localhost:4941/api/v2/projects?', {
                    params: {
                        startIndex: this.startIndex,
                        count: this.count,
                        open: true,
                    }
                }).then(function (response) {
                    if (response.body.length === 0) {
                        alert("end of list");
                        this.previous();
                    }
                    else {
                        this.projects = response.body;
                    }

                })
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
                this.$router.push("projects/" + id);
            },

            filter: function (item) {
                this.item=item;
                (alert(this.item))
                if (item === 'Creator View') {
                    this.filtered = true;
                    console.log("creator view")
                    this.$http.get('http://localhost:4941/api/v2/projects?', {
                        params: {
                            startIndex: this.startIndex,
                            count: this.count,
                            open: true,
                            creator: parseInt(this.user_id)
                        }
                    }).then(function (response) {
                        alert("cv")
                        if (response.body.length === 0) {
                            alert("end of list");
                            this.filterPrevious(item);
                        }
                        else {
                            this.projects = response.body;
                            console.log("creator prokects", this.projects);
                        }

                    })
                } else if (item === 'Backer View') {

                    this.filtered = true;
                    this.$http.get('http://localhost:4941/api/v2/projects?', {
                        params: {
                            startIndex: this.startIndex,
                            count: this.count,
                            open: true,
                            backer: parseInt(this.user_id)
                        }
                    }).then(function (response) {
                        alert("bv");
                        if (response.body.length === 0) {
                            this.projects = response.body;

                            alert("end of list");
                            this.filterPrevious(item);
                        }
                        else {
                            this.projects = response.body;
                        }

                    })

                } else if (item === 'Clear Filter') {

                    this.filtered = false;
                    this.startIndex=0;
                    this.updateProjects();
                }

            },
            filterNext: function () {
                    this.startIndex += this.count;
                    alert(this.startIndex)
                alert(this.count)
                    this.filter(this.item);

            },

            filterPrevious:function() {
                alert("filter previous")
                this.startIndex -= this.count;
                this.filter(this.item)
            }
            },

    }
</script>

