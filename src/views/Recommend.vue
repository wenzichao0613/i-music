<template>
    <div class="recommend">
        <div class="banner">
            <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(image, index) in banner" :key="index" class="bannerul">
                <img v-lazy="image.pic" />
            </van-swipe-item>
            </van-swipe>
        </div>
        <home :list="sheetlist"></home>
        <new-song :songs="newSongs"></new-song>
        <hot-list :listy="sheetlist"></hot-list>
        <hot-songer :list="songerlist"></hot-songer>
    </div>
</template>
<script>
import Home from '@/views/Home.vue';
import NewSong from '@/components/NewSong.vue';
import HotList from '@/components/HotList.vue';
import HotSonger from '../components/Hotsonger.vue';
export default {
    data(){
        return{
            banner:[],
            newSongs:[],
            sheetlist:[],
            songerlist:[]
        }
    },
    components:{
        Home,
        NewSong,
        HotList,
        HotSonger,
    },
    created(){
        this.axios("/banner?type=2").then((res) => {
            // console.log(res.data);
            let arr = res.data.banners;
            this.banner = arr.slice(5);
            // console.log(this.banner);
        });
        //最新音乐
        this.$axios.get('/personalized/newsong?limit=100').then(d=>{
            console.log(d.data.result);
            this.newSongs=d.data.result;
            //  this.newSongs = JSON.stringify( this.newSongs)
        });

        //热门歌单
        this.axios("/personalized",{
            params:1
        })
        .then(res =>{
            // console.log(res.data.result);
            this.sheetlist = res.data.result.splice(0,6)
        });
        //热门歌手
       this.axios("/top/artists?offset=0&limit=30")
        .then(res=>{
            // console.log(res);
            let list = res.data.artists
            this.songerlist =list.splice(0,9)
            // console.log( this.songlsit);
        })
     }
}
</script>

<style lang="less" scoped>
    .recommend{
        width: 100%;
        height: 95vh;
        overflow-y: auto;
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
    .nav{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        color: #000;
    }
    }
    
</style>