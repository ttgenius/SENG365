const app = new Vue({
        el: '#app',
        data: {
        message: 'Hello World',
        //visible: true,
        shopping_list:[
            {name:'bread',price:2.75},
            {name:'milk',price:2},
            {name:'pasta',price:1}
        ]
    },
    methods: {
        calculateTotal: function() {
            let total = 0;
            for(let i = 0; i < this.shopping_list.length; i++){
                total += parseInt(this.shopping_list[i].price);
            }
            return total;
        }
}




});