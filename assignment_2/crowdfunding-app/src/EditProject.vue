<template>
    <div>
        <v-app id="inspire">
            <v-container fluid grid-list-xl>
                <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                    {{error}}
                </v-alert>
                <v-btn @click="goBack">Back to Single Project</v-btn>

                <v-layout row wrap>
                    <v-flex xs8 offset-xs2 class="my-3">
                        <v-card>
                            <v-form v-on:submit.prevent="updateRewards">

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
                                        <tr v-for="(reward, index) in projectData.rewards" :key="index" :row="reward">
                                            <td>
                                                {{ index }}
                                            </td>
                                            <td>
                                                <v-text-field
                                                        v-model="reward.amount"
                                                        :counter="9"
                                                        :error-messages="errors.collect('reward.amount')"
                                                        v-validate="'min_value:0|max:9'"
                                                        data-vv-name="reward.amount">

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
                                <v-btn raised class="primary" type="submit">Update Rewards</v-btn>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs8 offset-xs2 class="my-3">
                        <v-card>
                            <v-form v-on:submit.prevent="updateImage">

                                <v-btn raised class="primary" @click="onPickFile">Select IMAGE</v-btn>
                                <input type="file"
                                       style="display: none"
                                       ref="fileInput"
                                       accept="image/*"
                                       @change="onFilePicked">

                                <v-layout row>
                                    <v-flex xs8 offset-xs2 class="my-3">
                                        <img :src="imageUrl" height="150">
                                    </v-flex>
                                </v-layout>
                                <v-btn raised class="primary" type="submit">Update Image</v-btn>
                            </v-form>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs8 offset-xs2 class="my-3">
                        <v-card>
                            <v-form class="red lighten-3" v-if="projectData.open" v-on:submit.prevent="updateProject">
                                <v-select
                                        label="Select open/close to open/close the project.You will not be able to reopen the project once close the project"
                                        v-model="select"
                                        :items="items"
                                        :error-messages="errors.collect('select')"
                                        v-validate="'required'"
                                        data-vv-name="select"
                                        required
                                ></v-select>
                                <v-btn color="red" dark type="submit">open/close the project</v-btn>
                            </v-form>
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
                select: 'open',
                items: [
                    'open',
                    'close'
                ],

                title: "",
                subtitle: "",
                description: "",
                imageUri: "",
                imageUrl:"",
                image:null,
                raw:"",
                target: 0,
                projectData:{},
                rewards: [{amount: 0, description: ""}],

                creator: {id: parseInt(localStorage.getItem('user_id'))}
            }
        },
        mounted: function () {
            this.checklogin();
            this.getSingleProject(this.$route.params.id);
        },

        methods: {

            addReward: function () {
                try {
                    this.projectData.rewards.push({amount: parseInt(0), description: ""});
                } catch (e) {
                    console.log(e);
                }
            },
            removeReward: function (index) {
                this.projectData.rewards.splice(index, 1);
            },


            goBack: function () {
                this.$router.push("/projects/"+this.$route.params.id);
            },
            checklogin: function () {
                if (! localStorage.getItem('token')) {
                    this.error="not logged in!";
                    this.errorFlag=true;
                    this.$router.push('/');

                }
            },
            getSingleProject: function (project_id) {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects/' + project_id.toString())
                    .then(function (response) {

                        this.projectData = response.body;
                        for (let i=0;i<this.projectData.rewards.length;i++){
                            this.projectData.rewards[i].amount=this.projectData.rewards[i].amount/100.
                        }

                    }, function (error) {
                        this.error = error.bodyText;
                        this.errorFlag = true;
                    });
            },
            updateProject: function () {
                let open = true;
                if (this.select === 'close') {
                    open = false
                }
                this.$http.put('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects/'+this.$route.params.id, {"open": open}, {headers: {'X-Authorization': localStorage.getItem('token')}})
                    .then(function (response) {
                        this.$router.push("/projects/"+this.$route.params.id);

                    },function (error) {
                        this.error = error.bodyText;
                        this.errorFlag = true;
                    });
            },
            updateRewards:function(){
                let correct=true;
                for (let reward of this.projectData.rewards){
                    if (reward.amount.length>9 || reward.amount<0){
                        correct=false
                    }
                    if(reward.amount<=0){
                        this.rewards.splice(this.rewards.indexOf(reward),1);
                        continue;
                    }
                    delete reward.id;
                    reward.amount= parseInt(reward.amount)*100;
                }
                if(correct===true){
                this.$http.put('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects/'+this.$route.params.id+'/rewards',this.projectData.rewards,{headers: {'X-Authorization': localStorage.getItem('token')}})
                    .then(function(response){
                        this.$router.push("/projects/"+this.$route.params.id);

                    },function (error) {
                        this.error = "Please fill in the reward field correctly";
                        this.errorFlag = true;
                    });
            }else{
                    this.error = "Please fill in the reward field correctly";
                    this.errorFlag = true;
                }
            },
            updateImage:function(){
                if(!this.image){
                    this.error="please select an image before uploading";
                    this.errorFlag=true;
                    return;
                }
                this.$http.put('http://csse-s365.canterbury.ac.nz:4824/api/v2/projects/'+this.$route.params.id+'/image',this.image,{headers: {'X-Authorization': localStorage.getItem('token'),'Content-Type': 'image/png','Cache-Control':'no-cache'}})
                    .then(function(response){
                        this.$router.push("/projects/"+this.$route.params.id,function(){location.reload();});

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
                    this.errorFlag = true;
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load',()=>{
                    this.imageUrl=fileReader.result
                });
                fileReader.readAsDataURL(files[0]);

                this.image=files[0];

            }
        }
    }
</script>

