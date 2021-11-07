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
    background: rgb(223, 127, 127);
    padding:0%;
}

</style>