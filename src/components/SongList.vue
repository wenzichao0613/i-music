<template>
  <div class="songlist">
    <div class="back" @click="back"></div>
    <div class="title">推荐歌单</div>
    <ul>
      <li v-for="(item, index) in listy" :key="item.id">
        <router-link
          :to="{
            path: '/Songdetalis',
            query: {
              id: listy[index].id,
            },
          }"
        >
          <img :src="`${item.picUrl}`" />
          <h6>{{ item.playCount | fullNuM }}</h6>
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
    <div class="title">精品歌单</div>
    <ul>
      <router-link
        v-for="(item, index) in boutiquelist"
        :key="index"
        tag="li"
        :to="{
          path: '/Songdetalis',
          query: {
            id: boutiquelist[index].id,
          },
        }"
      >
        <img :src="`${item.coverImgUrl}`" />
        <h6>{{ item.playCount | fullNuM }}</h6>
        <p>{{ item.name }}</p>
      </router-link>
    </ul>
    <div class="title">热门歌单</div>
    <ul>
      <router-link
        v-for="(item, index) in popularlist"
        :key="index"
        tag="li"
        :to="{
          path: '/Songdetalis',
          query: {
            id: popularlist[index].id,
          },
        }"
      >
        <img :src="`${item.coverImgUrl}`" />
        <h6>{{ item.playCount | fullNuM }}</h6>
        <p>{{ item.name }}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listy: [],
      boutiquelist: [],
      popularlist: [],
      id: "",
    };
  },
  filters: {
    fullNuM(value) {
      console.log(value);
      return (value / 10000).toFixed(1) + "�";
    },
  },
  created() {
    //热门歌单
    this.axios("/personalized",{
        params:1
    })
    .then(res =>{
        // console.log(res.data.result);
        this.listy = res.data.result.splice(0,6)
    });
    //获取精品歌单
    this.axios({
      method: "get",
      url: "/top/playlist/highquality",
      params: {
        before: "1503639064232",
        limit: "30",
      },
    }).then((res) => {
      this.boutiquelist = res.data.playlists.splice(0, 6);
      console.log(this.boutiquelist);
    });
    //获取热门歌单
    this.axios({
      method: "get",
      url: "/top/playlist/hot",
    }).then((res) => {
      this.popularlist = res.data.playlists.splice(0, 6);
      console.log(this.popularlist);
    });
  },
  methods:{
    back(){
      this.$router.back()
    }
  }
};
</script>
<style lang="less" scoped>
.songlist {
  width: 100%;
  overflow-y: auto;
  height: 95vh;
  .back{
    position: fixed;
    top: 100px;
    left: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8UlEQVRYR+3WsQrCMBAG4P+2gm/TLDr6EPoi4u4sfRKfwiVbSafmRSx0a6WiEEqRS3JtUNr54P+46yUhJP4ocT5WwH91IM/zM4CNMebC/bfEOqCUugE4DMFEtC/L8s5BiADccAB127Zba22zCGAc3nXdsaoqywl/dYtbOFUXGx4FkAgPBkiFBwEkw70B0uFegDnC2QClVAHg9N6E2nfVvm0aaw2HI5aIrskAQ3DSEXxaOAeCNQJ3htIIb4D0OIIAkohggBQiCiCBiAZMIbIs22mtH5yrXgQwRiz+JHPOiaLv+ybJo5TT7qkasRGsgJ/twBMO+LUhrh2o+wAAAABJRU5ErkJggg==) no-repeat;
    background-size: 0.8rem;
  }
  .title {
    width: 100%;
    height: 20px;
    font-size: 18px;
    color: #000;
    font-weight: 500;
    padding: 0 10px;
    text-align: left;
    margin-left: 1px;
    margin-top: 35px;
    position: relative;
    &::before {
      position: absolute;
      left: 0px;
      content: "";
      top: 50%;
      margin-top: -8px;
      // margin-left:9px;
      width: 2px;
      height: 16px;
      border-left: 2.5px solid #dd001b;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 32%;
      height: 175px;
      list-style: none;
      overflow: hidden;
      position: relative;
      margin: 10px 2px;
      &::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20px;
        z-index: 2;
        background-image: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
        background-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
      }

      img {
        width: 100%;
      }

      h6 {
        position: absolute;
        right: 5px;
        top: 2px;
        z-index: 3;
        padding-left: 13px;
        color: #fff;
        font-size: 12px;
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgb(0, 0, 0/15%);
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
      }

      p {
        font-weight: 400;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0px 6px;
        width: 120px;
        height: 38px;
        text-overflow: ellipsis;
        color: #000;
        font-size: 13px;
        box-sizing: border-box;
      }
    }
  }
}
</style>