<template>
  <div id="content">
        <music-sidebar/>
        <MusicMain/>
  </div>
</template>

<script>
import MusicSidebar from './MusicSidebar.vue';
import MusicMain from './MusicMain.vue';
export default {
    name:'content',
    components: { MusicSidebar, MusicMain }
}
</script>

<style>
#content{
    display: flex;
    width:100vw;
    height: 84vh;
}

</style>