<template>
    <div v-if="errorFlag" style="color: red;">
        {{error.bodyText}}
    </div>
    <div v-else>
        <!--<div id="app">-->
        <v-app id="inspire">
            <v-container>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-card-text>
                                <v-container>


                                    <v-form v-on:submit.prevent="pledge">
                                        <v-layout row>
                                            <v-flex xs22>
                                                        <v-text-field
                                                                label="Amount"
                                                                v-model="amount"
                                                                :error-messages="errors.collect('amount')"
                                                                v-validate="'required|min_value:0'"
                                                                data-vv-name="amount"
                                                                required

                                                        ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-flex xs22>
                                                        <v-text-field
                                                                label="Card Number"
                                                                v-model="authToken"
                                                                :error-messages="errors.collect('authToken')"
                                                                v-validate="'required|min_value:0'"
                                                                data-vv-name="authToken"
                                                                required
                                                        ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row>
                                            <v-flex xs22>
                                        <v-text-field
                                                label="Name On Card"
                                                v-model="name"
                                                :error-messages="errors.collect('name')"
                                                v-validate="'required'"
                                                data-vv-name="name"
                                                required
                                        ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <!--<v-flex xs11 sm5>-->
                                        <v-layout row>
                                            <v-flex xs22>
                                            <v-dialog
                                                    persistent
                                                    v-model="modal"
                                                    lazy
                                                    full-width

                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        label="Pick Card Expiry Date"
                                                        v-model="date"
                                                        prepend-icon="event"
                                                        readonly
                                                        required

                                                ></v-text-field>
                                                <v-date-picker type="month" v-model="date" scrollable actions>
                                                    <template scope="{ save, cancel }">
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                                        </v-card-actions>
                                                    </template>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-flex>
                                        </v-layout>

                                        <v-layout row>
                                            <v-flex xs22>
                                        <v-checkbox
                                                v-model="checkbox"
                                                label="anonymous"
                                                :error-messages="errors.collect('checkbox')"
                                                v-validate="'required'"
                                                data-vv-name="checkbox"
                                                type="checkbox"
                                                required
                                        ></v-checkbox>
                                            </v-flex>
                                        </v-layout>
                                        <v-btn @click="goBack">Cancel</v-btn>
                                        <v-btn type="submit">Submit</v-btn>

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

                creator: {id: parseInt(localStorage.getItem('user_id'))},
                authToken:"",
                amount:"",
                checkbox:false,
                name:"",
                date:null,
                modal:false
            }
        },
        mounted: function () {
            this.checklogin();

        },

        methods: {

            goBack: function () {
                this.$router.push("/projects/"+this.$route.params.id);
            },
            checklogin: function () {
                if (! localStorage.getItem('token')) {
                    alert("not logged in!");
                    this.$router.push('/');

                }
            },

            pledge:function(){
                alert("anonymous: "+this.checkbox);
                let pledgeData = {
                    "id":parseInt(localStorage.getItem('user_id')),
                    "amount":parseInt(this.amount),
                    "anonymous":this.checkbox,
                    "card":{"authToken": this.authToken}
                };
                this.$http.post('http://csse-s365.canterbury.ac.nz:4842/api/v2/projects/'+this.$route.params.id+'/pledge',pledgeData,{headers: {'X-Authorization': localStorage.getItem('token')}})
                    .then(function(response) {
                        alert("pledged");
                        this.$router.push("/projects/" + this.$route.params.id);
                    },function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });

            }
        }



    }
</script>

