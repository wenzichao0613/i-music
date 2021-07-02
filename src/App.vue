<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link tag="i" to="/more">
        <img src="@/assets/more.png" alt="">
      </router-link>
      <nav-bar></nav-bar>
    </div> -->
    <top-logo></top-logo>
    <div class="load" v-show="flag">
       <div class="logo">
         <img src="@/assets/logo.png" alt="">
        <p>i 音 乐 &nbsp;&nbsp; i 生 活</p>
       </div>
    </div>
    <transition>
      <router-view
        @play="playmucis"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      ></router-view>
    </transition>
    <Plays :Musiclist="Musiclist" :pid="plays" @play="changmusic"></Plays>
  </div>
</template>

<script>
// import NavBar from './views/NavBar.vue';
import Plays from "@/components/Play";
import TopLogo from "@/components/Toplogo";
export default {
  data(){
    return{
      flag:true,
      Musiclist:[],
      plays: null,
      playtyoe:''
    }
  },
  components:{
    // NavBar,
    Plays,
    TopLogo
  },
  mounted(){
    setTimeout( ()=>{
      this.flag = false;
    },3000)
  },
  methods:{
    changmusic(e){
      this.plays=e
    },
    playmucis(e) {
      // if()
      console.log(e)
      if(!e.picUrl){
        if (e.al&&e.al.picUrl) {
          e.picUrl = e.al.picUrl;
        }else {
           e.picUrl='http://p3.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg'
        }
      }
      if(e.song&&e.song.artists){
       e.artists= e.song.artists
      }
     
      if(e.al&&e.ar){
        e.artists=e.al.name
      }
      this.plays = e;
      // 数组函数，map，filter，reduce，forEach
      let exit = false
      for(let i=0; i<this.Musiclist.length;i++){
          if(this.Musiclist[i].id==e.id){//已经存在
            exit=true
            break
          }
      }
      if(!exit){
        this.Musiclist.push(e);
      }
      // console.log(e);
    },
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 110vh;
  overflow: hidden;
  position: relative;
}
#app .load{
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  
  background: rgb(157, 210, 231);
  z-index: 999;
}
#app .load .logo{
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%,-50%);
}
#app .load .logo p{
  margin-top: 20px;
}
#nav {
    display: flex;
    width: 100%;
    height: 40px;
}

#nav i {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-top: 5px;
}
#nav i:nth-of-type(2){
  margin-right: 10px;
}
#nav i img{
  width: 25px;
  height: 25px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
