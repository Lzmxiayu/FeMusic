<template>
  <div id="song-sheet">
    <div v-for="sgsheet in sgsheets" 
        :key="sgsheet.id"
        @click="PushSongSheet(sgsheet.id)"
        class="sgsheet">
        <div class="st-ava">
          <img v-lazy="sgsheet.coverImgUrl">
        </div>
        <div class="st-name">
          <h4>{{sgsheet.name}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import { search } from '../../../api/search'
export default {
  name:'song-sheet',
  data(){
    return{
      keyword:'',
      sgsheets:[],
    }
  },
  watch:{
      //监听搜索词，搜索词改变重新搜索
      '$store.state.keyword'(){
         this.keyword=this.$store.state.keyword
         this.fetchData()
      }
  },
  methods:{
        PushSongSheet(sid){
          this.$store.state.songsheet.push(sid)
          this.$router.push({
            name:'SongSheetDetail',
          })
        },
        fetchData(){
           //获取歌手
          search(this.keyword,1000,50).then(
              response => {
                  this.sgsheets = response.data.result.playlists        
              },
              error => {
                  console.log('Failed')
              })
        }
  },
  mounted(){
      this.keyword=this.$store.state.keyword
      this.fetchData()
  }
}
</script>

<style scoped>
#song-sheet{
  width:90%;
  height:100%;
  margin-left:2%;
  /* height:auto; */
  overflow: scroll;
  display: flex;
  flex-direction: column;
}
#song-sheet::-webkit-scrollbar{
  display: none;
}
.sgsheet{
  width:100%;
  /* height:30%; */
  display: flex;
  margin-top:2%;
}
.sgsheet:hover{
  background: rgb(228, 225, 225);
  cursor: pointer;
}
.st-ava{
  flex:2;
}
.st-ava img{
  /* height:40%; */
  margin-top:5%;
  width:90%;
  border-radius: 10px;
}
.st-name{
  flex:16;
}

</style>