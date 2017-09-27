
Vue.component('vitem', {
    props: ['vitem'],
    template: '<li>{{vitem.name}}:{{vitem.price}}</li>'
});

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
            for(let item of this.shopping_list){
                total += item.price;
            }
            return total;
        }
}

});