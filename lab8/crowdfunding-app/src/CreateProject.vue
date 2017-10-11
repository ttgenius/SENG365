<template>
    <div v-if="errorFlag" style="color: red;">
        {{error.bodyText}}
    </div>
    <div v-else>
        <!--<div id="app">-->
            <v-app id="inspire">
                <v-form v-on:submit.prevent="createProject">

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
                            v-validate="'min_value:0'"
                            data-vv-name="target"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="description"
                            v-model="description"
                            :error-messages="errors.collect('description')"
                            data-vv-name="description"
                    ></v-text-field>
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
                                    <input class="form-control" v-model="reward.amount" number/>
                                </td>
                                <td>
                                    <input class="form-control" v-model="reward.description"/>
                                </td>

                                <v-btn @click="removeReward(index)">remove</v-btn>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                   

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
                    this.$http.post('http://localhost:4941/api/v2/projects',projectData,{headers:{'X-Authorization':localStorage.getItem('token')}})
                        .then(function (response) {
                            let project_id = response.id;
                            alert(project_id)
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
                this.$router.push("/projects");
            },
            checklogin: function () {
                if (! localStorage.getItem('token')) {
                    alert("not logged in!");
                    this.$router.push('/');

                }
            }
        }



    }
</script>

