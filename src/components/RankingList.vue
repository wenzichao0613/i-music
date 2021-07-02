<template>
    <div class="allist">
        <div class="back" @click="back"></div>
        <div class="title">官方榜</div>
        <ul>
            <router-link v-for="(item,index) in officiallist" :key="index" tag="li" :to="{
                path: '/rankingsongs',
                query: {
                    id: officiallist[index].id,
                },
                }">
                <div class="left">
                    <img :src="`${item.coverImgUrl}`" alt="">
                    <span>{{item.updateTime | init}}</span>
                </div>
                <div class="right">

                </div>
            </router-link>
        </ul>
        <div class="title2">全球榜</div>
        <ol>
            <router-link v-for="(item,index) in worldlist" :key="index" tag="li" :to="{
                path: '/rankingsongs',
                query: {
                    id: worldlist[index].id,
                },
                }">
                <div class="img">
                    <img :src="`${item.coverImgUrl}`" alt="">
                </div>
                <div class="name">
                    {{item.name}}
                </div>
            </router-link>
        </ol>
    </div>
</template>
<script>
export default {
    data(){
        return{
            officiallist:[],
            worldlist:[]
        }
    },
    filters:{
        init(value){
            function add0(m){return m<10?'0'+m:m }
            var time = new Date(value);
            var m = time.getMonth()+1;
            var d = time.getDate();
            return add0(m) +"月"+ add0(d)+"日更新";
        }
    },
    methods:{
        back(){
            this.$router.back()
        }
    },
    created(){
        //获取所有榜单
        this.axios({
            method:"get",
            url:"/toplist"
        }).then((res) =>{
            // console.log(res.data.list);
            this.officiallist = res.data.list.slice(0,4);
            this.worldlist = res.data.list.slice(4);
            console.log(this.worldlist);
            console.log(this.officiallist);
        })
    }
}
</script>
<style lang="less" scoped>
.allist{
    width: 100%;
    height: 90vh;
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
    .title{
        font-size: 20px;
        font-weight: 700;
        color: #000;
        text-align: left;
        margin-left: 20px;
        margin-top: 35px;
    }
    ul{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        li{
            width: 50%;
            height: 150px;
            padding: 0 15px;
            box-sizing: border-box;
            list-style: none;
            cursor: pointer;
            .left{
                width: 140px;
                height: 140px;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                span{
                    font-size: 12px;
                    color: #fff;
                    position: absolute;
                    top: 62%;
                    left: 22%;
                }
            }
        }
    }
    .title2{
        font-size: 20px;
        font-weight: 700;
        color: #000;
        text-align: left;
        margin-left: 20px;
        margin-top: 10px;
    }
    ol{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
            list-style: none;
            width: 90px;
            height: 90px;
            padding: 10px;
            margin-top: 10px;
            box-sizing: border-box;
            .img{
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 10px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .name{
                font-size: 12px;
            }
        }
    }
}
</style>