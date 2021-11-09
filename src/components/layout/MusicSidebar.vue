<template>
  <div id="music-sidebar">
    <list/>
  </div>
</template>

<script>
import List from '../base/list/List.vue'
export default {
    name:'music-sidebar',
    components:{
      List
    }
}
</script>

<style scoped>
#music-sidebar{
    grid-area: sidebar;
    background:wheat;
    /* border:grey;   */
   
}

</style>