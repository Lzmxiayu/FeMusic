<template>
  <div id="search-header">
      <p @click="PushRo('singlesong')">单曲</p>
      <p @click="PushRo('Artist')">歌手 </p>
      <p >专辑</p>
      <p>视频</p>
      <p>歌单</p>
  </div>
</template>

<script>
export default {
    name:'search-header',
    data(){
        return{
            result:{
                 songs:''

            }

        }
    },
    mounted(){
        this.$bus.$on('sendSongs',(songs)=>{   
            this.result.songs=songs.slice(0,25)
       })
    },
    methods:{
        PushRo(path){
            this.$router.push({
                // path:'/fdmc'+path,
                //注意这里只能用name，用path收不到参数
                name:path,
                params:{
                   songs: this.result.songs
                }
            },)

        }
    }
}
</script>

<style scoped>
#search-header{
    width:100%;
    display: flex;
    /* padding-left:10px; */
}
p{
    margin-right:10px;
    margin-left:20px;  
    /* background-color: yellow;  */
}
p:hover{
    cursor:pointer;
}
</style>