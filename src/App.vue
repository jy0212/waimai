<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
       <router-link :to="{ path: '/goods' }">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/ratings' }">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/sell' }">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import header from "@/components/header/header"
export default {
  name: 'App',
   components:{
     'v-header':header
   }
   
}
</script>

<style>
#app .tab {
  display:flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab-item{
  flex:1;
  text-align: center;
}
.tab-item > a{
   display: block;
   font-size:14px;
   color:rgba(77, 85, 93, 1);
   text-decoration: none;
}
.tab-item > a.active{
  color:rgba(240,20,20,1);
}
</style>
