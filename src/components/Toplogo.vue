<template>
     <div class="logo">
      <div class="pic"><img src="../assets/logo.png" alt=""></div>
      <span>i 音 乐</span>
    </div>
</template>
<style lang="less" scoped>
.logo{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 100;
  .pic{
    width: 70px;
    height: 70px;
    margin-left: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
   span{
        margin-left: 10px;
        font-size: 30px;
        color: #2ddae8;
    }
}
</style>