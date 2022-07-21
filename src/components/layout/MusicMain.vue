<template>
  <div id="music-main">
    <router-view></router-view>
    <playing-list/>
  </div>
</template>

<script>
import FindMusic from '../base/main/FindMusic.vue'
import PlayingList from '../content/playinglist/PlayingSongList'
export default {
    name:'music-main',
    components: { FindMusic,PlayingList },
}
</script>

<style scoped>
#music-main{
    grid-area: content;
    flex:8;
    position:relative;
}

</style>