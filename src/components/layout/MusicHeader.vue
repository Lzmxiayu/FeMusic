<template>
  <div id="music-header">
      <logo/>
      <search/>
      <setting/>
  </div>
</template>

<script>
import Setting from '../base/header/Setting.vue'
import Logo from '../base/header/Logo.vue'
import Search from '../base/header/Search.vue'
export default {
    name:'music-header',
    components: { Logo, Search, Setting},
}
</script>

<style scoped>
#music-header{
    display: flex;
    height:8%;
}
</style>