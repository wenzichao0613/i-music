<template>
  <div class="songdetail">
    <div class="header">
      <img class="bg" :src="`${lists.coverImgUrl}`" alt="" />
      <div class="centers">
        <div class="left">
          <img class="smbg" :src="`${lists.coverImgUrl}`" />
          <div class="songs">歌单</div>
          <h6>{{ lists.playCount | fullNuM }}</h6>
        </div>
        <div class="right">
          <p>{{ lists.description }}</p>
          <div class="user">
            <!-- <img :src="arr.picUrl" alt="" /> -->
            <span>{{ lists.name }}</span>
          </div>
        </div>
      </div>
      <div class="headerback" @click="backs"></div>
    </div>
    <div class="musiclist">
      <Newmusic
        :list="item"
        v-for="(item, index) in holist"
        :key="index"
        :shownum="index"
        @play="$emit('play', $event)"
      ></Newmusic>
      <Comment :comlist="Commentlist"></Comment>
    </div>
    <!-- <div style="padding-top:40px" v-if="plays"></div> -->
  </div>
</template>

<script>
import Newmusic from "../components/Newmusic";
import Comment from "../components/Comment";
export default {
  data() {
    return {
      id: '',
      lists: {},
      holist: [],
      Commentlist: [],
    };
  },
  created() {
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    // /comment/playlist?id=705123491
    // console.log(this.arr.id);
    this.axios("/playlist/detail", {
      params: { id: this.id},
    }).then((res) => {
      console.log(res.data);
      this.lists = res.data.playlist
      this.holist = res.data.playlist.tracks.map((d, index) => {
        // console.log(d.name);
        let datas = d;
        // console.log(res.data);
        datas.song = {
          artists: datas.ar,
          privilege: {
            playMaxbr: res.data.privileges[index].playMaxbr,
          },
        };
        return datas;
      });
    });

    //歌单评论
    this.axios("/comment/playlist", {
      params: { id: this.id},
    }).then((res) => {
      // console.log(res.data);
      this.Commentlist = res.data.comments;
    });
  },
  methods: {
    backs() {
      this.$router.back();
    },
  },
  filters: {
    fullNuM(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  components: {
    Newmusic,
    Comment,
    // Plays
  },
};
</script>

<style lang="less" scoped>
.songdetail{
  width: 100%;
  height: 95vh;
  overflow-y: auto;
.header {
  width: 100%;
  position: fixed;
  left: -20px;
  top: -12px;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  z-index: 100;
  .headerback {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 30px;
    height: 30px;
    background: url(../assets/back.png) no-repeat;
    background-size: 30px;
    // height: ;
  }
  .bg {
    position: absolute;
    top: 0px;
    left: -5px;
    width: 100%;
    height: 270px;
    filter: blur(6px);
    -webkit-filter: blur(6px); /* chrome, opera */
    -ms-filter: blur(6px);
    -moz-filter: blur(6px);
  }
  .centers {
    justify-content: space-evenly;
    margin-top: 0px;
    display: flex;
    width: 100%;
    z-index: 110;
    .left {
      position: relative;
      width: 126px;
      height: 126px;
      font-size: 16px;
      color: #fff;
      .smbg {
        width: 100%;
      }
      .songs {
        position: absolute;
        top: 0px;
        left: 0px;
      }
      h6 {
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }

    .right {
      z-index: 110;
      width: 50%;
      p {
        padding-top: 1px;
        font-size: 17px;
        text-align: left;
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fefefe;
      }
      .user {
        margin-top: 20px;
        display: inline-block;
        color: hsla(0, 0%, 100%, 0.7);
        span{
          font-size: 18px;
        }
      }
    }
  }
}
.musiclist {
  width: 100%;
  margin-top: 182px;
  
}
}
</style>