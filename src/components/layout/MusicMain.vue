<template>
  <div id="music-main">
    <router-view></router-view>
  </div>
</template>

<script>
import FindMusic from '../base/main/FindMusic.vue'
// import Home from '../base/main/Home.vue'
export default {
    name:'music-main',
    components: { FindMusic },
}
</script>

<style scoped>
#music-main{
    grid-area: content;
    /* background: white; */
     background:#FFF2E2;
    height:80vh;
}
</style>