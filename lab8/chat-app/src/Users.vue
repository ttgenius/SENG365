<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{error}}
        </div>
        <div v-if="$route.params.userId">
            <div id="user">
                <router-link :to="{name:'users'}">Back to Users</router-link>
                <br/><br/>
                <table>
                    <tr>
                        <td>User ID</td>
                        <td>Username</td>
                    </tr>
                    <tr>
                        <td>{{$route.params.userId}}</td>
                        <td>{{ getSingleUser($route.params.userId).username}}</td>
                    </tr>
                </table>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">
                    Delete
                </button>

                <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog"
                     aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure that you want to delete this user?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-delseismiss="modal"
                                        v-on:click="deleteUser(getSingleUser($route.params.userId))">Delete User
                                </button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div id="users">
                <table>
                    <tr v-for="user in users">
                        <td>{{user.username}}</td>
                        <td>
                            <router-link :to="{name: 'user', params: {userId:user.user_id}}">View</router-link>
                        </td>
                    </tr>
                </table>
                <!-- add new user here -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addUserModal">Add
                </button>
                <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog"
                     aria-labelledby="addUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form v-on:submit="addUser()">
                                    <input v-model="username" placeholder="New username"/>
                                    <input type="submit" value="Add"/>
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: "",
                errorFlag: false,
                users: [],
                username: ""

            }
        },
        mounted: function () {
            this.getUsers();

        },
        methods: {
            getUsers: function () {
                this.$http.get('http://127.0.0.1:3000/api/users')
                    .then(function (response) {
                        this.users = response.data;
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getSingleUser: function (id) {
                for (let i = 0; i <= this.users.length; i++) {
                    if (this.users[i].user_id === id) {
//                            alert("get single user"+this.users[i].user_id);
                        return this.users[i]
                    }
                }

            },
            deleteUser: function (user) {
//                    alert(user.user_id);
                this.$http.delete('http://127.0.0.1:3000/api/users/' + user.user_id)
                    .then(function (response) {
                        let tempid = user.user_id;
                        alert("adfdsafsfds" + this.users[tempid]);
                        for (let i = 0; i <= this.users.length; i++) {
                            if (tempid === this.users[i].user_id) {
                                this.users.splice(i, 1);
                            }
                        }
                        this.$router.push('/users');
                    }, function (error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
//                editUser: function (user) {
//                    alert("new username"+this.username)retur
//                    if (this.username === "") {
//                        alert("Please enter an username !");
//                    } else {
//                        alert("else update"+user.username);
//                        this.$http.put('http://127.0.0.1:3000/api/users/'+ user.user_id, {
//                            "username": this.username
//                        });
//                    }
//                }
            addUser: function () {
                if (this.username === "") {
                    alert("Please enter an username !");
                } else {
                    //alert(this.username);
                    this.$http({
                        url: 'http://127.0.0.1:3000/api/users',
                        payload: {"username": this.username},
                        method: 'POST'
                    }).then(response => {
                        // get body data
                        console.log("success");
                    }, response => {
                        // error callback
                        console.log(response);
                    });
                }
            }
        }
    }
</script>
<div>
    User Page
</div>
