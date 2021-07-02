<template>
  <div :class="['nav', { paused: paused }]" v-if="pid">
    <!-- @timeupdate="timeupdatas" 播放时间的更新时间
          @play="play"  播放事件
          @pause="pause"   暂停事件
          @ended="playEnd"  播放完成事件
          -->
    <!-- 播放器 -->
    <!-- <audio src="`/song/media/outer/url?id=${pid.id}.mp3`"></audio> -->
    <audio
      :src="`http://music.163.com/song/media/outer/url?id=${pid.id}.mp3`"
      @timeupdate="timeupdatas"
      @play="play"
      @pause="pause"
      @ended="playEnd"
      ref="audio"
      @canplay="canplay"
    ></audio>

    <!-- <transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    > -->
    <!-- 小的播放栏 -->

    <div
      class="minBar"
      v-if="pid"
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <!-- 播放栏的图片 -->
      <img v-if="url" :src="`${url}`" />
      <img v-if="!url" src="../assets/toplogo.png" />
      <!-- 歌曲名称和歌手 -->
      <div class="musictext" @click="isFull = true">
        <h5>{{ pid.name }}</h5>
        <!-- <p class="smtext">{{pid.artists[0].name}</p> -->
        <p class="smtext" >{{pid.artists[0].name||pid.ar[0].name}}</p>
		
      </div>

      <!-- 播放按钮 -->
      <div class="navright">
        <div class="huabu">
          <canvas width="50" height="50" ref="minplay"></canvas>
          <span class="btn" @click="toggleplay"></span>
        </div>
        
      </div>
    </div>


    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <!-- 播放页面 -->
      <div class="fullsreen" v-show="isFull">
        <div class="content">
          <!-- 返回按钮 -->
          <p @click="isFull = false" class="back"></p>
          <!-- 歌手 -->
          <h2 class="song">{{ pid.name }}</h2>
          
          <!-- <p class="author">{{pid.artists}}</p> -->
          <!-- 歌曲图片 -->
          <div class="bgimg" v-show="showimg">
            <div class="zjimg">
              <img @click="showimgs" v-if="url" :src="`${url}`" />
              <img
                @click="showimgs"
                v-if="!url"
                src="../assets/toplogo.png"
              />
            </div>
          </div>

          <!-- 歌词 -->
          <!-- v-show="!showimg" @click="showimgs" -->
          <div class="lyric" v-show="!showimg" @click="showimgs">
            <!--歌词-->
            <ul :style="{ transform: `translateY(${Litop}px)` }">
              <li
                v-for="(item, index) in lyrics"
                :key="index"
                :class="{ lyricLight: index == lyricIndex }"
                ref="lyricLi"
              >
                {{ item.lyric }}
              </li>
            </ul>
          </div>
          <!-- 歌曲控制面板 -->
          <div class="control">
            <!-- 进度条 -->
            <div class="inp">
              <input
                type="range"
                min="0"
                max="100"
                v-model="timerange"
                @input="changetime"
              />
            </div>

            <br />
            <div class="bttn">
              <!-- 单曲循环 -->
              <button @click="playMode = 'circle'" class="danqu" onclick="alert('该功能还没开发')"></button>
              <!-- 上一曲 -->
              <button @click="prevmusic" class="prev"></button>
              <!-- 暂停 -->
              <button @click="toggleplay" ref="play" class="pause"></button>
              <!-- 下一曲 -->
              <button @click="nextmusic" class="next"></button>
              <!-- 列表循环 -->
              <!-- <button @click="playMode = 'list'">列表循环</button> -->
              <!-- 随机播放 -->
              <!-- <button @click="playMode = 'rand'">随机播放</button> -->
              <!-- 列表播放 -->

              <van-cell is-link @click="showPopup" class="list"></van-cell>

              <van-popup
                v-model="show"
                position="bottom"
                :style="{
                  height: '50%',
                  width: '80%',
                }"
              >
                <h1>播放列表</h1>
                <p
                  v-for="item in Musiclist"
                  :key="item.id"
                  :style="{ color: item.id == pid.id ? 'white' : '' }"
                  @click="$emit('play', item)"
                >
                  {{item.name}}
                  <!-- --{{item.ar[0].name}} -->
                </p>
              </van-popup>
            </div>
          </div>
        </div>
        <div class="bigbg">
          <img v-if="url" :src="`${url}`" />
          <img v-if="!url" src="../assets/toplogo.png" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showimg: false,
      paused: true,
      list: false,
      isFull: false,
      lyrics: [],
      currenttime: 0,
      duration: 0,
      playMode: "circle", //单曲循环circle  随机播放 rand 列表循环list
      showlist: false,
      playicon: true,
      lyricIndex: 0, // 记录当前应该显示的歌词下标
      Litop: 150,
      show: false,
      url: null,
    };
  },
  computed: {
    timerange: {
      get() {
        return this.duration ? (this.currenttime / this.duration) * 100 : 0;
      },
      set(val) {
        let player = this.$refs.audio;
        player.currentTime = (val / 100) * this.duration;
      },
    },
  },
  watch: {
    pid(value) {
      this.paused = true;
      this.axios("/lyric", {
        params: {
          id: value.id,
        },
      }).then((d) => {
        // console.log(d);
        this.lyrics = [];
        console.log(d.data.lrc);
        if (!d.data.lrc || !d.data.lrc.lyric) {
          return;
        }
        let lyric = d.data.lrc.lyric;
        // console.log(lyric)

        let lyricArry = lyric.split("\n");
        lyricArry.pop();
        // console.log(lyricArry);
        let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
        for (let i = 0; i < lyricArry.length; i++) {
          //
          let regex = new RegExp(reg);
          if (regex.test(lyricArry[i])) {
            let item = {
              //时间
              time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
              lyric: RegExp.$3,
            };
            this.lyrics.push(item);
          }
        }
        this.url = null;

        this.axios
          .get("/song/detail", {
            params: {
              ids: value.id,
            },
          })
          .then((res) => {
            //  console.log(res.data.result.songs);
            let img = new Image();
            img.src = res.data.songs[0].al.picUrl;
            img.onload = () => {
              this.url = img.src;
              console.log(img.src);
            };
          });
        // console.log(this.lyrics, 111);
      });
    },
  },
  props: {
    pid: {
      type: Object,
      default: function () {
        return null;
      },
    },
    Musiclist: Array,
  },
  methods: {
    showPopup() {
      this.show = true;
      this.paused = false;
    },
    showimgs() {
      this.showimg = !this.showimg;
    },
    showlists() {
      this.showlist = !this.showlist;
    },
    playEnd() {
      if (this.playMode == "circle") {
        this.$refs.audio.play();
      } else if (this.playMode == "rand") {
        let randindex = Math.floor(Math.random() * this.Musiclist.length);
        let randMusic = this.Musiclist[randindex];
        this.$emit("play", randMusic);
      } else {
        //顺序播放
        this.nextmusic();
      }
    },
    pause() {
      this.paused = true;
    },
    play() {
      this.paused = false;
    },
    canplay() {
      let audio = this.$refs.audio;
      // console.log(audio)

      let duration = audio.duration; //获取播放总时长
      this.duration = duration;
      audio.play();
    },
    changetime(e) {
      let val = e.target.value;
      let player = this.$refs.audio;

      let time = (val / 100) * this.duration;
      console.log(this.duration, val);
      player.currentTime = time;
    },
    toggleplay() {
      let audios = this.$refs.audio;
      console.log(this.paused);
      if (this.paused) {
        audios.play();
      } else {
        audios.pause();
      }
      this.showimg = !this.showimg;
    },
    changlist() {
      this.list = !this.list;
    },
    timeupdatas(e) {
      let audio = e.target;
      // console.log(audio)
      let currenttime = audio.currentTime; //获取当前播放时间

      let duration = audio.duration; //获取播放总时长
      this.duration = duration;
      this.drawcircle(currenttime, duration);
      this.currenttime = currenttime;
      let lyricLi = this.$refs.lyricLi;
      for (var i = 0; i < this.lyrics.length; i++) {
        //循环歌词
        // console.log( i);
        if (i == this.lyrics.length - 1) {
          //判断如果是最后一条歌词不需要和后一条比较，直接去到最后
          this.lyricIndex = i;
          // console.log(this.lyricIndex);
          break;
        }
        if (
          currenttime >= this.lyrics[i].time &&
          currenttime < this.lyrics[i + 1].time
        ) {
          // console.log(this.lyrics[i].time);
          this.lyricIndex = i;
          this.Litop = -lyricLi[i].offsetTop + 180; //获取当前显示歌词的li lyricLi[i].offsetTop元素距离父元素别、顶部的位置
          break;
        }
      }
    },

    drawcircle(currenttime, duration) {
      let canvas = this.$refs.minplay;
      // console.log(canvas);
      let context = canvas.getContext("2d");
      context.clearRect(0, 0, 50, 50);
      context.beginPath();
      context.strokeStyle = "rgba(0,0,0,0.1)";
      context.lineWidth = 5; //线的宽度
      context.arc(25, 25, 20, 0, 2 * Math.PI);
      context.stroke();
      context.closePath();
      let arcP = (currenttime / duration) * 2 * Math.PI;
      context.beginPath();
      context.strokeStyle = "rgba(113,227,209,1)";
      context.lineWidth = 4;
      context.arc(25, 25, 20, 0, arcP);
      context.stroke();
      context.closePath();
    },
    prevmusic() {
      let playID = this.pid.id;
      this.paused = true;
      let prevmucis = null;
      this.Musiclist.filter((d, index) => {
        if (d.id == playID) {
          //找到当前播放的音乐
          let i = --index; //上一曲下标
          if (i < 0) i = this.Musiclist.length - 1; //判断如果是上一曲的下标是1 取到最后一条
          prevmucis = this.Musiclist[i];
        }
      });
      this.$emit("play", prevmucis);
      console.log(1);
    },
    nextmusic() {
      let playID = this.pid.id;
      this.paused = false;
      let prevmucis = null;
      this.Musiclist.filter((d, index) => {
        if (d.id == playID) {
          //找到当前播放的音乐
          let i = ++index; //上一曲下标
          if (i > this.Musiclist.length - 1) i = 0; //判断如果是下一曲的下标大于歌单长度 取到第一曲
          prevmucis = this.Musiclist[i];
        }
      });
      this.$emit("play", prevmucis);
      console.log(2);
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  position: relative;

  .minBar {
    display: flex;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0px;
    left: 0;
    z-index: 101;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #eee;
    img {
      width: 40px;
      height: 40px;
      // margin-top: 5px;
      margin-left: 20px;
      display: block;
      border-radius: 50%;
      animation: randImg 5s 0s linear infinite;
      box-shadow: 0px 0px 6px #888888;
    }

    .musictext {
      text-align: left;
      // display: flex;
      // align-items: center;
      // overflow: hidden;

      width: 49%;
      white-space: nowrap;
      overflow: hidden;
      height: 50px;
      padding-top: 7px;
      h5 {
        font-size: 16px;
        
      }
      p {
        // flex: 1;
        // max-width: 175px;
        // height: 20px;
        font-size: 12px;
        // font-weight: bold;
      }

      span.smtext {
        line-height: 20px;
        overflow: hidden;
        max-width: 50px;
        font-size: 12px;
        height: 20px;
      }
    }

    .navright {
      display: flex;
      width: 20vw;
      align-items: center;
      justify-content: space-between;
      margin-right: 15px;
      div.huabu {
        width: 50px;
        height: 50px;
        position: relative;

        canvas {
          position: absolute;
          left: 0px;
          top: 0px;
        }

        .btn::after {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          top: 13px;
          left: 13px;
          position: absolute;
          content: "";
          background: url(../assets/zanting.png) no-repeat;
          background-size: 25px;
        }
      }

      .his {
        width: 45px;
        height: 45px;
        background: url(../assets/blb.png) no-repeat;
        background-size: 45px;

        .hislist {
          height: 120px;
          width: 117px;
          background: rgba(0, 0, 0, 0.6);
          border-top-left-radius: 10px;
          position: absolute;
          right: 0px;
          top: -120px;
          overflow: hidden;
          font-size: 10px;

          P {
            padding: 2px 0px;
            line-height: 18px;
            width: 100%;
            height: 18px;
            overflow: hidden;
            margin-left: 1rem;
            margin-top: 0.4rem;
            color: rgba(255, 255, 255, 0.9);
            // border-bottom: 1px solid rgba(61, 61, 61, 0.3);
          }
        }
      }
    }
  }

  .fullsreen {
    position: fixed;
    width: 100%;
    //100vh=设备 100%高度 视图高度
    height: 100vh;
    bottom: 0px;
    z-index: 102;
    text-align: center;

    .bigbg {
      z-index: 100;
      position: fixed;
      bottom: -50px;
      left: -30px;
      right: -30px;
      background-color: rgb(255, 255, 255);
      img {
        filter: blur(200px);
        width: 130vw;
        height: 130vh;
      }
    }

    .content {
      width: 100vw;
      height: 100vh;
      position: fixed;
      bottom: 0px;
      z-index: 200;
      .song {
        margin-top: 25px;
        font-size: 35px;
      }
      .author{
        font-size:0.8rem;
        opacity: 0.8;
      }
      .back {
        position: fixed;
        left: 15px;
        top: 10px;
        height: 30px;
        width: 30px;
        background: url(../assets/back.png) no-repeat;
        background-size: 30px;
        z-index: 104;
      }

      .bgimg {
        margin-top: 30px;
        height: 66vh;
        display: flex;
        align-items: center;
        justify-content: center;

        div.zjimg {
          img {
            width: 60vw;
            height: 60vw;
            margin: 0 auto;
            border-radius: 50%;
            animation: randImg 5s linear infinite;
            z-index: 120;
          }
        }
      }

      .lyric {
        margin-top: 30px;
        height: 66vh;
        overflow: hidden;

        ul {
          overflow: hidden;

          li {
            margin: 15.5px 0px;
            font-size:15px;
          }
          transition: 0.5s;
        }

        .lyricLight {
          color: rgb(255, 255, 255);
          font-weight: bold;

          font-size: 18px;
        }
      }

      .control {
        // background: rgba(180, 234, 255, 0.7);
        background: rgba(0, 0, 0, 0.7);
        // height: 20vh;
        height: 130px;
        border-radius: 30px;
        position: fixed;
        width: 100%;
        bottom: -30px;

        .inp {
          display: flex;
          justify-content: center;
          margin-top: 10px;

          input[type="range"] {
            display: block;
            margin-top: -3rem;
            width:70vw;
            border-radius: 10px;
          }
        }

        .bttn {
          // margin-top: 1rem;
          width: 100%;
          // height: ;
          display: flex;
          justify-content: space-around;
          align-items: center;

          .prev {
            width: 40px;
            height: 40px;
            outline: none;
            border: 0px;
            background: url(../assets/s.png) no-repeat;
            background-size: 40px;
          }

          .next {
            width: 40px;
            height: 40px;
            outline: none;
            border: 0px;
            background: url(../assets/x.png) no-repeat;
            background-size: 40px;
          }

          .pause {
            width: 50px;
            height: 50px;
            outline: none;
            border: 0px;
            background: url(../assets/z.png) no-repeat;
            background-size: 50px;
          }

          .danqu {
            width: 40px;
            height: 40px;
            outline: none;
            border: 0px;
            background: url(../assets/xh.png) no-repeat;
            background-size: 40px;
          }

          .list {
            width: 40px;
            height: 40px;
            background: url(../assets/lb.png) no-repeat;
            background-size: 40px;

            i::before {
              content: "";
            }
          }

          .van-cell::after {
            display: none;
          }

          .van-popup {
            margin-left: 10%;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.9);
            overflow: auto;
            position: fixed;
            bottom: 0;
            right: 0;
            font-size: 16px;
            // padding: 1rem 2rem;
            h1 {
              text-align: left;
              color: #eee;
              
            }
            p {
              text-align: left;
              margin-top: 1rem;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
      }
    }
  }
}

.paused {
  .minBar {
    img {
      animation-play-state: paused;
    }

    .navright {
      div.huabu {
        .btn::after {
          background: url(../assets/bofang.png) no-repeat;
          background-size: 30px;
          left: 12.5px;
          top: 11px;
        }
      }
    }
  }

  .fullsreen {
    .content {
      .bgimg {
        div.zjimg {
          img {
            animation-play-state: paused;
          }
        }
      }

      .control {
        .bttn {
          .pause {
            background: url(../assets/b1.png) no-repeat;
            width: 50px;
            height: 50px;
            outline: none;
            border: 0px;
            background-size: 50px;
          }
        }
      }
    }
  }
}

@keyframes randImg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
