import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '../components/base/main/FindMusic'
import Home from '../components/base/main/Home'
import LoveMusic from '../components/base/main/LoveMusic'
import PlayRecent from '../components/base/main/PlayRecent'
import CollectMusic from '../components/base/main/CollectMusic'
import SongList from '../components/content/search-content/SongList'
import ArtistList from '../components/content/search-content/ArtistList'
import FoundMusic from '../components/base/main/FoundMusic'
import Singers from '../components/content/found-music/Singers'
import NewMvs from '../components/content/found-music/NewMvs'
import NewAlbums from '../components/content/found-music/NewAlbums'
import SongBoard from '../components/base/main/SongBoard'
import SingerInfo from '../components/base/main/SingerInfo'
import SingerAlbums from '../components/content/singer/SingerAlbums'
import SingerDetails from '../components/content/singer/SingerDetails'
import SingerMv from '../components/content/singer/SingerMv'
import SimilarSingers from '../components/content/singer/SimilarSingers'
import MvPlayer from '../components/base/main/MvPlayer'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [

    //主页
    {
      path:'/',
      component:FoundMusic,
      children:[
        {
          path:'main/singers',
          name:'Singers',
          component:Singers,
        },
        {
          path:'main/newmvs',
          name:'newMvs',
          component:NewMvs,
        },
        {
          path:'main/newabms',
          name:'NewAlbums',
          component:NewAlbums,
        },

      ]
    },
    //搜索音乐
    {
      path: '/fdmc',
      name: 'FindMusic',
      component: FindMusic,
      children:[
        {
          path:'sglt',
          name:'singlesong',
          component:SongList,
        },
        {
          path:'atlt',
          name:'Artist',
          component:ArtistList,
        }
      ]
    },
    //用户主页
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    //喜爱的音乐
    {
      path: '/lemc',
      name: 'LoveMusic',
      component: LoveMusic
    },
    //最近播放
    {
      path: '/pyrt',
      name: 'PlayRecent',
      component: PlayRecent
    },
    //收藏的音乐
    {
      path: '/clmc',
      name: 'CollectMusic',
      component: CollectMusic
    },
    //歌曲信息板
    {
      path: '/sgbd',
      name: 'SongBoard',
      component: SongBoard
    },
    //歌手页
    {
      path: '/sgio',
      name: 'SingerInfo',
      component: SingerInfo,
      children:[
        {
          path:'sgal',
          name:'SingerAlbums',
          component:SingerAlbums,
        },
        {
          path:'sgdl',
          name:'SingerDetails',
          component:SingerDetails,
        },
        {
          path:'sgmv',
          name:'SingerMv',
          component:SingerMv,
        },
        {
          path:'sgsr',
          name:'SimilarSingers',
          component:SimilarSingers,
        },
      ]
    },
    //mv播放页
    {
      path:'/mvpr',
      name:'MvPlayer',
      component:MvPlayer,
    }


  ]
})
