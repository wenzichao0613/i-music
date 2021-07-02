<template>
  <div class="">
    <p>热门搜索</p>
    <div class="hotnav">
      <a class="hot" v-for="(item, index) in recommends" :key="index" @click="$emit('change', item.first)" >{{
        item.first
      }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["recommends"],
  methods:{
}
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
.hotnav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // margin-left:10px;
  .hot {
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 14px;
    font-size: 14px;
    line-height: 32px;
    color: #333;
    border: 1px solid rgba(0, 0, 0, 0.1);;
    border-radius: 30px;
  }
}
</style>