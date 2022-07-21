<template>
  <div id="music-footer">
     <music-player/>
  </div>
</template>

<script>
import MusicPlayer from '../base/footer/MusicPlayer.vue'
export default {
  components: { MusicPlayer },
    name:'music-footer',
 
}
</script>

<style scoped>
#music-footer{
    grid-area: footer;
    flex:1;
    height:8vh;
    padding:0%;
}

</style>