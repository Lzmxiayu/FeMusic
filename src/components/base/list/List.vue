<template>
  <div id="list">
      <button class="list-choice" @click="ChangeRoute('NewSongs')"><p>最新音乐</p></button>
      <button class="list-choice" @click="ChangeRoute('newMvs')">最新MV</button>
      <button class="list-choice" @click="ChangeRoute('Singers')" >歌手</button>
      <button class="list-choice" @click="ChangeRoute('NewAlbums')">最新专辑</button>
      <button class="list-choice" @click="ChangeRoute('SongCollect')">收藏歌曲</button>
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
    display: flex;
    flex-direction: column;
    /* overflow:scroll; */
}
.list-choice{
  height:10%;
  margin-left:10%;
  background: none;
  border:none;
  text-align:left;
  font-size: 15px;
}
.list-choice:hover{
  color:rgb(109, 109, 220);
  /* 显示小手 */
  cursor:pointer;
}
</style>