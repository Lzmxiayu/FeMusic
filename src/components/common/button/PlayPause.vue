<template>
  <div id="playOrPause" @click="ChangePlayStatus">
    <svg v-show="!$store.state.playingSong.isPlay" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16" >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
    </svg>
    <svg v-show="$store.state.playingSong.isPlay" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
    </svg>
  </div>
</template>

<script>
export default {
    name:'play-pause',
    methods:{
       ChangePlayStatus(){
            this.$store.dispatch('changeMusicPlayStatus')
        },
    }
}
</script>

<style scoped>
#playOrPause{
    display: flex;
    align-items: center;
    margin-left: 8%;
    margin-right: 8%;
}
.bi-play-circle{
    width:100%;
    height:70%;
}
.bi-pause-circle{
    width:100%;
    height:70%;
}

</style>