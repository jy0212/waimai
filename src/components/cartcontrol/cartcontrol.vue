<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0" @click="decreasecart">-</div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="card-add" @click="addcart">＋</div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props:{
        food:{
            type:Object
        }
    },
    // created(){
    //     console.log(this.food);

    // },
    methods:{
     addcart(event){
          if(!event._constructed){
            return;
        }
         if(!this.food.count){
             Vue.set(this.food,'count',1);
         }else{
             
             this.food.count++;
             console.log(this.food);
         }
             
     },
     decreasecart(event){
        if(!event._constructed){
            return;
        }
        if(this.food.count){
           this.food.count--; 
        }

    }  

    }
    
}
</script>
<style>
.cartcontrol{
    font-size:12px;
    color:#000;

}
.cartcontrol .cart-decrease{
    display: inline-block;
    padding:6px;
    height: 10px;
    width:10px;
    border:1px solid blue;
    border-radius: 50%;
    line-height: 10px;

}
.cartcontrol .cart-count{
    display: inline-block;

}
.cartcontrol .card-add{
    display: inline-block;
    padding:6px;
    height: 10px;
    width: 10px;
    border:1px solid blue;
    border-radius: 50%;
    cursor: pointer;
    line-height: 10px;

}
</style>

