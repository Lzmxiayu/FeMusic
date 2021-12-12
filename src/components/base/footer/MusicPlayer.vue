<template>
  <div id="music-player">
      <!-- <button @click="OpenSongBoard" style="width:50px;">详细信息</button> -->
      <div class="m-img">
             <img v-lazy="coverUrl" @click="OpenSongBoard" >
      </div>
       <audio
       autoplay
       :src="songInfo.url"
      controls
      >
      </audio>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'music-player',
    data(){
        return{
            songInfo:{},
            coverUrl:'',
            id:'32102655',
        }
    },
    watch:{
        songInfo(){
            //封面获取
				axios.get(`/song/detail?ids=${this.id}`).then(
				response => {
					this.coverUrl =response.data.songs[0].al.picUrl
                    // console.log(this.id)
                    // console.log(response)
          
				},
				error => {
					// alert('请求歌曲失败')
				}
				)
        }
    },

    mounted(){
       this.$bus.$on('sendSong',(song)=>{
        //    console.log(songUrl)
        this.songInfo=song
        this.id=song.id
        // console.log('musicplayer')
        // console.log(this.id)
       })
         
    },
    methods:{
        OpenSongBoard(){
            // this.$bus.$emit('sendSongInfo',this.songInfo)
            this.$router.push({
                name:'SongBoard',
                params:{
                    songInfo:this.songInfo
                }
                } )
        }

}
}
</script>

<style scoped>
#music-player{
    display: flex;
    height:100%;    
    width:100%;
    /* padding-top:10px; */
}
.m-img{
    height:100%;
    width:8%;
    /* padding-left:0.5%; */
    /* padding-right:0.5%; */
    /* display: 2; */
}
.m-img img{
    /* flex:1;     */
    border-radius:10px;
    /* margin:3px;   */
    height:80%;
    /* width:80%; */
    margin-top: 6%;
    margin-left:16%;
}
audio{
    /* width:80%;  */
   /* margin-top:10%;
     height:100%; */
     /* flex:20; */
}
</style>