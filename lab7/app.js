/**
 * Created by yzh231 on 21/09/17.
 */

Vue.http.options.emulateJSON = true;

new Vue({
    el: '#app',
    data:{
        users:[],
        username: ""
    },
    mounted:function () {
        this.getUsers();
    },
    methods: {
        getUsers: function () {
            this.$http.get('http://127.0.0.1:3000/api/users')
                .then(function (response) {
                    this.users = response.data;
                }, function (error) {
                    console.log(error);
                });

        },
        addUser: function () {
            // alert(this.username);
            if (this.username === "") {
                alert("Please enter an username !");
            } else {
                //alert(this.username);
                this.$http.post('http://127.0.0.1:3000/api/users', {
                    "username": this.username
                });
            }
        },
        deleteUser: function (user) {
            this.$http.delete('http://127.0.0.1:3000/api/users/' + user.user_id)
                .then(function (response) {
                    let tempid = user.user_id;

                    for (let i = 0; i <= this.users.length; i++) {
                        if (tempid === this.users[i].user_id) {
                            this.users.splice(i, 1);
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
        },
        editUser: function (user, username) {
            if (this.username === "") {
                alert("Please enter an username !");
            } else {
                //alert(this.username);
                this.$http.put('http://127.0.0.1:3000/api/users/'+ user.user_id, {

                    "username": this.username
                });
            }
        }
    }
});