<template>
    <div class="shopcart">
        <div class="content">
            <div class="left">
                <div class="logo-wrapper" @click="togglelist">
                    <div class="logo" :class="{'hightlight':totalCount>0}">
                        <i class="shopc">购物图</i>
                    </div>
                    <div class="number" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'hightprice':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{price.deliveryPrice}}元</div>
            </div>
            <div class="right":class="payClass">
                <div class="pay">
                    {{payDesc}}
                </div>
            </div>
        </div>
            <div class="ball-container">
                <div class="shopcart-list" v-show="listshow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listcontent">
                        <ul>
                            <li v-for="food in selectFoods" class="food">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
         <!-- <div class="list-mask" v-show="listshow"></div> -->
    </div>
   
    
</template>
<script>
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import BScroll from 'better-scroll';
export default {
    data(){
        return {
            price:this.$storage.fetch("price"),
            fold:true,
            flag1:true
        }
    },
    components:{
        cartcontrol:cartcontrol
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                ];
            }
        }

    },
    computed:{
        totalPrice(){
            let total=0;
            this.selectFoods.forEach((food)=>{
                total+=food.price*food.count;
                //console.log(food.count);
            });
            return total;   
        },
        totalCount(){
            let count=0;
            this.selectFoods.forEach((food)=>{
                count+=food.count;
            });
            return count; 
        },
        payDesc(){
            if(this.totalPrice===0){
                return `￥${this.price.minPrice}元起送`;
            }else if(this.totalPrice<this.price.minPrice){
                let diff=this.price.minPrice-this.totalPrice;
                return `还差￥${diff}元起送`;
            }else{
                return '去结算';
            }

        },
        payClass(){
            if(this.totalPrice<this.price.minPrice){
                return 'nothightright';
            }else{
                return 'hightright';
            }
        },
        listshow(){
            if(!this.totalCount){
                this.fold=true;
                return false;
            }
            let show=!this.fold;
            if(show){
                if(this.flag1){//更新操作只能执行一次
                    this.$nextTick(() =>{
                      if(!this.scroll){
                           this.Scroll=new BScroll(this.$refs.listcontent,{
                            click:true
                        });
                     }
                      else{
                          this.Scroll.refresh();
                      }
                  });
                  this.flag1 =false;
                }
              }
            return show;

        }
      },
      methods:{
          togglelist(){
              if(!this.totalCount){
                  return;
              }
              this.fold=!this.fold;
          },
          empty(){
              this.selectFoods.forEach((food)=>{
               food.count=0;
            });
          }
      }

}
</script>
<style>
.shopcart{
    position:fixed;
    left: 0;
    bottom: 0;
    z-index:50;
    height: 48px;
    width: 100%;
    background: #000;
}
.shopcart .content{
    display: flex;
    background: #141d27;
}
.shopcart .content .left{
    flex: 1;

}
.shopcart .content .left .logo-wrapper{
    display: inline-block;
    position: relative;
    top:-10px;
    margin:0 12px;
    padding:6px;
    height: 56px;
    width: 56px;
    box-sizing:border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #000;
}
.shopcart .content .left .logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b243c;
    text-align: center;
}
.hightlight{
    background:cornflowerblue;
}
.shopcart .content .left .logo-wrapper .logo .shopc{
    line-height: 44px;
    color: #fff;
}
.shopcart .content .left .logo-wrapper .number{
    position:absolute;
    top:0;
    right: 0;
    width: 24px;
    height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700; 
    color:#fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0);  
}
.shopcart .content .left .price{
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
    margin-top:12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
    color:rgba(255,255,255,0.4);
}
.hightprice{
    color:#fff
}
.shopcart .content .left .desc{
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
    margin: 12px 0 0 12px;
    font-size: 16px;
    font-size: 16px;
    color:rgba(255,255,255,0.4);

}
.shopcart .content .right{
    flex:0 0 105px;
    /* background:#2b333b; */
    height: 48px; 
    text-align: center;
    line-height: 48px;
    font-size: 12px;font-weight: 700;
    color: rgba(255,255,255,0.4);

}
.nothightright{
    color:#2b333b;

}
.hightright{
    background: green;
}

.shopcart-list{
    padding-bottom: 60px;
    max-height: 610px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #fff;
    width: 100%;
}
.shopcart-list .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart-list .list-header .title{
    float: left;
    font-size: 14px;
    color: rgb(7,17,27);
}
.shopcart-list .list-header .empty{
    float: right;
    font-size: 12px;
    color:rgb(0,100,20);

}
.shopcart-list .list-content{
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
}
.shopcart-list .list-content .food{
    position: relative;
    padding:12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid  rgba(7,17,27,0.1);
}
.shopcart-list .list-content .food .name{
    line-height: 24px;
    font-size: 14px;
    color:rgb(7,17,27);
}
.shopcart-list .list-content .food .price{
    position: absolute;
    right: 90px;
    bottom:12px;
    line-height: 24px;
    color:red;
    font-size: 14px;
    font-weight: 700;

}
.shopcart-list .list-content .food .cartcontrol-wrapper{
    position:absolute;
    right:0;
    bottom: 16px;
}
/* .list-mask{
    position: fixed;
    top:0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index:1;
    background:rgba(7,17,27,0.6);
    backdrop-filter: blur(10px);
} */
</style>
