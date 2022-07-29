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
                <p class="songArtist">{{song.artist[0].name}}</p>
                <p class="songTime">{{song.duration}}</p>
                <svg @click="deleCollectedSong(song.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { _getSongUrl } from '../../../api/song'
export default {
    name:'song-collect',
    data(){
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
            //歌曲获取
            _getSongUrl(song.id).then(
                response => {
                    this.$store.dispatch('sendToPlay',{
                        ...response.data.data[0],
                        name:song.name,
                        artist:song.ar[0],
                        duration:this.$store.commit('correctSongTime',song.dt)
                    })
                },
                error => {
                    alert('请求歌曲失败')
                }
            )
            
        },
        deleCollectedSong(id){

            let item = localStorage.getItem('musicCollect')

            if(!item) return 
            
            item = JSON.parse(item)
            Array.isArray(item) && (
                this.songInfo = item.filter(song=>song.id!==id),
                localStorage.setItem('musicCollect',this.songInfo)
                )

            
        }
    },
    mounted(){
        let item = localStorage.getItem('musicCollect')

        if(!item) return 
        item = JSON.parse(item)


        Array.isArray(item) && (this.songInfo = item.map((song,index)=>{
            let dt = song.duration || song.dt
            if(typeof dt !== 'string'){
                dt = this.correctSongTime(dt)
            }
                
            return{
                name:song.name,
                id:song.id,
                artist:song.artists || song.ar,
                index:++index<10?('0'+index):index,
                duration:dt
            }
        }))
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
    width:93%;
    display: flex;
    color:red;
}

.song{
    display: flex;
    align-items: center;
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
.song svg{
    flex:1;
}
.song svg:hover{
    cursor: pointer;
}

</style>