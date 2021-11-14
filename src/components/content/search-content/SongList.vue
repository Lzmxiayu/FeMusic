<template>
  <div id="song-list">
      <div class="slist">
           <div  class="head" >
              <button class='songOrder'>
                  MV
              </button>
              <button class="songName" type="text" v-on:click="playMusic(song.id)">
						歌名 
 			  </button>
               <button class="songArtist" type="text" >
						歌手
 			  </button>
                <button class="songAlbum" type="text" >
						专辑
 			  </button>
            
          </div>
           
          <div v-for="song in songs" :key="song.id" class="songs">
              <button class='songOrder'>
                  <!-- {{nu}} -->
              </button>
              <button class="songName" type="text" v-on:click="playMusic(song.id)">
                    	{{song.name}}
                        <!-- <div v-if="permitted"> -->
                           <!-- <p>jin</p> -->
                        <!-- </div> -->
 			  </button>
               <button class="songArtist" 
               type="text" 
               @click="PushRo('SingerAlbums',song.artists[0].id)"
               >
						{{song.artists[0].name}}
 			  </button>
                <button class="songAlbum" type="text" v-on:click="PushRo">
						{{song.album.name}}
 			  </button>
            
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'song-list',
    data(){
        return {
            keyword:'',
            songs:[],
            num:'0',
            permitted:true,

        }

    },
    methods:{
        // 播放音乐
        playMusic(id)
			{
				//歌曲获取
				axios.get(`/song/url?id=${id}`).then(
				response => {
					// this.songUrl = response.data.data[0].url	
					// console.log('歌曲数据：')
					// console.log(response.data)	
                     this.$bus.$emit('sendSong',response.data.data[0])	
					// this.isPlaying=true
					//注意这句放在其他地方会因url未返回而传递空的url
					// this.$bus.$emit('playMusicStatus',{songUrl:this.songUrl,isPlaying:this.isPlaying})
				},
				error => {
					// alert('请求歌曲失败')
				}
				)
                //判断是否可用
                axios.get('/check/music?id=33894312').then(
                    response => {
                        console.log(response.data.message)
                    },
                    error => {
                        console.log('Failed')
                    }
                )
				//封面获取
				// axios.get(`/song/detail?ids=${id}`).then(
				// response => {
				// 	this.musicCover =response.data.songs[0].al.picUrl
				// },
				// error => {
				// 	// alert('请求歌曲失败')
				// }
				// )
				//热评获取
				// axios.get(`/comment/hot?type=0&id=${id}`).then(
				// response => {	
				// 	this.hotComments=response.data.hotComments
				// },
				// error => {
				// 	// alert('请求歌曲失败')
				// }
				// )
				
				// this.isPlayingMv=false		
			},
        // 跳转到歌手页
        PushRo(name,id){
            // console.log(id)
             this.$store.state.singer.push(id)
           this.$router.push(
               {
                  name:name,
                  params:{
                      sid:id
                  }
               }
           )
        }
    },  
    watch:{
        ''(n,o){
            // console.log(n+'    '+o)
        }
    },
    mounted(){
        // this.keyword=this.$route.params.keyword
        this.keyword=this.$store.state.keyword
         //获取单曲
        axios.get(`/search?keywords=${this.keyword}&limit=50`).then(
            response => {
                this.songs = response.data.result.songs        
                // console.log(response.data.result.songs)
            },
            error => {
                console.log('Failed')
            })
        
        // console.log(this.songs)
    }
}
</script>

<style scoped>
#song-list{
    height:92%;
    width:100%;
    font-size:20px;
    overflow: scroll;
}
#song-list::-webkit-scrollbar{
    display: none;
}

.slist{
    /* width:100%; */
    /* display:flex; */
    flex-direction: column;
    /* height */
}
.head{
    width:100%;
    margin:5px;
    height:30px;
    display:flex;
    /* background-color: white; */
}
.songs{
    width:100%;
    margin:5px;
    height:30px;
    display:flex;
}
.songOrder{
    flex:1;
    border:none;
}
.songName{
    border:none;
    flex:8;
    /* display: flex; */
    
            /* margin: auto; */

    /* background: white; */
}
.songName:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
/* .songName .p{
    top: 0;
            left: 0;
            bottom: 0;
            right: 0;
} */
/* .songName:hover{
    opacity:0.8;
} */
.songArtist{
    border:none;
    flex:3;
    /* background: white; */
}
.songArtist:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.songAlbum
{
     border:none;
    flex:3;
}

/* .songs:hover{
    cursor:pointer;
    background:rgb(226, 224, 224);
} */
</style>