<template>
  <div id="search-header">
      <p @click="PushRo('singlesong')">单曲</p>
      <p @click="PushRo('Artist')">歌手 </p>
      <p @click="PushRo('Album')">专辑</p>
      <p @click="PushRo('Video')">视频</p>
      <p @click="PushRo('SongSheet')">歌单</p>
      <p @click="PushRo('UserList')">用户</p>
  </div>
</template>

<script>
export default {
    name:'search-header',
    data(){
        return{
            result:{
                key:'',
                 songs:''
            }

        }
    },
    mounted(){
        this.$bus.$on('sendKey',(key)=>{   
            this.result.key=key
       })
    },
    methods:{
        PushRo(name){
            this.$router.push({
                // path:'/fdmc'+path,
                //注意这里只能用name，用path收不到参数
                name:name,
                params:{
                   keyword: this.result.key
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