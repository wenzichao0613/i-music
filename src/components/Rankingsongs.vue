<template>
  <div class="rankingsongs">
    <div class="back" @click="back"></div>
    <div class="notfind" v-if="!songlist.length">
      <img src="../assets/NotFind.gif" alt="" />
    </div>
    <div class="container" v-else>
      <div class="pic">
        <img :src="url" alt="" />
        <span>{{ content }}</span>
      </div>
      <ul>
        <li v-for="(item, index) in songlist" :key="index">
          <div class="left">
            <span class="num">{{
              index + 1 > 9 ? index + 1 : "0" + (index + 1)
            }}</span>
          </div>
          <div class="center">
            <p class="song_name">
              {{ item.name }}
              <!-- <span v-if="item.song.alias.length != 0" class="tip"
              >({{ item.ar.alias[0] }})</span> -->
            </p>
            <p class="songer">
              <!-- <i v-if="item.song.privilege.playMaxbr == 999000"></i> -->
              {{ item.ar[0].name }}&nbsp;--&nbsp;{{ item.name }}
            </p>
          </div>
          <div class="right" @click="$emit('play', item)"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songlist: [],
      id: "",
      url: "",
      content: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  created() {
    // this.songlist = this.$route.query;
    this.id = this.$route.query.id;
    // console.log(this.songlist);

    //h获取排行榜歌曲列表
    this.axios({
      method: "get",
      url: "/top/list",
      params: {
        id: this.id,
      },
    }).then((res) => {
      console.log(res.data.playlist);
      if (!res.data.playlist) {
        return;
      }
      this.songlist = res.data.playlist.tracks;
      this.url = res.data.playlist.coverImgUrl;
      this.content = res.data.playlist.description;
    });
  },
};
</script>
<style lang="less" scoped>
.rankingsongs {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  .notfind {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 110px;
    img {
      width: 100%;
    }
  }
  .back {
    position: fixed;
    top: 100px;
    left: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8UlEQVRYR+3WsQrCMBAG4P+2gm/TLDr6EPoi4u4sfRKfwiVbSafmRSx0a6WiEEqRS3JtUNr54P+46yUhJP4ocT5WwH91IM/zM4CNMebC/bfEOqCUugE4DMFEtC/L8s5BiADccAB127Zba22zCGAc3nXdsaoqywl/dYtbOFUXGx4FkAgPBkiFBwEkw70B0uFegDnC2QClVAHg9N6E2nfVvm0aaw2HI5aIrskAQ3DSEXxaOAeCNQJ3htIIb4D0OIIAkohggBQiCiCBiAZMIbIs22mtH5yrXgQwRiz+JHPOiaLv+ybJo5TT7qkasRGsgJ/twBMO+LUhrh2o+wAAAABJRU5ErkJggg==)
      no-repeat;
    background-size: 0.8rem;
    z-index: 10;
  }
  .container {
    .pic {
      width: 100%;
      height: 200px;
      display: flex;
      padding: 0 10px;
      box-sizing: border-box;
      align-items: center;
      border-radius: 10px;
      justify-content: space-evenly;
      border-bottom: 1px solid #ccc;
      img {
        width: 70%;
        height: 70%;
        margin: 0 10px;
      }
      span {
        font-size: 16px;
        margin-right: 10px;
      }
    }
    ul {
      width: 100%;
      height: 95vh;
      //   overflow-y: scroll;
      padding: 5px 0px;
      box-sizing: border-box;
      li {
        border-bottom: 1px solid #f0f0f1;
        position: relative;
        width: 100%;
        height: 55px;
        display: flex;
        // flex-direction: column;
        justify-content: flex-start;
        // align-items:center;
        overflow: hidden;
        padding-left: 10px;
        .left {
          width: 30px;
          margin-right: 10px;
          line-height: 55px;
          .num {
            display: inline-block;
            font-size: 20px;
            color: #ccc;
            width: 30px;
          }
        }
        .center {
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .song_name {
            width: 80%;
            height: 20px;
            font-size: 16px;
            color: #333;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            .tip {
              height: 25px;
              color: #888;
              margin-left: 4px;
            }
          }
          .songer {
            width: 280px;
            height: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            font-size: 12px;
            color: #888;
            i {
              display: inline-block;
              width: 12px;
              height: 8px;
              margin-right: 4px;
              background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880)
                no-repeat;
              background-size: 166px 97px;
            }
          }
        }
        .right {
          width: 22px;
          height: 22px;
          position: absolute;
          right: 20px;
          top: 50%;
          margin-top: -11px;
          background: url(../assets/index_icon_2x.31e6f788.png) no-repeat;
          background-size: 166px 97px;
          background-position: -24px 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>