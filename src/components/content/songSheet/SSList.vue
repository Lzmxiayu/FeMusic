<template>
  <div id="ss-list">
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
        <div  v-for="song in songs" :key="song.id" class="songs">
              <button class='songOrder' >
                {{song.index}}
                
              </button>
                <div class="songLike">
                        <love-music-button :song="song"></love-music-button>
                </div>            
              <button class="songName" type="text" v-on:click="playMusic(song)">
                    {{song.name}}
                    <button class='mv-button' v-if="song.mvid" @click.stop="PushMvBoard(`${song.mvid}`)">mv</button>
 			  </button>
               <button class="songArtist" 
               type="text" 
               @click="PushRo('SingerInfo',song.artists[0].id)"
               >
						{{song.ar[0].name}}
 			  </button>
                <button class="songAlbum" type="text" v-on:click="PushRo">
						{{song.al.name.length>15?(song.al.name.slice(0,15)+'...'):song.al.name}}
 			  </button>
              <button class="songTime">
                {{correctSongTime(song.dt)}}
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
    name:'ss-list',
    components:{
        LoveMusicButton
    },
    props:['songs'],
    data(){
        return {
            // songs:[],
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
         //将歌曲时长转换成分秒表示
        correctSongTime(dt){
            const seconds = dt/1000
            const second = parseInt(seconds%60)
            return parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
        },
        // 播放音乐
        playMusic(song)
			{
				//歌曲获取
                _getSongUrl(song.id).then(
                    response => {
                        this.$store.dispatch('sendToPlay',{
                            ...response.data.data[0],
                            name:song.name,
                            artist:song.ar[0],
                            duration:correctSongTime(song.dt)
                        })
                    },
                    error => {
                        alert('请求歌曲失败')
                    }
				)
               
			},
        // 跳转到歌手页
        PushRo(name,id){
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
        
    },  
}
</script>

<style scoped>
#ss-list{
    width:100%;
    font-size:20px;
    /* overflow: scroll; */
}
#ss-list::-webkit-scrollbar{
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
.songs .songName:hover{
    color:rgb(238, 73, 73);
    /* cursor: pointer; */
}

.mv-button{
    border:1px solid;
    border-color: red;
    border-radius:5px;
    color:red;
    padding:0% 2px 0% 2px;
    opacity: 0.7;
}
.songs .mv-button:hover{
    cursor: pointer;
}

.songArtist{
    border:none;
    flex:3;
     text-align: left;
    /* background: white; */
}
.songs .songArtist:hover{
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