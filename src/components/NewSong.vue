<template>
     <div class="newsong">
         <router-link  tag="div" class="link" :to="{path:'/LiItem',query:{songlist}}">
              <div class="title">
                  <span>最新音乐</span>
              </div>
              <div class="content" >
                  <div v-for="(item,index) in titlesongs" :key="index"><img :src="item.picUrl"></div>
              </div>
            </router-link>
      </div>
</template>
<script>
export default {
    props:['songs'],
    data(){
        return{
            songlist:[],
            titlesongs:[]
        }
    },
    created(){
         this.$axios.get('/personalized/newsong?limit=100').then(d=>{
             this.titlesongs=d.data.result.slice(0,3);
        });
    },
    watch:{
        songs:function(newVal){
            this.songlist = newVal;
            console.log(this.songlist); 
        }
    },
}
</script>
<style lang="less" scoped>
.newsong{
        width: 100%;
        height: 200px;
        .link{
            width: 100%;
            height: 100%;
            .title{
                height: 20px;
                display: flex;
                font-size: 18px;
                color: #000;
                font-weight: 500;
                padding: 0 10px;
                justify-content: space-between;
                position: relative;
                margin-left: 1px;
                &::before{
                    position: absolute;
                    left: 0px;
                    content: "";
                    top:50%;
                    margin-top: -8px;
                    // margin-left:9px;
                    width: 2px;
                    height: 16px;
                    border-left:2.5px solid #dd001b
                }
            }
            .content{
                width: 100%;
                height: 180px;
                display: flex;
                padding: 0 10px;
                box-sizing: border-box;
                div{
                    flex: 1;
                    margin: 0 5px;
                    padding-top: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>