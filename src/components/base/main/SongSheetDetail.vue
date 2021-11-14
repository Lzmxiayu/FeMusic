<template>
  <div id="sgst-detail">
      <div class="sgs-header">
          <div class="sgst-ava">
             <span>  <img :src="this.info.coverImgUrl"></span>
          </div>
          <div class="sgst-desc">
           <h2>{{this.info.name}}</h2>
           <p>歌曲：{{this.info.trackCount}}</p>
           <p>播放：{{this.info.playCount}}</p>
          </div>
      </div>
      <div class="sgst-songs">
          <div class="sgst-header">
              <p class="sgstsongOrder">序号</p>
              <p class="sgstsongName">歌名</p>
              <p class="sgstsongArtist">歌手</p>
              <p class="sgstAlbum">专辑</p>
              <p class="sgstsongTime">时长</p>
          </div>
          <div v-for="s in playlist" :key="s.id" class="sgst-song">
          
              <p class="sgstsongOrder"></p>
               <p class="sgstsongName"
              @click="SendMusic(s.id)">{{s.name}}</p>
              <p class="sgstsongArtist"></p>
              <p class="sgstAlbum"></p>
              <p class="sgstsongTime"></p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'sgst-detail',
    data(){
        return {
            id:'',
            info:[],
            playlist:[]
        }
    },
    methods:{
        getSongInfo(id){
            // for(let p=0;p<this.playlist.length;p++)
            // {
            
            // axios.get(`/song/detail/dynamic?ids=${this.id}`).then(
            //     response =>{
                 
            //         // this.playlist[p]=response.data.songs[0]
            //         // this.playlist[p].index=p+1
            //         //  console.log(response)
            //     },
            //     error =>{
            //         console.log('Failed')
            //     }
            // )
            

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
        this.id=this.$route.params.sid
    //    this.id=this.$store.state.album[this.$store.state.album.length-1]
        // console.log(this.id)
        axios.get(`/playlist/detail?id=${this.id}`).then(
            response => {
                this.info=response.data.playlist
                //这里tracks不完整，可以用所有trackIds请求一遍/song/detail
                this.playlist=response.data.playlist.tracks
                console.log(response)
                 this.getSongInfo()
            }
        )
        // /playlist/detail/dynamic
       
    },

}
</script>

<style scoped>
#sgst-detail{
    height:100%;
    width:100%;
    overflow: scroll;
}
#sgst-detail::-webkit-scrollbar{
    display: none;
}
.sgs-header{
    height:40%;
    width: 100%;
    padding-top:1%;
    /* padding-bottom: 0%; */
    /* margin:0%; */
    display: flex;
    
}
.sgst-ava{
    width:35%;
    height:100%;
    flex:3;
    display:table;
    text-align: center;
}
span{
     display:table-cell;
    vertical-align:middle;    
}
.sgst-ava img{
     width:64%;
     /* height:50%; */
    /* margin-top:3%; */
    border-radius:5px;
}
.sgst-desc{
    /* width:100%; */
    flex:7; 
    margin:2%;

}
h2{
    margin:0% auto;
}
.sgst-songs{
    width:90%;
    height:auto;
    margin-left:6%;
}

.sgst-header{
    width:100%;
    display:flex;
}
.sgst-header p{
    /* margin-right:10px; */
    /* margin-left:20px;   */
    /* background-color: yellow;  */
}
.sgst-song{
    display: flex;
}
.sgstsongOrder{
    flex:1;
    border:none;
}
.sgstsongName{
    border:none;
    /* display: flex; */
    flex:3;
}
.sgstsongName:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.sgstsongName p{
    /* margin:0% auto; */
}
.sgstsongArtist{
    border:none;
    flex:2;
    /* background: white; */
}

.sgstsongArtist:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.sgstAlbum
{
     border:none;
    flex:3;
}
.sgstsongTime{
    flex:2;
}
</style>