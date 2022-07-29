<template>
  <div id="app" :class="$store.state.theme">
    <music-header/>
    <Content/>
    <music-footer/>
  </div> 
</template>

<script>
import MusicHeader from './components/layout/MusicHeader'
import Content from './components/layout/Content.vue'
import MusicFooter from './components/layout/MusicFooter'
import './styles/blacktheme.css'
import './styles/normaltheme.css'

export default {
  name: 'App',
  components:{
    MusicHeader,
    Content,
    MusicFooter
  },
}
</script>

<style>
body{
    margin:0% 0% 0% 0%;
}
body:-webkit-scrollbar{
    display: none;
}
#app:-webkit-scrollbar{
    display: none;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* height:100vh;
  width:100vw;   */
  /* display:flex; */
  /* flex-direction: column; */
  /* background: url('./assets/雪山.jpg'); */
} 

</style>
