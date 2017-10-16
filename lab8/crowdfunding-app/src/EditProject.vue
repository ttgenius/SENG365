<template>
    <div v-if="errorFlag" style="color: red;">
        {{error.bodyText}}
    </div>
    <div v-else>

        <v-app id="inspire">
            <v-container fluid grid-list-xl>
                 <v-btn @click="goBack">Back to Single Project</v-btn>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md16 class="my-3">
                        <v-card>
            <v-form class="red lighten-3" v-on:submit.prevent="updateProject" >
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
                <v-layout row wrap>
                    <v-flex xs12 sm12 md16 class="my-3">
                        <v-card>
            <v-form v-on:submit.prevent="updateRewards">

                <div class="panel-body">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th style="width: 40px;">Reward No.</th>
                            <th style="width: 80px;">Amount</th>
                            <th>Description</th>
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
                        <v-flex xs12 sm12 md16 class="my-3">
                            <v-card>
                                <v-form  v-on:submit.prevent="updateImage" >

                                    <v-btn raised class="primary" @click="onPickFile">Select IMAGE</v-btn>
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
                                    <v-btn raised class="primary" type="submit">Update Image</v-btn>
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
                rewards: [{amount: 0, description: ""}],

                creator: {id: parseInt(localStorage.getItem('user_id'))}
            }
        },
        mounted: function () {
            this.checklogin();

        },

        methods: {

            addReward: function () {
                try {
                    this.rewards.push({});
                } catch (e) {
                    console.log(e);
                }
            },
            removeReward: function (index) {
//                alert(index);
                this.rewards.splice(index, 1);
            },


            goBack: function () {
                this.$router.push("/projects/"+this.$route.params.id);
            },
            checklogin: function () {
                if (! localStorage.getItem('token')) {
                    alert("not logged in!");
                    this.$router.push('/');

                }
            },
            updateProject: function () {
                alert("updating")
                let open = true;
                if (this.select === 'close') {
                    open = false
                }
                this.$http.put('http://localhost:4941/api/v2/projects/'+this.$route.params.id, {"open": open}, {headers: {'X-Authorization': localStorage.getItem('token')}})
                    .then(function (response) {
                        alert("updated");
                        this.$router.push("/projects/"+this.$route.params.id);
                    });
            },
            updateRewards:function(){
                for (let reward of this.rewards){
                    reward.amount= parseInt(reward.amount)
                }
                alert("calling updating rewards")
                this.$http.put('http://localhost:4941/api/v2/projects/'+this.$route.params.id+'/rewards',this.rewards,{headers: {'X-Authorization': localStorage.getItem('token')}})
                    .then(function(response){
                        alert("updated rewards");
                        this.$router.push("/projects/"+this.$route.params.id);

                    });
            },
            updateImage:function(){
                if(!this.image){
                    alert("please select an image before uploading")
                }
                this.$http.put('http://localhost:4941/api/v2/projects/'+this.$route.params.id+'/image',this.image,{headers: {'X-Authorization': localStorage.getItem('token'),'Content-Type': 'image/png'}})
                    .then(function(response){
                        alert("updateding image");
                        this.$router.push("/projects/"+this.$route.params.id);

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

            }
        }



    }
</script>

