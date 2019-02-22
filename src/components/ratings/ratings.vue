<template>
 <div class="ratings" ref="ratings">
     <div class="ratings-content">
         <div class="overview">
             <div class="overview-left">
                 <h1 class="score">{{seller.score}}</h1>
                 <div class="tittle">综合评分</div>
                 <div class="rank">高于周边商家{{seller.rankRate}}</div>
             </div>
             <div class="overview-right">
                 <div class="score-wrapper">
                     <span class="title">服务态度</span>
                     <star :size="36" :score="seller.serviceScore"></star>
                     <span class="score">{{seller.serviceScore}}</span>
                 </div>
                 <div class="score-wrapper">
                     <span class="title">商品评分</span>
                     <star :size="36" :score="seller.foodScore"></star>
                     <span class="score">{{seller.foodScore}}</span>
                 </div>
                 <div class="delicer-time">
                     <span class="title">送达时间</span>
                     <span class="time">{{seller.deliveryTime}}分钟</span>
                 </div>
             </div>
         </div>
         <split></split>
         <div class="ratingselect-wrapper">
              <ratingselect :selecttype="selecttype" :onlyContent="onlyContent" :ratings="ratings"  @select-type="onselecttype" @content-toggle="oncontenttoggle" ></ratingselect>
             <ul class="ratingselectcontet" v-show="ratings && ratings.length">
                 <li v-show="needshow(rating.rateType,rating.text)" v-for="rating in ratings" class="ratinng-item">
                     <div class="avatar">
                         <img :src="rating.avatar" width="28" height="28" >
                     </div>
                     <div class="content">
                         <div class="name">{{rating.username}}</div>
                         <div class="star-wrapper">
                             <star :size="24" :scpre="rating.score"></star>
                             <span>{{rating.deliveryTime}}分钟送达</span>
                         </div>
                         <div class="text">{{rating.text}}</div>
                         <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                             <span class="s2"></span>
                             <span class="item" v-for="item in rating.recommend">{{item}}</span>
                         </div>
                        <div class="time">{{rating.rateTime}}</div>
                     </div>

                 </li>
             </ul>
         </div>

     </div>

 </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '@/components/star/star';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';

const positive=0;
const negative=1;
const all=2;

export default {
    data() {
    return {
      seller:{},
      ratings:[],
      showflag:false,
      selecttype:all,
      onlyContent:false,
    }
  },
//   created(){
//       this.classMap=['decrease','discount','special','invocie','guarantee']      
//   },
components:{
    star:star,
    split:split,
    ratingselect:ratingselect

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
           console.log(_this.seller);
        })
        .catch(function (error) {
          console.log(error);
        });
        _this.$axios.get('api/ratings')
        .then(function (response) {
           _this.ratings = response.data.data;
            _this.$nextTick(()=> {
                _this.Scroll=new BScroll(_this.$refs.ratings,{
                    click:true
                });
            });
           console.log(_this.ratings);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    needshow(type,text){
            if(this.onlyContent&&!text){
                return false;
            }
            if(this.selecttype===all){
                return true;
            }else{
                return type===this.selecttype;
            }
        },
    onselecttype(typeselect){//父组件接收子组件的字，并自我更新修改
        this.selecttype=typeselect;
        this.$nextTick(()=>{
            this.Scroll.refresh();
        });
    },
    oncontenttoggle(contentonly){
        this.onlyContent=contentonly;
        this.$nextTick(()=>{
            this.Scroll.refresh();
        });
    }
  }

};
</script>
<style>
.ratings{
    position: absolute;
    width: 100%;
    top:200px;
    bottom:0;
    height: 100%;
    overflow:hidden;
    
}
.ratings .ratings-content .overview{
    display:flex;
    padding: 18px 0;

}
.overview .overview-left{
    flex:0 0 137px;
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
    padding:6px 0;
    
}
.overview .overview-left .score{
    line-height:28px;
    font-size:24px;
    color:rgb(255,153,0);
    margin-bottom: 6px;
}
.overview .overview-left .tittle{
    line-height: 12px;
    font-size: 12px;
    font-size:rgb(7,17,27);
    margin-bottom:8px;
}
.rank{
    line-height: 10px;
    font-size:10px;
    color:#999999;
}
.overview .overview-right{
    flex:1;
    padding-left: 15px;
}
.overview .overview-right .score-wrapper{
    margin-bottom: 8px;
    font-size:0px;
} 
.overview .overview-right .score-wrapper .title{
    line-height: 18px;
    display: inline-block;
    font-size:12px;
    color:rgb(7,17,27);
}
.overview .overview-right .score-wrapper .star{
    line-height: 18px;
    display: inline-block;
    vertical-align: top;
    margin:0 12px;
}
.overview .overview-right .score-wrapper .score{
    line-height: 18px;
    display: inline-block;
    font-size:12px;
    color:rgb(255,153,0);  
}
.overview .overview-right .delicer-time .title{
    line-height: 18px;
    font-size:12px;
    color:rgb(7,17,27);
}
.overview .overview-right .delicer-time .time{
    line-height: 18px;
    font-size:12px;
    color:#999;
    margin-left: 12px;
}
.ratingselectcontet{
    padding:0 18px;
}
.ratingselectcontet .ratinng-item{
    margin-top:5px;
    display: flex;
    list-style: none;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    position: relative;

}
.ratingselectcontet .ratinng-item .avatar{
    flex:0  0 28px;
    width: 28px;
    height: 28px;
    margin-right: 12px;

}
.ratingselectcontet .ratinng-item .avatar img{
    border-radius: 50%;
}
.ratingselectcontet .ratinng-item .content{
    flex:1;
}
.ratingselectcontet .ratinng-item .content .name{
    line-height: 12px;
    font-size: 10px;
    color:rgb(7,17,27);
    margin-bottom:4px;
}
.ratingselectcontet .ratinng-item .content .star-wrapper{
    margin-bottom: 6px;
    text-align: left;
    margin-top:0;
}
.ratingselectcontet .ratinng-item .content .star-wrapper .star{
    display: inline-block;
    margin-right: 6px;
}
.ratingselectcontet .ratinng-item .content .text{
    line-height: 18px;
    color:rgb(7,17,27);
    font-size: 12px;
    margin-bottom: 8px;

}
.ratingselectcontet .ratinng-item .content .recommend{
    line-height: 16px;
}
.ratingselectcontet .ratinng-item .content .recommend .s2{
    display: inline-block;
    height: 12px;
    width: 12px;
    background:blue;
    border-radius: 50%;
    margin-right: 4px;
    margin-bottom: 4px;
    vertical-align: top;
}
.ratingselectcontet .ratinng-item .content .recommend .item{
    font-size: 9px;
    margin:0 6px;
    vertical-align:top;
    border:1px solid rgb(7,17,27,0.1);
    border-radius: 1px;
    background: #fff;
    color:#999;
    padding:2px;

}
.ratingselectcontet .ratinng-item .time{
    position: absolute;
    top:0px;
    right:2px;
    font-size: 10px;
}
</style>