<template>
  <div id="music-header">
      <logo/>
      <search/>
      <info/>

  </div>
</template>

<script>
import Info from '../base/header/Info.vue'
import Logo from '../base/header/Logo.vue'
import Search from '../base/header/Search.vue'
export default {
    name:'music-header',
    components: { Logo, Search, Info },

}
</script>

<style scoped>
#music-header{
    grid-area: header;
    background: rgba(255, 4, 4, 0.699);
    display: flex;
    height:10vh;
    
}
</style>