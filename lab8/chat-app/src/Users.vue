<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{error}}
        </div>
        <div v-if="$route.params.userId">
            <div id="user">
                <router-link :to="{name:'users'}">Back to Users</router-link>
                <br /><br />
                <table>
                    <tr>
                        <td>User ID</td>
                        <td>Username</td>
                    </tr>
                    <tr>
                        <td>{{$route.params.userId}}</td>
                        <td>{{ getSingleUser($route.params.userId).username}})</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-else>
            <div id="users">
                <table>
                    <tr v-for="user in users">
                        <td>{{user.username}}</td>
                        <td><router-link :to="{name: 'user', params: {userId:user.user_id}}">View</router-link></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
        export default{
            data(){
                return{
                    error: "",
                    errorFlag: false,
                    users:[]

                }
            },
            mounted: function(){
                this.getUsers();

            },
            methods:{
                getUsers:function(){
                    this.$http.get('http://127.0.0.1:3000/api/users')
                        .then(function(response) {
                            this.users = response.data;
                        },function(error){
                            this.error = error;
                            this.errorFlag = true;
                        });
                },
                getSingleUser:function(id){
                    for(let i=0;i<=this.users.length;i++){
                        if(this.users[i].user_id ==id){
                            return this.users[i]
                        }
                    }
                }
            }
        }
    </script>
    <div>
        User Page
    </div>
