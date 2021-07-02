<template>
  <div >
     <div class="back" @click="back"></div>
    <div class="topinput">
      <div class="content">
        <i class="suos"></i>
        <form action="" @submit="searching" onsubmit="return false;">
          <input
            v-model="keyword"
            @input="change"
            type="text"
            placeholder="搜索歌单、歌手、专辑"
          />
        </form>
      </div>
    </div>
    <components
      @play="$emit('play',$event)"
      @change="changkeywords"
      class="foor"
      :is="componentname"
      :recommends="recommend"
      :keynames="keyword"
    ></components>
   <!-- @play="$emit('play',$event)" -->
  </div>
</template>

<script>
import Hotserchs from "@/components/Hotserch";
import Searchresult from "@/components/Searchresult";
import Resultsong from "@/components/Resultsong"
export default {
  data() {
    return {
      componentname: "Hotserchs",
      recommend: [],
      keyword: "",
      keyname: "",
    };
  },
  components: {
    Hotserchs,
    Searchresult,
    Resultsong
  },
  methods: {
    back(){
            this.$router.back()
    },
    changkeywords(e){
      this.keyword=e
     this.componentname = "Resultsong";
      // console.log(e);
    },
    searching(){
        this.componentname = "Resultsong";
    },
    change() {
      if (this.keyword.length != 0) {
        this.componentname = "Searchresult";
      } else {
        this.componentname = "Hotserchs";
      }
    },
    clicks() {
      // console.log(1);
    },
  },
  created() {
    // console.log(1);
    this.axios("/search/hot").then((res) => {
        // console.log(res.data);
      this.recommend = res.data.result.hots;
    });
  },
};
</script>

<style lang="less" scoped>
.back{
    position: fixed;
    top: 100px;
    left: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8UlEQVRYR+3WsQrCMBAG4P+2gm/TLDr6EPoi4u4sfRKfwiVbSafmRSx0a6WiEEqRS3JtUNr54P+46yUhJP4ocT5WwH91IM/zM4CNMebC/bfEOqCUugE4DMFEtC/L8s5BiADccAB127Zba22zCGAc3nXdsaoqywl/dYtbOFUXGx4FkAgPBkiFBwEkw70B0uFegDnC2QClVAHg9N6E2nfVvm0aaw2HI5aIrskAQ3DSEXxaOAeCNQJ3htIIb4D0OIIAkohggBQiCiCBiAZMIbIs22mtH5yrXgQwRiz+JHPOiaLv+ybJo5TT7qkasRGsgJ/twBMO+LUhrh2o+wAAAABJRU5ErkJggg==) no-repeat;
    background-size: 0.8rem;
    z-index: 10;
  }
.topinput {
  padding: 25px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
   margin-top: 20px;

  .content {
    width: 60vw;
    height: 30px;
    border-radius: 30px;
    background: #ebecec;
    position: relative;
    i.suos {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    }
    input {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      outline: none;
      border: 0px;
      text-indent: 2em;
      //    background: transparent;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
      border-radius: 20px;
    }
  }
}
.foor {
  margin: 10px;
}
</style>