<template>
    <div>
        <v-app id="inspire">
            <v-toolbar color="indigo" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>

                <v-btn color="white" style="overflow: hidden;" flat router to="/projects/create">
                    Create a Project
                </v-btn>

                <v-btn color="white" flat router to="/projects/">View All Projects</v-btn>

                <v-flex xs6 offset-1>
                    <v-btn color="white" flat style="font-size :20px" router to="/">Crowdfunding Home
                    </v-btn>
                </v-flex>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon dark>account_circle</v-icon>
                </v-btn>

                <v-btn color="white" flat v-on:click="logout">
                    log out
                </v-btn>
            </v-toolbar>
            <v-container>
                <v-layout row>
                    <v-flex xs10 offset-sm1>
                        <v-card>
                            <v-card-text>
                                <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                                    {{error}}
                                </v-alert>
                                <v-container>
                                    <v-form v-on:submit.prevent="createProject">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md16 class="my-3">
                                                <v-card>
                                                    <v-card-text>
                                                        <v-text-field
                                                                label="Title"
                                                                v-model="title"
                                                                :counter="256"
                                                                :error-messages="errors.collect('name')"
                                                                v-validate="'required|max:256'"
                                                                data-vv-name="title"
                                                                required
                                                        ></v-text-field>
                                                        <v-text-field
                                                                label="Subtitle"
                                                                v-model="subtitle"
                                                                :counter="256"
                                                                :error-messages="errors.collect('subtitle')"
                                                                data-vv-name="subtitle"
                                                        ></v-text-field>
                                                        <v-text-field
                                                                label="Target"
                                                                v-model="target"
                                                                :counter="9"
                                                                :error-messages="errors.collect('target')"
                                                                v-validate="'required|min_value:0|max:9'"
                                                                data-vv-name="target"
                                                                required
                                                        ></v-text-field>

                                                        <v-text-field
                                                                label="description"
                                                                v-model="description"
                                                                :error-messages="errors.collect('description')"
                                                                data-vv-name="description"
                                                        ></v-text-field>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md16 class="my-3">
                                                <v-card>
                                                    <div class="panel-body">
                                                        <table class="table table-hover">
                                                            <thead>
                                                            <tr>
                                                                <th style="width: 40px;font-size: 15px">Reward No.</th>
                                                                <th style="width: 80px;font-size: 15px">Amount</th>
                                                                <th style="font-size: 15px">Description</th>
                                                                <v-btn @click="addReward()">add reward</v-btn>
                                                            </tr>

                                                            </thead>

                                                            <tbody>
                                                            <tr v-for="(reward, index) in rewards" :key="index"
                                                                :row="reward">
                                                                <td>
                                                                    {{ index }}
                                                                </td>
                                                                <td>
                                                                    <v-text-field
                                                                            v-model="reward.amount"
                                                                            :counter="9"
                                                                            :error-messages="errors.collect('reward.amount')"
                                                                            v-validate="'min_value:0|max:9'"
                                                                            data-vv-name="reward.amount"
                                                                    >
                                                                    </v-text-field>
                                                                </td>
                                                                <td>
                                                                    <v-text-field
                                                                            v-model="reward.description"
                                                                            :counter="256"
                                                                            :error-messages="errors.collect('reward.description')"

                                                                            data-vv-name="reward.description"

                                                                    ></v-text-field>
                                                                </td>

                                                                <v-btn @click="removeReward(index)">remove</v-btn>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md16 class="my-3">
                                                <v-card>

                                                    <v-btn raised @click="onPickFile">Select IMAGE</v-btn>
                                                    <input type="file"
                                                           style="display: none"
                                                           ref="fileInput"
                                                           accept="image/*"
                                                           @change="onFilePicked">

                                                    <v-layout row>
                                                        <v-flex xs12 sm12 md16 class="my-3">
                                                            <img :src="imageUrl" height="150">
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>

                                        <v-flex xs12>
                                            <v-btn type="submit">Create</v-btn>
                                        </v-flex>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                error: "",
                errorFlag: false,
                select: null,
                items: [
                    'open',
                    'close'
                ],
                image:null,
                imageUrl:"",
                title: "",
                subtitle: "",
                description: "",
                imageUri: "",
                target: 0,
                rewards: [{amount: parseInt(0), description: ""}],

               creator: {id: parseInt(localStorage.getItem('user_id'))}
            }
        },
        mounted: function () {
            this.checklogin();

        },

        methods: {
            createProject: function () {
                if (this.target.length <= 9 && this.title.length <= 256) {
                    for (let reward of this.rewards) {
                        reward.amount = parseInt(reward.amount) * 100;
                        if (reward.amount <= 0) {
                            this.rewards.splice(this.rewards.indexOf(reward), 1);
                        }
                    }
                    let projectData = {
                        "title": this.title,
                        "subtitle": this.subtitle,
                        "description": this.description,
                        "target": parseInt(this.target) * 100,
                        "creators": [this.creator],
                        "rewards": this.rewards
//

                    };
//                    console.log("projectdata", projectData);
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects', projectData, {headers: {'X-Authorization': localStorage.getItem('token')}})
                        .then(function (response) {
//                            console.log(response.data);
                            let project_id = response.data.id;
                            if (this.image) {
                                this.updateImage(project_id)
                            }
                            this.$router.push('/')
                        }, function (error) {
                            this.error = error.bodyText;
                            this.errorFlag = true;
                        });

                } else {
                    this.error = "some fields are not filled in correctly";
                    this.errorFlag = true
                }
            },

            addReward: function () {
                try {
                    this.rewards.push({amount: parseInt(0), description: ""});
                } catch (e) {
                    console.log(e);
                }
            },

            removeReward: function (index) {
                this.rewards.splice(index, 1);
            },


            goBack: function () {
                this.$router.push("/projects");
            },

            checklogin: function () {
                if (! localStorage.getItem('token')) {
                   this.error="not logged in!";
                   this.errorFlag=true;
                    this.$router.push('/');
                }
            },

            logout: function () {

                this.$http.post('http://csse-s365.canterbury.ac.nz:4824/api/v2/users/logout', "", {headers: {'X-Authorization': localStorage.getItem('token')}}).then(function (response) {
                    localStorage.clear();
                    this.$router.push('/')
                }, function (error) {
                    this.error = error.bodyText;
                    localStorage.clear();
                    this.errorFlag = true;
                });

            },

            updateImage:function(project_id){
                this.$http.put('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects/'+project_id+'/image',this.image,{headers: {'X-Authorization': localStorage.getItem('token'),'Content-Type': 'image/png'}})
                    .then(function(response) {
                    },function (error) {
                        this.error = error.bodyText;
                        this.errorFlag = true;
                    });

            },

            onPickFile:function(){
                this.$refs.fileInput.click();
            },

            onFilePicked(event){
                const files=event.target.files;
                let filename=files[0].name;
                if(filename.lastIndexOf('.')<=0){
                   this.error='please add a valid file';
                   this.errorFlag=true;
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load',()=>{
                    this.imageUrl=fileReader.result
                });
                fileReader.readAsDataURL(files[0]);
                this.image=files[0];
            },
        }
    }
</script>

