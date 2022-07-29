<template>
  <div id="music-footer">
     <music-player/>
      <audio
        class="myvideo"       
      >
      </audio>
  </div>
</template>

<script>
import MusicPlayer from '../content/players/MusicPlayer.vue'
export default {
  components: { MusicPlayer },
    name:'music-footer',
    mounted(){
       const audio = document.querySelector('audio')
       this.$store.dispatch('sendMusicPlayer',audio)
    }
 
}
</script>

<style scoped>
#music-footer{
    height:8vh;
    /* box-sizing:border-box;
    border-top:1px solid grey; */
}
</style>