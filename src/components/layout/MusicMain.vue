<template>
  <div id="music-main">
    <router-view></router-view>
    <!-- <find-music/> -->
    <!-- <home/> -->
  </div>
</template>

<script>
import FindMusic from '../base/content/FindMusic.vue'
import Home from '../base/content/Home.vue'
export default {
    name:'music-main',
    components: { FindMusic, Home },
}
</script>

<style scoped>
#music-main{
    grid-area: content;
    background: white;
}
</style>