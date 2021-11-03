import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '../components/base/content/FindMusic'
import Home from '../components/base/content/Home'
import LoveMusic from '../components/base/content/LoveMusic'
import PlayRecent from '../components/base/content/PlayRecent'
import CollectMusic from '../components/base/content/CollectMusic'



Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/fdmc',
      name: 'FindMusic',
      component: FindMusic
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


  ]
})
