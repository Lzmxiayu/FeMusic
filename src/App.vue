<template>
  <div id="app">
    <music-header/>
    <music-sidebar/>
    <music-main/>
    <music-footer/>
    <temp-data/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import MusicHeader from './components/layout/MusicHeader'
import MusicMain from './components/layout/MusicMain'
import MusicFooter from './components/layout/MusicFooter'
import MusicSidebar from './components/layout/MusicSidebar.vue'
import TempData from './components/content/TempData.vue'
import axios from 'axios'



export default {
  name: 'App',
  components:{
    MusicHeader,MusicMain,MusicFooter,
    MusicSidebar,TempData
    
  },
  mounted(){
    axios.get('/toplist').then(
      res =>{
        // console.log(res)
      }
    )
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height:100vh;
  width:100vw;  
  display:grid;
  grid-template-areas: 
  "header header header"
  "sidebar content content "
  "footer footer footer";
  grid-template-rows: 1fr 8fr 1fr;
  grid-auto-columns: 1fr 4fr 1fr;
  /* margin-top: 60px; */
}
</style>
