<template>
 <div class="header">
   <div class="content-wrapper">
       <div class="avatar">
           <img :src="seller.avatar" alt="" width="64" height="64">
       </div>
       <div class="content">
           <div class="title">
               <span class="brand"></span>
               <span class="name">{{seller.name}}</span>
           </div>
           <div class="description">
               {{seller.description}}/{{seller.deliveryTime}}分钟送达
           </div>
           <div v-if="seller.supports" class="support">
               <span class="icon" :class="classMap[seller.supports[0].type]"></span>
               <span class="text">{{seller.supports[0].description}}</span>
           </div>
           <div v-if="seller.supports" class="support-count" @click="showdetail">
               <span class="count">{{seller.supports.length}}个</span>
               <i></i>
           </div>
       </div>
   </div>
   <div class="bullentin-wrapper" @click="showdetail">
       <span class="bulletin-title"></span>
       <span class="bulletin-text"> {{seller.bulletin}}</span>
   </div>
   <div class="background">
       <!-- <img :src="seller.data.avatar" width="100%" height="100%"> -->
       <div  v-show="detailShow" class="detail" transition="fade">
           <div class="detail-wrapper clearfix">
               <div class="detail-main">
                  <div class="name">{{seller.name}}</div>
                  <div class="star-wrapper">
                      <star :size="48" :score="seller.score"></star>
                  </div>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">优惠信息</div>
                      <div class="line"></div>
                  </div> 
                  <ul v-if="seller.supports" class="supports">
                      <li class="support-item" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                      </li>
                  </ul>
                  <div class="title">
                      <div class="line"></div>
                      <div class="text">商家公告</div>
                      <div class="line"></div>
                  </div> 
                  <div class="bulletin">
                      <p class="content">{{seller.bulletin}}</p>
                  </div>
               </div>
           </div>

           <div class="detail-close" @click="hidedetail">
           </div>
       </div>
   </div>
 </div>
</template>

<script>
import star from "@/components/star/star";
export default {
    components:{
      star:star
  },
 data() {
    return {
      seller:{},
      detailShow:false,
    }
  },
  created(){
      this.classMap=['decrease','discount','special','invocie','guarantee']      
  },
  mounted() {
    this.getAjax();
  },
  methods:{
    getAjax:function () {
      var _this=this;
      _this.$axios.get('api/seller')
        .then(function (response) {
           _this.seller = response.data.data;
           let price={};
           price.deliveryPrice=response.data.data.deliveryPrice;
           price.minPrice=response.data.data.minPrice;
           _this.$storage.save("price",price);
           //console.log(_this.seller);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
   showdetail:function(){
       this.detailShow=true;
   },
   hidedetail:function(){
       this.detailShow=false;
   }
  }
    
};
</script>

<style>
/* @import "../../" */
.header{
    color:#fff;
      /* position: relative;  */
    background: rgba(7, 17,27, 0.5);
    /* background:#999; */
}
.header .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size: 0;
    position: relative;
}
.header  .content-wrapper .avatar,.content{
    display:inline-block;
    font-size:14px;
}
.header  .content-wrapper .content{
    margin-left: 16px;
}
.header  .content-wrapper .content .title{
    margin:2px 0 8px 0;
}
.header  .content-wrapper .content .title .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    background:tomato;
}
.icon{
    display: inline-block;
    width: 24px;
    height:24px;
    margin-right: 4px;
    background-size: 24px 24px;
    background-repeat: no-repeat;
}
.decrease{
    background: url(decrease_1@2x.png);
}
.discount{
    background: url(discount_1@2x.png);
}
.special{
    background: url(special_1@2x.png);
}
.invocie{
    background: url(invoice_1@2x.png);
}
.guarantee{
    background: url(guarantee_1@2x.png);
}
.support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;
    cursor: pointer;
}
.count{
    font-size: 10px;
}
.bullentin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0;
    background: rgba(0,0,0,0.2);
    cursor: pointer;
}
.bulletin-text{
    font-size: 10px;
}
.detail-main .star-wrapper{
    margin-top:18px;
    padding:2px 0;
    text-align: center;

}
/* .background{
    position: absolute;
    top:0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px)
} */
.background .detail{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    top:0;
    transition: all 0.5s;
    background: rgba(7,17,27,0.8);
}
.fade-transition{
    opacity: 1;
    background: rgba(7,17,27,0.8);
}
.fade-enter,.fade-leave{
    opacity: 0;
    background: rgba(7,17,27,0);
}
/* 清除 */
.clearfix{
    display: inline-block;
}
.clearfix::after{
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}
.detail-wrapper{
    min-height: 100%;
    width: 100%;
}
 .detail-wrapper .title{
     width: 80%;
     margin:30px auto 24px auto;
     display: flex;
 }
 .detail-wrapper .title .line{
     flex: 1;
     position: relative;
     top:-6px;
     border-bottom:1px solid rgba(255,255,255,0.2);
 }
.detail-wrapper .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;

  }
.detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
}
.detail-main .name{
    line-height: 16px;
    text-align: center;
    width: 100%;
    font-weight: 700;
}
.detail-close{
   position: relative;
   width: 32px;
   height: 32px;
   margin: -64px auto 0 auto;
   background: red;
   border-radius: 50%;
}
.supports{
    list-style: none;
    width: 85%;
    margin:0 auto;
}
.support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 14px;

}
.support-item:last-child{
    margin-bottom: 0;
}
.bulletin{
    width: 85%;
    margin:0 auto;
}
.bulletin .content{
    font-size:12px;
    margin-top:-15px;
    padding: 0 12px;
    
}
</style>