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
import SongBoard from '../components/base/main/SongBoard'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/',
      component:FoundMusic,
      children:[
        {
          path:'main/singers',
          name:'Singers',
          component:Singers,
        },
      ]
    },
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
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    
    {
      path: '/lemc',
      name: 'LoveMusic',
      component: LoveMusic
    },
    {
      path: '/pyrt',
      name: 'PlayRecent',
      component: PlayRecent
    },
    {
      path: '/clmc',
      name: 'CollectMusic',
      component: CollectMusic
    },
    {
      path: '/sgbd',
      name: 'SongBoard',
      component: SongBoard
    },
    


  ]
})
