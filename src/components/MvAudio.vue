<template>
  <div class="audio">
    <div class="back" @click="back">&lt;</div>
    <video controls autoplay :src="url"></video>
    <div class="songer">
      <div class="profile">
        <img :src="`${songerData.cover}`" alt="" />
      </div>
      <div class="songname">{{ songerData.name }}</div>
      <div class="detail">
        {{ mvData.playCount }}次播放 {{ mvData.publishTime }}
      </div>
    </div>
    <div class="desc">简介:{{ mvData.desc }}</div>
    <div class="comment">热门评论</div>
    <ul>
      <li v-for="(item, index) in comments" :key="index">
        <div class="user">
          <div class="userpic">
            <img :src="`${item.user.avatarUrl}`" alt="" />
          </div>
          <div class="username">{{ item.user.nickname }}</div>
        </div>
        <div class="content">{{ item.content }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      artistid: "",
      url: "",
      songerData: {},
      mvData: {},
      comments: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  created() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.artistid = this.$route.query.artistid;
    console.log(this.artistid);
    //通过id获取mv视频路径
    this.axios({
      method: "get",
      url: "/mv/url",
      params: {
        id: this.id,
        r: "1080",
      },
    }).then((res) => {
      console.log(res.data.data);
      this.url = res.data.data.url;
    });
    //获取mv相关数据
    this.axios({
      method: "get",
      url: "/mv/detail",
      params: {
        mvid: this.id,
      },
    }).then((res) => {
      console.log(res.data.data);
      this.mvData = res.data.data;
    });
    //获取歌手信息
    this.axios({
      method: "get",
      url: "/artist/detail",
      params: {
        id: this.artistid,
      },
    }).then((res) => {
      console.log(res);
      this.songerData = res.data.data.artist;
      console.log(this.songerData);
    });
    //获取评论信息
    this.axios({
      method: "get",
      url: "/comment/mv",
      params: {
        id: this.id,
      },
    }).then((res) => {
      console.log(res.data.comments);
      this.comments = res.data.comments;
    });
  },
};
</script>
<style lang="less" scoped>
.audio {
    width: 100%;
    height: 93vh;
    overflow-y: auto;
  .back {
    text-align: left;
    margin-left: 10px;
  }
  video {
    width: 100%;
    height: 200px;
  }
  .songer {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    position: relative;
    .profile {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 20px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .songname {
      float: left;
      margin-left: 5px;
      margin-top: 5px;
      font-size: 20px;
      color: #000;
    }
    .detail {
      font-size: 12px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .desc {
    margin-top: 5px;
    text-indent: 25px;
    font-size: 16px;
  }
  .comment {
    text-align: left;
    margin-top: 10px;
  }
  ul {
      margin-top: 20px;
    li {
      width: 100%;
      height: 70px;
      list-style: none;
      border-bottom: 1px solid #ccc;
      .user {
        height: 40px;
        .userpic {
          width: 40px;
          height: 40px;
          float: left;
          margin-left: 10px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .username {
          float: left;
          margin-top: 5px;
          margin-left: 10px;
          font-size: 18px;
        }
      }
      .content{
          width: 90%;
          height: 30px;
          padding-right: 10px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          margin-left: 50px;
          font-size: 20px;
      }
    }
  }
}
</style>