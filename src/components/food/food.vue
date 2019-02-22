<template>
<div v-show="showflag" class="food" transition="move" ref="food">
    <div class="food-content">
        <div class="image-header">
            <img :src="food.image">
            <span class="ileft" @click="hide"><</span>
        </div>
        <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div  class="cartcontrol-wrapper">
               <cartcontrol :food="food"></cartcontrol>
            </div>
            <div class="buy"v-show="!food.count||food.count===0" @click="addfirst()">加入购物车</div>
        </div>
        
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :selecttype="selecttype" :onlyContent="onlyContent" :desc=" desc" :ratings="food.ratings" @select-type="onselecttype" @content-toggle="oncontenttoggle" ></ratingselect>
            <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                    <li v-show="needshow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <div class="avater"><img :src="rating.avatar" width="12" height="12"></div>
                        </div>
                        <div class="time">{{rating.rateTime}}</div>
                        <p class="text">
                            <span :class="{'red':rating.rateType===0,'grary':rating.rateType===1}"></span>
                            <span>{{rating.text}}</span>
                        </p>

                    </li>
                </ul>
                <div class="no-rating" v-show="food.ratings || !food.ratings.length"></div>
            </div>   
        </div>
    </div>
</div>
    
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect'; 

const positive=0;
const negative=1;
const all=2;

export default {
    data(){
        return{
            showflag:false,
            selecttype:all,
            onlyContent:true,
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽'
             }
        }

    },
    props:{
        food:{
            type:Object
        }
    },
    // created(){
    //     console.log(this.food);

    // },
    components:{
        cartcontrol:cartcontrol,
        split:split,
        ratingselect:ratingselect
    },
    // filters:{
    //     formatDate(time){
    //         let date=new Date(time);
    //          return formatDate(date,'yyyy-MM-dd hh')
    //     }

    // },
    methods:{
        show(){
           this.showflag=true; 
           this.selectype=all;//数据初始化
           this.onlyContent=false;
           this.$nextTick(()=>{
               if(!this.scroll){
                    this.Scroll=new BScroll(this.$refs.food,{
                    click:true
                });
                }else{
                    this.Scroll.refresh();
                }
           })
        },
        hide(){
            this.showflag=false; 
        },
        addfirst(){
            if(!event._constructed){
            return;
         }
         Vue.set(this.food,'count',1);
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
        },
    }
    
};
</script>
<style scoped>

.food{
    position: fixed;
    left: 0;
    top:0;
    bottom:48px;
    z-index: 30;
    width: 100%;
    background: #fff;
}
.move-trasition{
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
}
.move-enter,.move-leave{
    transform: translate3d(100%,0,0)

}
/* 图片的正方形写法 */
.food .food-content .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top:100%;

}
.food .food-content .image-header img{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
}
.food .food-content .image-header .ileft{
    position: absolute;
    font-size: 24px;
    color: #fff;
    top:5px;
    left: 5px;
    font-weight: 700;
}
.food .food-content .content{
    padding: 18px;
    position: relative;

}
.food .food-content .content .title{
    line-height: 14px;
    color:rgb(7,17,27);
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
}
.food .food-content .content .detail{
    margin-bottom: 18px;
    line-height: 10px;
    font-size:10px;
    color:rgb(147,153,159);
    height: 10px;
}
.food .food-content .content .detail .sell-count{
    margin-right: 12px;
}
.food .food-content .content .price{
    font-weight: 700;
    line-height: 24px;
}
.food .food-content .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
}
.food .food-content .content .price .old{
    text-decoration: line-through;
    font-size:10px;
    color:rgb(147,153,159);

}
.food .food-content .content .cartcontrol-wrapper{
    position: absolute;
    right: 18px;
    bottom: 18px;
}
.food .food-content .content .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index:10;
    height: 24px;
    line-height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    font-size:10px;
    color:#fff;
    background: rgb(0,160,220);
    border-radius: 10px;
}
.food .food-content .info{
    padding:18px;
}
.food .food-content .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size:14px;
    color:rgb(7,17,27);
}
.food .food-content .info .text{
   line-height: 24px;
   padding:0 8px;
   font-size: 12px;
   color:#4d555d;
}
.rating{
   padding: 18px;
   
}
.rating .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size:14px;
    color:rgb(7,17,27);
}
.rating-wrapper{
    padding:0 18px;
}
.rating-wrapper .rating-item{
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding:16px 0;
    position: relative;
}
.rating-wrapper .rating-item .user{
    position: absolute;
    right: 0;
    top:16px;
    font-size: 0;
    line-height: 12px;
}
.rating-wrapper .rating-item .user .name{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color:rgb(147,153,159);
    margin-right: 12px;
}
.rating-wrapper .rating-item .user .avater{
    border-radius: 50%;
    display: inline-block;
    height: 12px;
    width: 12px;
}

.rating-wrapper .rating-item .time{
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159);
    margin-bottom: 6px;

}
.rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color:rgb(7,17,27); 

}
.rating-wrapper .red{
    height: 12px;
    width: 12px;
    background: red;
    border-radius: 50%;
    display: inline-block;
}
.rating-wrapper .grary{
    height: 12px;
    width: 12px;
    background:gray;
    border-radius: 50%;
     display: inline-block;
}

</style>
