<template>
    <div v-if="errorFlag" style="color: red;">
        {{error.bodyText}}
    </div>
    <div v-else>
        <!--<div id="app">-->
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
                        <v-flex xs11 offset-sm1>
                            <v-card>
                                <v-card-text>
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
                            data-vv-name = "title"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Subtitle"
                            v-model="subtitle"
                            :error-messages="errors.collect('subtitle')"
                            :counter="256"
                            data-vv-name="subtitle"
                    ></v-text-field>
                    <v-text-field
                            label="Target"
                            v-model="target"
                            :error-messages="errors.collect('target')"
                            v-validate="'required|min_value:0'"
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
                            <tr v-for="(reward, index) in rewards" :key="index" :row="reward">
                                <td>
                                    {{ index }}
                                </td>
                                <td>
                                    <v-text-field
                                            v-model="reward.amount"
                                            :error-messages="errors.collect('reward.amount')"
                                            v-validate="'min_value:0'"
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

                                    <v-btn raised  @click="onPickFile">Select IMAGE</v-btn>
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
                                    <!--<v-btn raised class="primary" type="submit">Update Image</v-btn>-->
                            </v-card>
                        </v-flex>
                    </v-layout>

                    <!--<v-select-->
                            <!--label="Select open/close to open/close the project"-->
                            <!--v-model="select"-->
                            <!--:items="items"-->
                            <!--:error-messages="errors.collect('select')"-->
                            <!--v-validate="'required'"-->
                            <!--data-vv-name="select"-->
                            <!--required-->
                    <!--&gt;</v-select>-->
                    <!--<v-checkbox-->
                            <!--label="Do you agree?"-->
                            <!--v-model="checkbox"-->
                            <!--:rules="[v => !!v || 'You must agree to continue!']"-->
                            <!--required-->
                    <!--&gt;</v-checkbox>--
<!---->
                    <!--<v-btn type="submit">Create</v-btn>-->
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
        <!--</div>-->
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
                alert(localStorage.getItem('user_id'));
//                this.$validator.validateAll().then(function (res) {
//                    alert(this.$store.state.user_id);
                for (let reward of this.rewards){
                    reward.amount= parseInt(reward.amount)
                    if(reward.amount<=0){
                        this.rewards.splice(this.rewards.indexOf(reward),1);
                    }
                }
                    let projectData = {
                        "title": this.title,
                        "subtitle": this.subtitle,
                        "description": this.description,
                        "target": parseInt(this.target),
                        "creators": [this.creator],
                        "rewards": this.rewards
//

                    };
                    console.log("projectdata", projectData);
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects',projectData,{headers:{'X-Authorization':localStorage.getItem('token')}})
                        .then(function (response) {
                            console.log(response.data);
                            let project_id = response.data.id;
                            alert(project_id);
                            console.log("safdsfsfd",this.image);
                            if(this.image){
                                this.updateImage(project_id)
                            }
                            this.$router.push('/')
                        }, function (error) {
                            this.error = error;
                            this.errorFlag = true;
                        });
//                }, function (error) {
//                    alert("err")
//                    this.error = error;
//                    this.errorFlag = true;
//
//                });
//
            },

            addReward: function () {
                try {
                    this.rewards.push({amount: parseInt(0), description: ""});
                } catch (e) {
                    console.log(e);
                }
            },
            removeReward: function (index) {
//                alert(index);
                this.rewards.splice(index, 1);
            },


            goBack: function () {
                this.$router.push("/projects");
            },
            checklogin: function () {
                if (! localStorage.getItem('token')) {
                    alert("not logged in!");
                    this.$router.push('/');
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
            updateImage:function(project_id){
                this.$http.put('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects/'+project_id+'/image',this.image,{headers: {'X-Authorization': localStorage.getItem('token'),'Content-Type': 'image/png'}})
                    .then(function(response) {
                        alert("updateding image");
//                        this.$router.push("/projects/" + this.$route.params.id);
                    },function (error) {
                        this.error = error;
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
                    return alert('please add a valid file')
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

