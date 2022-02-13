<template>
  <div id="list">
      <button class="list-choice" @click="ChangeRoute('NewSongs')">最新音乐</button>
      <button class="list-choice" @click="ChangeRoute('newMvs')">最新MV</button>
      <button class="list-choice" @click="ChangeRoute('Singers')" >歌手</button>
      <button class="list-choice" @click="ChangeRoute('NewAlbums')">最新专辑</button>
       <!-- <button class="list-choice" @click="ChangeRoute('')">收藏歌单</button> -->
  </div>
</template>

<script>
export default {
    name:'list',
    methods:{
        ChangeRoute(nam){
           if(this.$route.name !== nam)
               this.$router.push({name:nam})
        }

    }
}
</script>

<style scoped>
#list{
    height:100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    /* overflow:scroll; */
}
.list-choice{
  height:10%;
  background: none;

  border:none;
}
.list-choice:hover{
  /* background: rgb(218, 213, 213,0.4); */
  background: rgb(223, 127, 127,0.15);
  /* 显示小手 */
  cursor:pointer;
}
</style>