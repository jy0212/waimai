<template>
<div class="ratingselect">
    <div class="rating-type">
        <span @click="select(2,$event)" class="block positive" :class="{'active':selecttype===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0,$event)" class="block positive" :class="{'active':selecttype===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span @click="select(1,$event)" class="block negative" :class="{'active':selecttype===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="togglecontent">
        <span class="switchtu" :class="{'switchtu1':onlyContent===true}"></span>
        <span class="text">只看有内容的评价</span>
    </div>
</div>
    
</template>
<script>
const positive=0;
const negative=1;
const all=2;
export default {
    props:{
        ratings:{
            type:Array,
            default(){
                return [];
            }
        },
        selecttype:{//父组件传入的值
            type:Number,
            default:all

        },
        onlyContent:{
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default(){
                return{
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    data(){
        return{
             typeselect:this.selecttype,//子组件从新定义，避免直接修改
             contentonly:this.onlyContent
        }

    },
    computed:{
        positives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===positive;

            });
        },
        negatives(){
            return this.ratings.filter((rating)=>{
                return rating.rateType===negative;

            });
        }
    },
    methods:{
        select(type,$event){
            if(!event._constructed){
                return;
            }
            this.typeselect=type;
            this.$emit('select-type',this.typeselect);//子组件告知父组件
        },
        togglecontent($event){
            if(!event._constructed){
               return;
            }
            this.contentonly=!this.onlyContent;
            this.$emit('content-toggle',this.contentonly);//子组件告知父组件
        }
    }
    
}
</script>
<style scoped>
/* .ratingselect{

} */
.ratingselect .rating-type{
    padding:18px 0;
    margin:0 18px;
}
.ratingselect .rating-type .block{
    display: inline-block;
    padding:8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color:rgba(77,85,93);
    font-size: 12px;
}
.ratingselect .rating-type .block.active{
    color:#fff;
}
.ratingselect .rating-type .positive{
    background:rgba(0,160,220,0.2);
}
.ratingselect .rating-type .positive.active{
    background:rgba(0,160,220)
}
.ratingselect .rating-type .negative{
    background:rgba(77,85,93,0.2);
}
.ratingselect .rating-type .negative.active{
    background:rgba(77,85,93);
}
.ratingselect .count{
    font-size: 8px;
    margin-left:2px;
    line-height: 16px;
}
.switch{
    padding:12px 18px;
    line-height: 24px;
    font-size:12px;
    border-bottom:1px solid rgb(7,17,21,0.1);
    color:rgb(147,153,159);
}
.switch .switchtu{
    display: inline-block;
    height: 24px;
    width: 24px;
    background:rgb(147,153,159);
    border-radius: 50%;
}
.switch .switchtu1{
    background:green;
}
.switch .text{
    display: inline-block;
    vertical-align: top;
}
</style>
