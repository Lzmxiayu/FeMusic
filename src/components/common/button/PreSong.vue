<template>
  <div id="presong" @click="SwitchPreSong">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
    </svg>
  </div>
</template>

<script>
export default {
    name:'pre-song',
    methods:{
      SwitchPreSong(){
        // this.$emit('switchsong',-1)
        this.$store.commit('switchSong',-1)
      }
    }
}
</script>

<style scoped>
#presong{
    display: flex;
    align-items: center;
}
.bi-caret-left-fill{
    width:100%;
    height:60%;
}
</style>