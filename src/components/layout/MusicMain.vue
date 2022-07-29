<template>
  <div id="music-main">
    <router-view></router-view>
    <playing-list/>
  </div>
</template>

<script>
import SearchMusic from '../base/main/SearchMusic.vue'
import PlayingList from '../content/playinglist/PlayingSongList'

export default {
    name:'music-main',
    components: { SearchMusic, PlayingList},
}
</script>

<style scoped>
#music-main{
  position: relative;
    flex:8;
}

</style>