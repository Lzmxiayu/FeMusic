<template>
  <div id="list">
      <button class="list-choice" @click="ChangeRoute('/')">发现音乐</button>
      <button class="list-choice" @click="ChangeRoute('/home')">我的主页</button>
      <button class="list-choice" @click="ChangeRoute('/lemc')" >喜欢的音乐</button>
      <button class="list-choice" @click="ChangeRoute('/pyrt')">最近播放</button>
       <button class="list-choice" @click="ChangeRoute('/clmc')">收藏歌单</button>
  </div>
</template>

<script>
export default {
    name:'list',
    methods:{
        ChangeRoute(path){
           if(this.$route.path !== path)
               this.$router.push({path:path})
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