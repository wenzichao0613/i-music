<template>
    <div class="list">
        <div>
            <div class="title">
                <span>热门歌手</span>
            </div>
            <ul>
                <li v-for="(item , index) in list" :key="index">
                     <router-link :to="{
                        path:'/SongerList',
                        query:{
                            id:item.id
                        } 
                    }">
                    <img :src="item.img1v1Url" alt="">
                    <div class="songname">
                    <p>{{item.name}}</p>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:["list"],
}
</script>

<style lang="less" scoped>
.list{
    width: 100%;
    margin-top: 8rem;
    div{
        padding: 5px 0px;
        width: 100%;
        .title{
        width: 100%;
        height: 20px;
        display: flex;
        font-size: 18px;
        color: #000;
        font-weight: 500;
        padding: 0 10px;
        justify-content: space-between;
        margin-left: 1px;
        position: relative;
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
        ul{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: 15px;
            li{
                width: 26%;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
                .songname{
                    display: flex;
                    justify-content: center;
                    padding: 5px;
                    p{
                        color: #000;
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>