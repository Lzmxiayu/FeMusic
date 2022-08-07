<template>
  <div id="singer-albums">
      <div class="con">
          <div class="al-cover">
              <img src="../../../assets/top50.png">
          </div>
          <div class="al-content">
              <div v-for="song in this.showSongs" :key="song.id" class="al-song">
                <button  class='al-songOrder'>
                    {{song.index}}
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg>
              <button @click="playMusic(song)" class="al-songName" type="text" >
                    	{{(song.name.length>20)?song.name.slice(0,20)+'...':song.name}}
 			  </button>
                <button class="al-songTime" type="text" >
						{{song.dt}}
 			  </button>
              </div>
              <div class="moreSong" @click="showMore">
                   
                <p>{{tip}}</p>
                </div>

          </div>
      </div>
      <div v-for="al in this.alSongs" :key="al.id" class="con">
          <div class="al-cover">
              <img v-lazy="al.blurPicUrl">
          </div>
          <div class="al-content">
              <div v-for="song in al.songs" :key="song.id" class="al-song">
                   <button  class='al-songOrder'>
                       {{song.index[0]=='0'?song.index.slice(1):song.index}}
                    </button>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg> -->
                     <button @click="playMusic(song)" class="al-songName" type="text" >
                    	{{(song.name.length>20)?song.name.slice(0,20)+'...':song.name}}
 			         </button>
               
                <button class="al-songTime" type="text" >
						{{song.dt}}
 			  </button>
              </div>
              <div v-if="al.length>10" class="moreSong">
                <p>查看更多....</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {_getSongUrl,_getSongDetail} from '.././../../api/song'
import {_getAlbum,_getAlbumOfArtist} from '.././../../api/album'
import { _getArtists } from '../../../api/artist'
export default {
    name:'singer-albums',
    data(){
        return {
            sid:'',
            hotSongs:[],
            tip:'显示全部',
            showSongs:[],
            alSongs:[],
            albumSongs:[],
            details:[]
        }
    },
    watch:{
        '$store.state.singer.length'(){
            this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
            this.getSimilar()
            this.getAlbumOfArtist()
        }

    },
    mounted(){
        this.sid=this.$store.state.singer[this.$store.state.singer.length-1]     
        this.getSimilar()
        this.getAlbumOfArtist()
    },
    methods:{
        //播放音乐
        playMusic(song){
            _getSongUrl(song.id).then(
				response => {
                    this.$store.dispatch('sendToPlay',{
                        ...response.data.data[0],
                        duration:song.dt,
                        name:song.name,
                        artist:song.ar[0]
                    })
				},
				error => {
					alert('请求歌曲失败')
				}
			)
        },
        //热门音乐展开或收起
        showMore(){
            this.showSongs = this.showSongs.length<=10?this.hotSongs:this.hotSongs.slice(0,10)
            this.tip = this.tip === '显示全部'?'收起':'显示全部'
        },
        //获取热门歌曲
        getSimilar(){
            _getArtists(this.sid).then(            
                response => {
                    console.log(response)
                    return response.data.hotSongs.map((item,index)=>{
                        //设置歌曲索引
                        item.index = index+1
                        //获取歌曲时长
                        _getSongDetail(item.id).then(
                            res=>{
                                const seconds = res.data.songs[0].dt/1000
                                const second = parseInt(seconds%60)
                                item.dt = parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
                            }
                        )

                        return item
                    })
                   
                },
                error => {
                    console.log(error)
                }
            ).then(res=>{
                this.hotSongs = res
                this.showSongs = this.hotSongs.slice(0,10)
            })
        },
        //获取热门专辑
        getAlbumOfArtist(){
             _getAlbumOfArtist(this.sid).then(            
                response => {
                    let hotAlbums=response.data.hotAlbums
                    var songs=[]
                    for(let i=0;i<hotAlbums.length;i++)
                        {
                            this.alSongs.push(hotAlbums[i]) 
                            _getAlbum(hotAlbums[i].id).then(
                                response => {
                                    return response.data.songs.map((item,index)=>{
                                        //设置歌曲索引
                                        item.index = index+1
                                        //获取歌曲时长
                                        _getSongDetail(item.id).then(
                                            res=>{
                                                const seconds = res.data.songs[0].dt/1000
                                                const second = parseInt(seconds%60)
                                                item.dt = parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
                                            }
                                        )
                                       
                                        return item
                                    })
                                     
                                },
                                error => {
                                    console.log(error)
                                }
                            ).then(res=>{
                                hotAlbums[i].songs = res
                            })
                        }
                
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

}
</script>

<style scoped>
#singer-albums{
    width:100%;
}
#singer-albums::-webkit-scrollbar{
    display:none;
}
.con{
    width:100%;
    margin:10px;
    display:flex;
}
.con .al-cover{
    flex:2;
    height:100%;
    width:100%;
}
.al-cover img{
    width:60%;
    padding:5% 10%;
}
.con .al-content{
    flex:4;
     height:40%;
}

.al-song{
    width:90%;
    height:8%;
    margin:3px;
    display:flex;
    align-items: center;
}
.al-song:nth-child(odd){
    background:rgb(245, 241, 241);
}
.al-songOrder{
    flex:1;
    border:none;
}
.al-songName{
    border:none;
    flex:8;
}
.al-songName:hover{
    color:rgb(238, 73, 73);
    /* cursor: pointer; */
}
.al-songTime
{
     border:none;
    flex:2;
}

.moreSong{
    width:90%;
    height:8%;
    margin:3px;
    display:flex;
    justify-content: right;
    font-size:7px;
}
button{
    background: none;
}

.bi-heart:hover{
    cursor:pointer;  
}

</style>