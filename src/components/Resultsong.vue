<template>
  <ul>
    <p>搜索结果</p>
    <li v-for="(item, index) in list" :key="index" @click="$emit('play', item)"  >
      <p v-html="$options.filters.heighlight(item.name, keynames)"></p>
      <span>{{ item.artists[0].name }}-{{ item.name }}</span>
      <div class="right"></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["keynames"],
  data() {
    return {
      list: [],
      
    };
  },
  methods: {},
  filters: {
    heighlight(value, keywords) {
      let str = String(value).replace(
        keywords,
        '<span style="color:red">' + keywords + "</span>"
      );
      return str;
    },
  },
  created() {
    this.axios("/search?keywords=" + this.keynames + "=&limit=30").then(
      (res) => {
        //  console.log(res.data.result.songs);
        this.list = res.data.result.songs;
        console.log(this.list);
      }
    );
    
  },
};
</script>

<style lang="less" scoped>
ul{
  height: 99vh;
  overflow-y: auto;
  p.title{
    font-size: 12px;
    line-height: 12px;
    color: #666;
    margin-bottom: 10px;
    text-align: left;
  }

li {
  height: 55px;
  border-bottom: 1px solid rgb(231, 231, 231);
  position: relative;
  margin: 5px 0px 10px 10px;
  overflow: hidden;

  p {
    width: 88%;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    span{
      font-weight: 400;
    }
  }
  span {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
    color: #888;
    text-align: left;
    display: inline-block;
  }
  .sq {
    display: inline-block;
    background: url("../assets/index_icon_2x.png") no-repeat 0 0;
    background-size: 222px;
    width: 21px;
    height: 11px;
  }
  .right {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -11px;
    background: url("../assets/index_icon_2x.png") no-repeat;
    background-size: 166px 97px;
    background-position: -24px 0;
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 120px;
  }
}
}
</style>