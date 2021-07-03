<template>
  <div class="songerlist">
    <p @click="backs" class="back"></p>
    <div class="songs">
      <div class="top">
        <img :src="songdata.picUrl" width="100%" />
        <div class="text">
          <h2>歌手:{{ songdata.name }}</h2>
          <h2>歌手简介</h2>
          <p class="jieshao">
            {{ songdata.briefDesc }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <ul class="lsit">
        <h2>热门歌曲</h2>
        <li v-for="(item, index) in hotSongs" :key="index">
          <span class="txts">{{ (index + 1) | addzero }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span>{{ item.name }}-{{ item.ar[0].name }}</span>
            <div class="right" @click="$emit('play', item)"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      // 歌手详情
      songdata: {},
      hotSongs: [],
    };
  },
  components: {},
  created() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;

    // 歌手详情
    this.axios("/artists", {
      params: {
        id: this.id,
      },
    }).then((res) => {
      console.log(res);
      this.songdata = res.data.artist;
      this.hotSongs = res.data.hotSongs;
      console.log(this.hotSongs);
    });
  },
  filters: {
    addzero(value) {
      return value < 10 ? "0" + value : value;
    },
  },
  methods: {
    backs() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.songerlist {
  width: 100%;
  height: 95vh;
  overflow-y: auto;
  position: relative;
  .back {
    z-index: 102;
    position: absolute;
    left: 5px;
    top: 10px;
    height: 30px;
    width: 30px;
    background: url(../assets/back.png) no-repeat;
    background-size: 30px;
  }
  .songs {
    width: 100%;
    height: 67vh;
    background-color: #ffffff;
    .top {
      width: 100%;
      .songname {
        color: #ffffff;
        position: absolute;
        left: 0px;
        bottom: 100px;
      }
      img {
        width: 100%;
      }
    }
    .text {
      z-index: 102;
      padding: 10px;
      overflow: auto;
      height: 140px;
      border-bottom: 1px solid #ccc;
      h2 {
        font-size: 17px;
        text-align: left;
        margin: 5px 0;
      }
      .jieshao {
        margin-top: 5px;
        text-indent: 2em;
        font-size: 13px;
        color: #666;
        height: 87px;
        padding: 3px 0;
        box-sizing: border-box;
        overflow-y: auto;
      }
    }
  }
  .lsit {
    height: 100%;
    margin-top: 35px;
    h2 {
      font-size: 17px;
      margin-left: 5px;
      text-align: left;
    }
    li {
      height: 55px;
      border-bottom: 1px solid rgb(231, 231, 231);
      position: relative;
      margin: 5px 0px 10px 0px;
      display: flex;
      align-items: center;
      span.txts {
        width: 30px;
        font-size: 17px;
        margin: 0px 10px;
        color: #999;
      }
      div {
        // overflow: hidden;
        p {
          font-size: 17px;
          font-weight: 400;
          cursor: pointer;
          color: #000;
          text-align: left;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: #888;
          text-align: left;
          display: inline-block;
        }

        .right {
          width: 22px;
          height: 22px;
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -11px;
          background: url("../assets/icon.png") no-repeat;
          background-size: 166px 97px;
          background-position: -24px 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>