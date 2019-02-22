<template>
<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="menuMap(index,$event)">
               <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> 
               <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li v-for="food in item.foods" class="food-item">
                        <div class="icon">
                            <img :src="food.icon" width="57" height="57" @click="selectFood(food,$event)">
                            <!-- 点击图片显示详细信息 -->
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>

                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods"></shopcart> 
    <food :food="selectedFood" ref="food"></food>
</div>
 
</template>

<script>
// import BScroll from 'vue2-better-scroll';
import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import food from '@/components/food/food';
export default {
    data(){
        return{
            goods:[],//后台给goods赋值
            listheight:[],//每个菜单项目的高度
            scrollY:0,
            selectedFood:{}//保存当前点击对象的属性
        }
    },
    components:{
        shopcart:shopcart,
        cartcontrol:cartcontrol,
        food:food

    },
    created(){
      this.classMap=['decrease','discount','special','invocie','guarantee']    
  },
  computed:{
      //当前索引
      currentIndex(){
          for(let i=0;i<this.listheight.length;i++){
              let height=this.listheight[i]
              let height2=this.listheight[i+1];
              if(!height2||(this.scrollY>=height&&this.scrollY<height2)){
                  return i;
              }
          }
          return 0;
      },
      selectFoods(){//选中的事务
          let foods=[];
          this.goods.forEach((good)=>{
              good.foods.forEach((food)=>{
                  if(food.count){//食物数量大于0的
                      foods.push(food);
                  }
              });
          });
         // console.log(foods);
          return foods;
          
      }
  },
    mounted() {
    this.getAjax();
  },
  methods:{
    getAjax:function () {
      var _this=this;
      _this.$axios.get('api/goods')
        .then(function (response) {
        //console.log("后台返回值",response.data.data)
        let resData = response.data.data;
        let itemGood = {};
        let goodTemp = [];
        for(let i=0;i<resData.length;i++){
            itemGood = {};
            itemGood.name = resData[i].name;
            itemGood.type = resData[i].type;
            let itemFood ={};
            let foodTemp = [];
            for(let j=0;j<resData[i].foods.length;j++){
                itemFood = {};
                itemFood.description = resData[i].foods[j].description;
                itemFood.icon = resData[i].foods[j].icon;
                itemFood.image = resData[i].foods[j].image;
                itemFood.info = resData[i].foods[j].info;
                itemFood.name = resData[i].foods[j].name;
                itemFood.oldPrice = resData[i].foods[j].oldPrice;
                itemFood.price = resData[i].foods[j].price;
                itemFood.rating = resData[i].foods[j].rating;
                itemFood.ratings = resData[i].foods[j].ratings;
                itemFood.sellCount = resData[i].foods[j].sellCount;
                foodTemp.push(itemFood);
            }
            itemGood.foods = foodTemp;
            goodTemp.push(itemGood);
        }
          _this.goods= goodTemp;
          console.log(_this.goods);
           _this.$nextTick(()=> {
              _this. _initScroll();
               _this._caheight();
            });
           
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    _initScroll(){
        this.menuScroll=new BScroll(this.$refs.menuWrapper,{
            click:true
        });
        this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
            click:true,
            probeType:3//实时监听位置
        });
        this.foodsScroll.on('scroll',(pos)=>{
            this.scrollY=Math.abs(Math.round(pos.y));
        });
    },
    _caheight(){
        let foodlist=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.listheight.push(height);
        for(let i=0;i<foodlist.length;i++){
            let item=foodlist[i];
            height+=item.clientHeight;
            this.listheight.push(height);
        }

    },
    menuMap(index,$event) {
        //console.log(index);
        if(!event._constructed){
            return;
        }
        let foodlist=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el=foodlist[index];//当前索引
        this.foodsScroll.scrollToElement(el,300);

    },
    selectFood(food,$event){
        if(!event._constructed){
            return;
        }
        this.selectedFood=food;
        //console.log(food);
        this.$refs.food.show();//父组件调用子组件的方法
    },
  },

};
</script>

<style>
ul li{
    list-style: none;

}
.goods{
    position: absolute;
    display: flex;
    overflow: hidden;
    width: 100%;
    top:200px;
    bottom: 46px;
}
.menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background: #f3f5f7;

}
.foods-wrapper{
    flex:1;
}
.foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9ddee;
    font-size: 12px;
    font-weight: 700;
    color:rgba(147,153,159);
    background: #f3f5f7;
}
.menu-item{
    list-style: none;
    display: table; 
    height: 54px;
    width: 56px;
    font-size: 12px;
    line-height: 14px;
    margin-left: -35px;
}
.menu-wrapper .icon{
    height: 12px;
    width: 12px;
}
.foods-wrapper li{
    margin-left: -30px;
  
}
.food-item {
    display: flex;
    margin:18px;
    padding-bottom: 18px;
}

.food-item .icon{
   flex: 0 0 57px;
   margin-right: 10px;
}
.food-item .content{
   flex: 1;
   position: relative;
}
.food-item .content .name{
    margin:2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color:rgba(7, 17, 27, 1)
}
.food-item .content .desc{
    font-size: 10px;
    line-height: 10px;
    height: 10px;
    margin-bottom: 8px;
    color:rgba(143,153,159,1);
} 
.food-item .content .extra{
    font-size: 10px;
    line-height: 10px;
    height: 10px;
    color:rgba(143,153,159,1);
}
.food-item .content .extra{
    margin-right: 10px;
}
.food-item .content .price{
    font-weight: 700;
    line-height: 24px;

}
.food-item .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);

}
.food-item .content .price .old{
    text-decoration: line-through;
    font-size:10px;
    color:rgb(147,153,159);

}
.current{
    color: red;
    font-weight: 700;
}
.cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
}
</style>