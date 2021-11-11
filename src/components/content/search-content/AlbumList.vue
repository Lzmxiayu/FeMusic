<template>
  <div id="album-list">
    <div v-for="album in albums" 
        :key="album.id"
        @click="PushSinger(album.id)"
        class="album">
        <div class="a-ava">
          <img :src="album.blurPicUrl">
        </div>
        <div class="a-name">
          <h4>{{album.name}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'album-list',
  data(){
    return{
      keyword:'',
      albums:[],
    }
  },
  methods:{
        PushSinger(sid){
          this.$router.push({
            name:'SingerAlbums',
            params:{
              sid:sid
            }
          })
        }
  },
  mounted(){
        this.keyword=this.$route.params.keyword
         //获取歌手
        axios.get(`/search?keywords=${this.keyword}&type=10&limit=50`).then(
            response => {
                this.albums = response.data.result.albums        
                console.log(response.data.result.albums)
            },
            error => {
                console.log('Failed')
            })
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