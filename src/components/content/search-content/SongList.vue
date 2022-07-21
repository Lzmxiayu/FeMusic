<template>
  <div id="song-list">
      <div class="slist">
           <div  class="head" >
              <button class='songOrderT'>
                  
              </button>
              <button class="songName" type="text">
						标题 
 			  </button>
               <button class="songArtist" type="text" >
						歌手
 			  </button>
                <button class="songAlbum" type="text" >
						专辑
 			  </button>
               <button class="songTime" type="text" >
						时长
 			  </button>
            
          </div>
           
          <div v-for="song in songs" :key="song.id" class="songs">
              <button class='songOrder' >
                {{song.index}}
                
              </button>
                <div class="songLike">
                                  <love-music-button :song="song"></love-music-button>
                </div>            
              <button class="songName" type="text" v-on:click="playMusic(song.id)">
                    	{{song.name}}
                        <button v-if="song.mvid" @click.stop="PushMvBoard(`${song.mvid}`)">mv</button>
 			  </button>
               <button class="songArtist" 
               type="text" 
               @click="PushRo('SingerAlbums',song.artists[0].id)"
               >
						{{song.artists[0].name}}
 			  </button>
                <button class="songAlbum" type="text" v-on:click="PushRo">
						{{song.album.name.length>15?(song.album.name.slice(0,15)+'...'):song.album.name}}
 			  </button>
              <button class="songTime">
                {{song.duration}}
              </button>
            
          </div>
      </div>
  </div>
</template>

<script>
import { search,searchKeywords } from '../../../api/search'
import {_getSongUrl,_checkSongRoot} from '../../../api/song'
import LoveMusicButton from '../../common/button/LoveMusic.vue'
export default {
    name:'song-list',
    components:{
        LoveMusicButton
    },
    data(){
        return {
            songs:[],
            num:'0',
            permitted:true,

        }

    },
    watch:{
        //监听搜索词，搜索词改变重新搜索
        '$store.state.keyword'(){
            this.searchSongs(this.$store.state.keyword)
        }
    },
    methods:{
        // 播放音乐
        playMusic(id)
			{
                console.log(id)
				//歌曲获取
                _getSongUrl(id).then(
                    response => {
                        this.$store.dispatch('sendToPlay',response.data.data[0])
                    },
                    error => {
                        alert('请求歌曲失败')
                    }
				)
               
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
        },
        //跳转到MV面板
         PushMvBoard(mid){
          this.$router.push({
            name:'MvPlayer',
            params:{
              mid:mid
            }
          })
        },
        //搜索关键词歌曲
        searchSongs(keyword){
              searchKeywords(keyword,50).then(
                response => {
                    const collectmusic = JSON.parse(localStorage.getItem('musicCollect'))
    
                    const ids = ( collectmusic === null )?[]:collectmusic.map(song=>song.id)

                    this.songs  = response.data.result.songs.map((item,index)=>{
                        item.index = index+1
                        item.hasBeenCollected = ids.includes(item.id)
                        item.duration = this.$store.commit('correctSongTime',item.duration)
                        return item
                    })   
                },
                error => {
                    console.log('Failed')
                })
        }    
        
    },  
    created(){
        this.searchSongs(this.$store.state.keyword)
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
    font-size: 80% ;
    /* background-color: white; */
}
.songs{
    width:100%;
    margin:5px;
    height:30px;
    font-size: 70% ;
    display:flex;
    align-items: center;
}

.songOrderT{
    flex:2;
    border:none;
}

.songOrder{
    display: flex;
    flex:1;
    border:none;
}

.songLike{
    flex:1;
}
.songName{
    border:none;
    flex:8;
   text-align: left;
}
.songName:hover{
    color:rgb(238, 73, 73);
    /* cursor: pointer; */
}

.songName button{
    border-color: red;
    border-radius:5px;
    color:red;
    padding:0% 2px 0% 2px;
    opacity: 0.7;
}

.songArtist{
    border:none;
    flex:3;
     text-align: left;
    /* background: white; */
}
.songArtist:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.songAlbum
{
     text-align: left;
     border:none;
    flex:3;
}
.songTime{
    flex:2;
}
.bi-heart{
    flex:1;
}
button{
    background:none;
    border: none;
}
</style>