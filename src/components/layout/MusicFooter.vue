<template>
  <div id="music-footer">
      <audio
      controls
      >
      </audio>
  </div>
</template>

<script>
export default {
    name:'music-footer',
}
</script>

<style scoped>
#music-footer{
    grid-area: footer;
    background: grey;
    padding:0%;
}
audio{
    width:100%;
    /* margin-top:10%; */
    /* height:100%; */
}
</style>