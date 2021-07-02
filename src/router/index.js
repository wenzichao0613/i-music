import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/views/Recommend.vue'
import Seacher from '@/views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/seacher',
    name: 'seacher',
    component: Seacher
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: () => import('@/components/SongList.vue')
  },
  {
    path: '/rankinglist',
    name: 'rankinglist',
    component: () => import('@/components/RankingList.vue')
  },
  {
    path: '/rankingsongs',
    name: 'Rankinglist',
    component: () => import('@/components/Rankingsongs.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/components/MV.vue')
  },
  {
    path: '/LiItem',
    name: 'LiItem',
    component: () => import('@/components/LiItem.vue')
  },
  {
    path: '/Songdetalis',
    name: 'Songdetalis',
    component: () => import('@/components/Songdetalis.vue')
  },
  {
    path: '/SongerList',
    name: 'SongerList',
    component: () => import('@/components/SongerList.vue')
  },
  {
    path: '/MvAudio',
    name: 'MvAudio',
    component: () => import('@/components/MvAudio.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
