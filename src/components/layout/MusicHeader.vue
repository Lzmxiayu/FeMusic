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
    /* background: rgb(223, 127, 127); */
    display: flex;
}
</style>