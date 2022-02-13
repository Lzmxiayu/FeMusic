<template>
  <div id="album-detail">
      <div class="al-header">
          <div class="am-ava">
               <img :src="this.info.blurPicUrl">
          </div>
          <div class="am-desc">
           <h2>{{this.info.name}}</h2>
          </div>
      </div>
      <div class="am-songs">
          <div class="as-header">
              <p class="alsongOrder">序号</p>
              <p class="alsongName">歌名</p>
              <p class="alsongArtist">歌手</p>
              <p class="alsongAlbum">专辑</p>
              <p class="alsongTime">时长</p>
          </div>
          <div v-for="s in songs" :key="s.id" class="as-song">
              <p class="alsongOrder"></p>
              <p class="alsongName"
              @click="SendMusic(s.id)">{{s.name}}</p>
              <p class="alsongArtist"></p>
              <p class="alsongAlbum"></p>
              <p class="alsongTime"></p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'album-detail',
    data(){
        return {
            id:'',
            info:[],
            songs:[]
        }
    },
    methods:{
        getSongInfo(id){
            axios.get(`/song/detail?ids=347230`).then(
                response =>{
                    // console.log('song')
                    // console.log(response)
                },
                error =>{
                    // console.log('Failed')
                }
            )
        },
        SendMusic(id){
            //歌曲获取
				axios.get(`/song/url?id=${id}`).then(
				response => {
                     this.$bus.$emit('sendSong',response.data.data[0])	
				},
				error => {
					alert('请求歌曲失败')
				}
				)
        }
    },
    mounted(){
        // this.id=this.$route.params.aid
       this.id=this.$store.state.album[this.$store.state.album.length-1]
        // console.log(this.id)
        axios.get(`/album?id=${this.id}`).then(
            response => {
                this.info=response.data.album
                //
                this.songs=response.data.songs
                console.log(response.data.songs)
            }
        )
        this.getSongInfo(5)
    },

}
</script>

<style scoped>
#album-detail{
    height:100%;
    width:100%;
    overflow: scroll;
}
#album-detail::-webkit-scrollbar{
    display: none;
}
.al-header{
    height:40%;
    width: 100%;
    display: flex;
    
}
.am-ava{
    width:30%;
    height:100%;
    /* text-align: center; */
}
.am-ava img{
    width:70%;
    height:90%;
    /* height:60%; */
    margin-left:16%;
    margin-top:5%;

}
.am-desc{
    /* width:100%; */

}
.am-songs{
    width:90%;
    height:auto;
    margin-left:6%;
}

.as-header{
    width:100%;
    display:flex;
}
.as-header p{
    /* margin-right:10px; */
    /* margin-left:20px;   */
    /* background-color: yellow;  */
}
.as-song{
    display: flex;
}
.alsongOrder{
    flex:1;
    border:none;
}
.alsongName{
    border:none;
    flex:3;
  
}
.alsongName:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}

.alsongArtist{
    border:none;
    flex:2;
    /* background: white; */
}
.alsongArtist:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.alsongAlbum
{
     border:none;
    flex:3;
}
.alsongTime{
    flex:2;
}
</style>