<template>
  <div id="album-list">
    <div v-for="album in albums" 
        :key="album.id"
        @click="PushAlbum(album.id)"
        class="album">
        <div class="a-ava">
          <img v-lazy="album.blurPicUrl">
        </div>
        <div class="a-name">
          <h4>{{album.name}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import { search } from '../../../api/search'
export default {
  name:'album-list',
  data(){
    return{
      keyword:'',
      albums:[],
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
        PushAlbum(aid){
          this.$store.state.album.push(aid)
          this.$router.push({
            name:'AlbumDetail',
            params:{
              aid:aid
            }
          })
        },
        fetchData(){
          //获取专辑
            search(this.keyword,10,50).then(
              response => {
                  this.albums = response.data.result.albums        
                  // console.log(response.data.result.albums)
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
#album-list{
  width:90%;
  height:100%;
  margin-left:2%;
  /* height:auto; */
  overflow: scroll;
  display: flex;
  flex-direction: column;
}
#album-list::-webkit-scrollbar{
  display: none;
}
.album{
  width:100%;
  /* height:30%; */
  display: flex;
  margin-top:2%;
}
.album:hover{
  background: rgb(228, 225, 225);
  cursor: pointer;
}
.a-ava{
  flex:2;
}
.a-ava img{
  /* height:40%; */
  margin-top:5%;
  width:90%;
  border-radius: 10px;
}
.a-name{
  flex:16;
}

</style>