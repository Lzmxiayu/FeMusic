import Vue from 'vue'
import Router from 'vue-router'

import SearchMusic from '../components/base/main/SearchMusic'

import Singers from '../components/base/main/Singers'
import TopList from '../components/base/main/TopList'
import MV from '../components/base/main/MV'
import NewAlbums from '../components/base/main/NewAlbums'
import NewMusic from '../components/content/new-music/NewMusic'
import SongCollect from '../components/base/main/SongCollect'

import AllMv from '../components/content/mv/AllMv'
import SingerInfo from '../components/content/singer/SingerInfo'
import AlbumDetail from '../components/base/main/AlbumDetail'
import SongSheetDetail from '../components/content/songSheet/SongSheetDetail'

import MvPlayer from '../components/content/players/MvPlayer'

Vue.use(Router)

const originalPush = Router.prototype.push
 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  // mode:'hash',
  mode:"history",
  linkActiveClass:"active",
  routes: [
    //主页
    {
      path:'/',
      name:'home',
      component:SongCollect,
      children:[
      ]
    },
     //搜索音乐
    {
      path: '/fdmc',
      name: 'SearchMusic',
      component: SearchMusic,   
    },
    //最新音乐
    {
      path:'/nwmc',
      name:'NewMusic',
      component:NewMusic,
    },
    //榜单
    {
      path:'/tplt',
      name:'TopList',
      component:TopList,
    },
    //歌单详请
    {
      path:'/ssdl',
      name:'SongSheetDetail',
      component:SongSheetDetail
    },
    //歌手列表
    {
      path:'/singers',
      name:'Singers',
      component:Singers,
    },
    //歌手详情
    {
      path: '/sgio',
      name: 'SingerInfo',
      component: SingerInfo,
    },
    //MV页
    {
      path:'/mv',
      name:'MV',
      component:MV,
    },
    //全部MV页
    {
      path:'/allmv',
      name:'AllMV',
      component:AllMv,
    },
    //mv播放页
    {
      path:'/mvpr',
      name:'MvPlayer',
      component:MvPlayer,
    },
    //最新专辑
    {
      path:'/newabms',
      name:'NewAlbums',
      component:NewAlbums,  
    },
    //专辑详情
    {
      path:'/amdl',
      name:'AlbumDetail',
      component:AlbumDetail,
    },
    //收藏歌曲页
    {
      path:'/songcollect',
      name:'SongCollect',
      component:SongCollect,
    },
  ]
})
