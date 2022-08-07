<template>
  <div id="content">
    <div class="maincontent">
        <music-sidebar v-show="!$store.state.openSongBoard"/>
        <MusicMain v-show="!$store.state.openSongBoard"/>
    </div>
        <song-board v-show="$store.state.openSongBoard"/>
  </div>
</template>

<script>
import MusicSidebar from './MusicSidebar.vue';
import MusicMain from './MusicMain.vue';
import SongBoard from '../content/songborad/SongBoard.vue'
export default {
    name:'content',
    components: { MusicSidebar, MusicMain, SongBoard }
}
</script>

<style>
#content{
    position:relative;
    display: flex;
    width:100%;
    height: 84%;
}
.maincontent{
   position:relative;
    display: flex;
    width:100%;
    height: 84vh;
}

</style>