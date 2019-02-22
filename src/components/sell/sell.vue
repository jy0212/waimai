<template>
 <div class="sell" ref="sell">
     <div class="sell-wrapper">
         <div class="sell-name">
             <div class="sell-left">
                 <div class="name">{{seller.name}}</div>
                 <div class="star-wrapper">
                     <star :size="36" :score="seller.score"></star>
                     <span class="text">({{seller.ratingCount}})</span> 
                     <span class="text">月售{{seller.sellCount}}单</span>  
                 </div>
             </div>
             <div class="sell-right">
                 <div class="xin"></div>
                 <div class="sc">收藏</div>
             </div>
         </div>
         <div class="price">
             <div class="price-wrapper">
                 <div class="pcontent">起送价</div>
                 <div class="pprice">{{seller.minPrice}}<span class="yuan">元</span></div>
             </div>
              <div class="price-wrapper">
                 <div class="pcontent">商家配送</div>
                 <div class="pprice">{{seller.deliveryPrice}}<span class="yuan">元</span></div>
             </div>
              <div class="price-wrapper">
                 <div class="pcontent">平均配送时间</div>
                 <div class="pprice">{{seller.deliveryTime}}<span class="yuan">元</span></div>
             </div>
         </div>
         <split></split>
         <div class="gg">
             <h1 class="title">公告与活动</h1>
             <p class="nr">{{seller.bulletin}}</p>
         </div>
         <div class="mj">
             <ul>
                 <li v-for="(item,index) in seller.supports">
                     <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                 </li>
             </ul>
         </div>
         <split></split>
         <div class="sj">
             <h1 class="title">商家实景</h1>
             <div class="img" v-for="img in seller.pics">
                 <img :src="img">
             </div>
         </div>
         <split></split>
         <div class="xx">
             <h1 class="title">商家信息</h1>
             <ul>
                 <li class="sjxx" v-for="info in seller.infos">{{info}}</li>
             </ul>
         </div>
     </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll';
import split from '@/components/split/split';
import star from '@/components/star/star';
export default {
    data(){
        return{
            seller:{}
        } 
    },
    components:{
        star:star,
        split:split

    },
    created(){
      this.classMap=['decrease','discount','special','invocie','guarantee']      
  },
    mounted(){
        this.getAjax();
    },
    methods:{
        getAjax:function(){
            var _this=this;
            _this.$axios.get('api/seller')
        .then(function (response) {
           _this.seller = response.data.data;
            _this.$nextTick(()=> {
                _this.Scroll=new BScroll(_this.$refs.sell,{
                    click:true
                });
            });
           console.log(_this.seller);
        })
        .catch(function (error) {
          console.log(error);
        });

        }

    }

};
</script>
<style>
.sell{
    position: absolute;
    width: 100%;
    top:200px;
    bottom:0;
    height: 100%;
    overflow:hidden;
}
/* .sell-wrapper{
    padding:18px;
} */
.sell-name{
    position: relative;
    padding:18px;
}
.sell-name .sell-left .name{
    padding-bottom:8px;
    font-size:14px;
    color:rgb(7,17,27);
    line-height: 28px;
    font-weight: 700;
    overflow: hidden;
}
.star-wrapper .star{
    display: inline-block;
    margin-bottom: 18px;
}
.star-wrapper .text{
    font-weight: 10px;
    color:rgb(77,85,93);
    line-height: 18px;
    margin-right: 12px;
}
.sell-name .sell-right{
    position: absolute;
    right: 18px;
    top:18px;
}
.sell-name .sell-right .xin{
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #999;
}
.sell-name .sell-right .sc{
    font-size:10px;
    line-height: 10px;
    color:rgba(77,85,93);
    margin-top:4px;
}
.sell .price{
    overflow: hidden;
    border-top:1px solid rgba(7,17,27,0.1)
}
.sell .price .price-wrapper{
    float: left;
    margin:18px;
    border-right:1px solid rgba(7,17,27,0.1);

}
.sell .price .price-wrapper .pcontent{
    font-size: 10px;
    padding-right: 18px;
    color:rgb(147,153,159);
    line-height: 20px;
    text-align: center;
   
}
.sell .price .price-wrapper .pprice{
    font-weight: 200;
    font-size:24px;
    padding:4px 18px 18px 18px;
    color:rgb(7,17,27)
}
.sell .price .price-wrapper .pprice .yuan{
    font-size: 10px;
}
.sell .title{
    padding:18px 0px 8px 18px;
    font-size: 14px;
    font-weight: 700;

}
.gg .nr{
    padding:0px 30px 18px 30px;
    font-size: 12px;
    line-height: 24px;
    color:rgba(240,20,20);
    font-weight: 200;
}
.mj ul{
    padding:0 18px;
}
.mj li{
    font-weight: 200;
    font-size: 12px;
    list-style: none;
    border-top:1px solid rgba(7,17,27,0.1);
    padding:18px 18px 18px 18px;
}
.sj img{
    display: inline-block;
}
.sj .img{
    display: inline-block;
}
.xx ul{
    margin:5px;
}
.xx .sjxx{
    list-style: none;
    padding:12px 0;
    border-top:1px solid rgba(7,17,27,0.1);
    color:rgb(7,17,27);
    font-size:12px;
}
</style>