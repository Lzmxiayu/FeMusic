<template>
    <div id="song-collect">
        <div class="head">
            <!-- <img></img> -->
            <h2>收藏的歌曲</h2>
        </div>
        <div class="songs">
            <div class="title">
                <p class="songOrder"></p>
                <p class="songName">标题</p>
                <p class="songArtist">歌手</p>
                <p class="songTime">时长</p>
            </div>
            <div v-for="song in songInfo" :key="song.id" class="song">
                <p class="songOrder">{{song.index}}</p>
                <p class="songName" @click="sendToPlaying(song)">{{song.name}}</p>
                <p class="songArtist">{{song.artist.name}}</p>
                <p class="songTime">{{song.duration}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { _getSongUrl } from '../../../api/song'
export default {
    name:'song-collect',
    datat(){
        return {
            songInfo:[]
        }
    },
    methods:{
        //将歌曲时长转换成分秒表示
        correctSongTime(dt){
            const seconds = dt/1000
            const second = parseInt(seconds%60)
            return parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
        },
        sendToPlaying(song){
            console.log(song)
            //歌曲获取
            _getSongUrl(song.id).then(
                response => {
                    this.$store.dispatch('sendToPlay',{
                        ...response.data.data[0],
                        name:song.name,
                        artist:song.artist,
                        duration:song.duration
                    })
                },
                error => {
                    alert('请求歌曲失败')
                }
            )
            
        },
    },
    beforeMount(){
        const item = JSON.parse(localStorage.getItem('musicCollect'))
        if(item==null)  return

        this.songInfo = item.map((song,index)=>{
            console.log(song)
            return{
                name:song.name,
                id:song.id,
                artist:song.artists[0],
                index:++index<10?('0'+index):index,
                duration:this.correctSongTime(song.duration)
            }
        })
    }
}
</script>

<style scoped>
#song-collect{
    width:90%;
    height:100%;
    margin-left:5%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
}
#song-collect::-webkit-scrollbar{
    display: none;
}
.head{
    flex:2;
    position:relative;
}
.head h2{
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.songs{
    flex:8;

 
}
.title{
    display: flex;
    color:red;
}

.song{
    display: flex;
}

.songOrder{
    flex:2;
}
.songName{
    flex:5;
}
.songArtist{
    flex:3;
}
.songTime{
    flex:3;
}
</style>