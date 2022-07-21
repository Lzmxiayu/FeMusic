<template>
  <div id="app" :class="$store.state.theme"  @click="changeTheme">
    <music-header/>
    <Content/>
    <music-footer/>
  </div>
</template>

<script>
import MusicHeader from './components/layout/MusicHeader'
import MusicMain from './components/layout/MusicMain'
import MusicFooter from './components/layout/MusicFooter'
import MusicSidebar from './components/layout/MusicSidebar.vue'
import Content from './components/layout/Content.vue'
import './styles/blacktheme.css'
import './styles/normaltheme.css'

export default {
  name: 'App',
  data(){
    return {
      sty:''
    }
  },
  components:{
    MusicHeader,
    MusicMain,
    MusicFooter,
    MusicSidebar,
    Content
  },
  watch:{
    '$store.state'(){
      console.log('更新了')
      localStorage.setItem('music',JSON.stringify(this.$store.state))
        
    }
  },
  methods:{
    changeTheme(){
      // this.sty = (this.sty==='normaltheme')?'blacktheme':'normaltheme'
    }
  },
  mounted(){
    // const item = JSON.parse(localStorage.getItem('music'))
    // item!==null && this.$store.replaceState(item)
  },
  beforeDestroy(){
    //组件销毁前保存状态
    localStorage.setItem('music',JSON.stringify(this.$store.state))
    console.log('完成了')
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height:100vh;
  width:100vw;  
  display:flex;
  flex-direction: column;
  background: url('./assets/雪山.jpg');
} */

</style>
