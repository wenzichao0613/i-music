<template>
  <div>
      <boders>热门评论</boders>
    <div class="comments">
      <ul>
        <li v-for="(item, index) in comlist" :key="index">
          <img :src="item.user.avatarUrl" />
          <div class="user">
            <p class="name">{{ item.user.nickname }}</p>
            <p class="time">{{ item.time | uptime }}</p>
            <p class="content">{{ item.content }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import boders from "../components/Border";
export default {
  data() {
    return {};
  },
  props: ["comlist"],
  created() {
    console.log(this.comlist);
  },
  filters: {
    uptime(value) {
      let date = new Date(value);
      let m = date.getMinutes();
      return m + "分钟前";
    },
  },
  components:{
      boders
  }
};
</script>


<style lang="less" scoped>
.comments {
  width: 100vw;
  height: 100vh;
  ul {
    li {
      display: flex;
      //   align-items: center;
      padding: 10px;
      
      img {
          margin-top: 10px;
        margin-right: 10px;
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .user {
          width: 100%;
          text-align: left;
          border-bottom: 1px solid rgb(229, 226, 226);
          padding: 10px 0px;
        .name {
          font-size: 14px;
          color: #666;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-box-flex: 1;
          -webkit-flex: auto;
          flex: auto;
        }
        .time {
          font-size: 9px;
          color: #999;
        }
        .content {
          color: #333;
          font-size: 15px;
          line-height: 22px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>