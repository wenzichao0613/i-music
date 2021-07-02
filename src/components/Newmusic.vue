<template>
  <li>
    <span class="txts">{{ (shownum + 1) | addzero }}</span>
    <div>
      <p>{{ list.name }}</p>
      <div v-show="list.song.privilege.playMaxbr == 999000" class="sq"></div>
      <span>{{ list.song.artists[0].name }}-{{ list.name }}</span>
      <div class="right" @click="$emit('play',list)"></div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["list", "shownum",],
  filters: {
    addzero(value) {
      return value < 10 ? "0" + value : value;
    },
  },
  created(){
    // console.log(this.list);
  }
};
</script>

<style lang="less" scoped>
li {
  height: 55px;
  border-bottom: 1px solid rgb(231, 231, 231);
  position: relative;
  margin:5px 0px 10px 0px ;
  display:flex;
  align-items: center;
  span.txts{
    width: 30px;
    font-size: 17px;
    margin: 0px 10px;
    color: #999;
  }
  div{
    p {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
  }
  span {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    display: inline-block;
  }
  .sq {
    display: inline-block;
    background: url('../assets/index_icon_2x.png') no-repeat 0 0;
    background-size: 222px;
    width: 21px;
    height: 11px;
  }
  .right {
    width: 22px;
    height: 22px;
    // background: pink;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -11px;
    // background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
    background: url('../assets/index_icon_2x.png')
      no-repeat;
    background-size: 166px 97px;
    background-position: -24px 0;
    cursor: pointer;
  }
  }
}
</style>