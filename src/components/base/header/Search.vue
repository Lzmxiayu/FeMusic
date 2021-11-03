<template>
  <div id="search">
         <input value="" class="search-box">
      </div>
</template>

<script>
export default {
    name:'search'
}
</script>

<style>
#search{
    text-align: center;
    flex:2;
}
#search .search-box{
    transform: translate(0,70%); 
    height:30%;
    width:30%;

    border-radius: 10px;
    border-color: black;
    background-color:rgba(146, 108, 108,0.6);
    opacity:0.8;
}
</style>