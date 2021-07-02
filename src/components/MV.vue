<template>
    <div class="mv">
        <div class="back" @click="back"></div>
        <div class="banner">
            <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(image, index) in banner" :key="index" class="bannerul">
                <img v-lazy="image.cover" />
            </van-swipe-item>
            </van-swipe>
        </div>
        <div class="title">推荐MV</div>
        <ul>
            <router-link v-for="(item,index) in recommentmv" :key="index" tag="li" :to="{
                path:'/MvAudio',
                query:{
                    id:item.id,
                    artistid:item.artistId
                }
            }">
                <div class="pic">
                    <img :src="`${item.picUrl}`" alt="">
                    <span class="duration">{{item.duration | init}}</span>
                    <span class="playcount">
                        <i><img src="../assets/play_num.png" alt=""></i>
                        {{item.playCount}}</span>
                </div>
                <div class="content">
                    {{item.name}}
                </div>
                <div class="songer">
                    {{item.artistName}}
                </div>
            </router-link>
        </ul>
        <div class="title">最新MV</div>
        <ul>
            <router-link v-for="(item,index) in newmv" :key="index" tag="li" :to="{
                path:'/MvAudio',
                query:{
                    id:item.id,
                    artistid:item.artistId
                }
            }">
                <div class="pic">
                    <img :src="`${item.cover}`" alt="">
                    <span class="duration">{{item.duration | init}}</span>
                    <span class="playcount">
                        <i><img src="../assets/play_num.png" alt=""></i>
                        {{item.playCount}}</span>
                </div>
                <div class="content">
                    {{item.name}}
                </div>
                <div class="songer">
                    {{item.artistName}}
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            banner:[],
            recommentmv:[],
            newmv:[]
        }
    },
    methods:{
        back(){
            this.$router.back()
        }
    },
    filters:{
        init(value){
            function add0(m){return m<10?'0'+m:m }
            let m = parseInt( value / 1000 /60 );
            let s = parseInt( value % 60 );
            return add0(m)+":"+ add0(s)
        }
    },
    created(){
        //获取轮播图图片
        this.axios({
            method:"get",
            url:"/top/mv",
            params:{
                limit:"5"
            }
        }).then((res) =>{
            console.log(res);
            this.banner = res.data.data;
        });
        //获取推荐mv
        this.axios({
            method:"get",
            url:"/personalized/mv"
        }).then((res)=>{
            console.log(res.data.result);
            this.recommentmv = res.data.result;
        });
        //获取最新mv
        this.axios({
            method:"get",
            url:"/mv/first",
            params:{
                limit:'10'
            }
        }).then((res)=>{
            console.log(res);
            this.newmv = res.data.data;
        })
    }
}
</script>
<style lang="less" scoped>
.mv{
    width: 100%;
    height: 92vh;
    // background: #1e1e20;
    overflow-y: auto;
    .back{
    position: fixed;
    top: 100px;
    left: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8UlEQVRYR+3WsQrCMBAG4P+2gm/TLDr6EPoi4u4sfRKfwiVbSafmRSx0a6WiEEqRS3JtUNr54P+46yUhJP4ocT5WwH91IM/zM4CNMebC/bfEOqCUugE4DMFEtC/L8s5BiADccAB127Zba22zCGAc3nXdsaoqywl/dYtbOFUXGx4FkAgPBkiFBwEkw70B0uFegDnC2QClVAHg9N6E2nfVvm0aaw2HI5aIrskAQ3DSEXxaOAeCNQJ3htIIb4D0OIIAkohggBQiCiCBiAZMIbIs22mtH5yrXgQwRiz+JHPOiaLv+ybJo5TT7qkasRGsgJ/twBMO+LUhrh2o+wAAAABJRU5ErkJggg==) no-repeat;
    background-size: 0.8rem;
    z-index: 1000;
  }
    .banner{
        width: 100%;
        height: 200px;
        .van-swipe{
            width: 100%;
            height: 100%;
            position: relative;
            .van-swipe__track{
                .van-swipe-item{
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .van-swipe__indicators{
                position: absolute;
                bottom: 10px;
            }
        }
        
    }
    .title{
        width: 100%;
        height: 20px;
        font-size: 18px;
        color: #000;
        font-weight: 500;
        padding: 0 10px;
        margin-left: 10px;
        margin-top: 20px;
        text-align: left;
        // color: #fff;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        li{
            list-style: none;
            width: 150px;
            height: 150px;
            margin-top: 10px;
            border-radius: 10px;
            overflow: hidden;
            .pic{
                width: 100%;
                height: 70%;
                font-size: 12px;
                color: #fff;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                .duration{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                }
                .playcount{
                    position: absolute;
                    bottom: 5px;
                    left: 5px;
                    i{
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            .content{
                width: 100%;
                height: 20%;
                font-size: 16px;
                overflow: hidden;
                line-height: 27px;
                color: #000;
                text-align: left;
                text-overflow: ellipsis;
            }
            .songer{
                width: 100%;
                height: 20px;
                text-indent: 3px;
                font-size: 12px;
                color: rgb(77, 51, 51);
                text-align: left;
            }
        }
    }
}
</style>