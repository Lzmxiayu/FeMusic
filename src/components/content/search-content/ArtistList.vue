<template>
  <div id="artist-list">
    <div v-for="singer in singers" 
        :key="singer.id"
        @click="PushSinger(singer.id)"
        class="artist">
        <div class="s-ava">
          <img :src="singer.img1v1Url">
        </div>
        <div class="s-name">
          <h4>{{singer.name}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'artist-list',
  data(){
    return{
      keyword:'',
      singers:[],
    }
  },
  methods:{
        PushSinger(sid){
          this.$store.state.singer.push(sid)
          // console.log(this.$store.state.singer)
          // console.log(this.$store.state.singer[this.$store.state.singer.length-1])
          this.$router.push({
            name:'SingerAlbums',
            params:{
              sid:sid
            }
          })
        }
  },
  mounted(){
        // this.keyword=this.$route.params.keyword
         this.keyword=this.$store.state.keyword
         
         //获取歌手
        axios.get(`/search?keywords=${this.keyword}&type=100&limit=50`).then(
            response => {
                this.singers = response.data.result.artists        
                console.log(response.data.result.artists)
            },
            error => {
                console.log('Failed')
            })
  }
}
</script>

<style scoped>
#artist-list{
  width:90%;
  height:100%;
  margin-left:2%;
  /* height:auto; */
  overflow: scroll;
  display: flex;
  flex-direction: column;
}
#artist-list::-webkit-scrollbar{
  display: none;
}
.artist{
  width:100%;
  /* height:30%; */
  display: flex;
  margin-top:2%;
}
.artist:hover{
  background: rgb(228, 225, 225);
  cursor: pointer;
}
.s-ava{
  flex:2;
}
.s-ava img{
  /* height:40%; */
  margin-top:5%;
  width:90%;
  border-radius: 10px;
}
.s-name{
  flex:16;
}

</style>