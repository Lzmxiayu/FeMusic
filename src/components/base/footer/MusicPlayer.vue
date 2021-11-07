<template>
  <div id="music-player">
      <!-- <button @click="OpenSongBoard" style="width:50px;">详细信息</button> -->
      <img :src="coverUrl" @click="OpenSongBoard" style="width:50px;">
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
                    console.log(this.id)
                    console.log(response)
          
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
        console.log(this.id)
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
    /* padding-top:10px; */
}
#music-player img{
    flex:1;
    height:80%; 
    top:10%;   
    position:relative; 
    /* padding-left:10px; */
    left:5px;
    border-radius:10px;
    margin-right:10px;  
    /* padding-top:10px; */
    /* margin-top: 10%; */
}
audio{
    /* width:80%; 
    margin-top:10%;
     height:100%; */
     flex:18;
}
</style>