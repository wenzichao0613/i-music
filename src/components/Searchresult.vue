<template>
  <div>
    <p>搜索提示</p>
    <ul>
      <li v-for="(item ,index) in keylist" :key="index"  @click="$emit('change', item)"><i></i><span>{{item.name}}--{{item.artists[0].name}}</span></li>
    </ul>
    <!-- <p> {{keynames}}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      succesbool: true,
      keylist: [],
    };
  },
  props: ["keynames"],
  watch: {
    keynames(value) {
      this.getsuggest(value);
    },
  },
  methods: {
    getsuggest(keyword) {
      if (!this.succesbool) return null;
      this.succesbool = false;
      this.axios(
        "/search?keywords=" + keyword + "=&limit=30"
      ).then((res) => {
        this.keylist = res.data.result.songs
        // console.log(res.data.result.songs);
        this.succesbool = true;
        // songs.name:歌名
        // songs.artists[0].name:歌名
      });
    },
  },
};
</script>

<style lang="less" scoped>
p{
    font-size: 12px;
    line-height: 12px;
    color: #666;
    margin-bottom: 10px;
    text-align: left;
}
ul {
  li {
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    overflow: hidden;
    i {
      width: 15px;
      height: 15px;
      background-image: url('../assets/icon.png');
      background-repeat: no-repeat;
      margin-left: 10px;
    }
    span {
       line-height: 50px;
       margin-left: 7px;
       height: 100%;
       font-size: 15px;

    }
  }
  
}
</style>