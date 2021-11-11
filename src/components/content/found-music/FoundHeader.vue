<template>
  <div id="search-header">
      <p @click="PushRo('')">推荐</p>
      <p>专属定制</p>
      <p @click="PushRo('Singers')">歌手</p>
      <p @click="PushRo('newMvs')">视频</p>
      <p @click="PushRo('NewAlbums')">歌单</p>
  </div>
</template>

<script>
export default {
    name:'found-header',
    data(){
        return{
            result:{
                //  songs:''
                artists:[],

            }

        }
    },
    mounted(){
        this.$bus.$on('sendArtists',(artists)=>{   
            this.result.artists=artists
            // console.log('he')
            // console.log(this.result.artists)
       })
    },
    methods:{
        PushRo(name,data){
            // console.log(data)
            this.$router.push({
                // path:'/fdmc'+path,
                //注意这里只能用name，用path收不到参数
                name:name,
                // params:{
                //    artists: this.result.artists
                // }
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