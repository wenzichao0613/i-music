<template>
    <div class="nav">
         <router-link tag="span" :to="{path:'/songlist',query:{list}}">
            <img src="@/assets/imusic_03.png" alt="">
            <p>歌单</p>
          </router-link>
          <router-link tag="span" to="/rankinglist">
          <img src="@/assets/imusic_05.png" alt="">
          <p>排行榜</p>
          </router-link>
          <router-link tag="span" to="/mv">
          <img src="@/assets/imusic_07.png" alt="">
          <p>MV</p>
          </router-link>
          <router-link tag="span" to="/seacher">
          <img src="@/assets/search.png" alt="">
          <p>搜索</p>
          </router-link>
    </div>
</template>
<script>
export default {
    props:["list"]
}
</script>
<style lang="less" scoped>
div{
    span{
        p{
            margin-top: 5px;
            font-weight: 500;
        }
        img{
            width: 26px;
            height: 28px;
        }
    }
}
</style>