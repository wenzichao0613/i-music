(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dd14486"],{2941:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"audio"},[s("div",{staticClass:"back",on:{click:t.back}},[t._v("<")]),s("video",{attrs:{controls:"",autoplay:"",src:t.url}}),s("div",{staticClass:"songer"},[s("div",{staticClass:"profile"},[s("img",{attrs:{src:""+t.songerData.cover,alt:""}})]),s("div",{staticClass:"songname"},[t._v(t._s(t.songerData.name))]),s("div",{staticClass:"detail"},[t._v(" "+t._s(t.mvData.playCount)+" 次播放  "+t._s(t.mvData.publishTime)+" ")])]),s("div",{staticClass:"desc"},[t._v("简介:"),s("span",[t._v(t._s(t.mvData.desc||"暂无简介"))])]),s("div",{staticClass:"comment"},[t._v("热门评论")]),s("ul",t._l(t.comments,(function(a,i){return s("li",{key:i},[s("div",{staticClass:"user"},[s("div",{staticClass:"userpic"},[s("img",{attrs:{src:""+a.user.avatarUrl,alt:""}})]),s("div",{staticClass:"username"},[t._v(t._s(a.user.nickname))])]),s("div",{staticClass:"content"},[t._v(t._s(a.content))])])})),0)])},e=[],n={data:function(){return{id:"",artistid:"",url:"",songerData:{},mvData:{},comments:[],duration:0}},methods:{back:function(){this.$router.back()}},created:function(){var t=this;this.$emit("aaa",this.duration),this.id=this.$route.query.id,this.artistid=this.$route.query.artistid,this.axios({method:"get",url:"/mv/url",params:{id:this.id,r:"1080"}}).then((function(a){t.url=a.data.data.url})),this.axios({method:"get",url:"/mv/detail",params:{mvid:this.id}}).then((function(a){t.duration=a.data.data.duration,t.mvData=a.data.data})),this.axios({method:"get",url:"/artist/detail",params:{id:this.artistid}}).then((function(a){t.songerData=a.data.data.artist})),this.axios({method:"get",url:"/comment/mv",params:{id:this.id}}).then((function(a){t.comments=a.data.comments}))}},r=n,d=(s("9881"),s("4ac2")),c=Object(d["a"])(r,i,e,!1,null,"1db63538",null);a["default"]=c.exports},"3e20":function(t,a,s){},9881:function(t,a,s){"use strict";s("3e20")}}]);
//# sourceMappingURL=chunk-7dd14486.58c28967.js.map