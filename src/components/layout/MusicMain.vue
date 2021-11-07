<template>
  <div id="music-main">
    <router-view></router-view>
    <!-- <find-music/> -->
    <!-- <home/> -->
  </div>
</template>

<script>
import FindMusic from '../base/main/FindMusic.vue'
import Home from '../base/main/Home.vue'
export default {
    name:'music-main',
    components: { FindMusic, Home },
}
</script>

<style scoped>
#music-main{
    grid-area: content;
    background: white;
    height:80vh;
}
</style>