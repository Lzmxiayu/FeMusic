<template>
  <div id="playinglist" v-show="$store.state.openlist">
        <div class="head">
            <h4>当前播放</h4>
            <button @click="clearList">清空列表</button>
        </div>
        <div class="list">
            <div v-for="song in $store.state.playingSong.songInfo" :key="song.id" class="song">
                <div class="songName" @click="PlaySong(song.id)"><p>
                    {{song.name}}
                </p></div>
                <div class="songArtist"><p>{{song.artist.name}}</p></div>
                <div class="songTime"><p>
                    {{song.duration}}
                </p></div>
               <div class="deleteSong">
                <svg @click="deleteSong(song.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
               </div> 
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'playing-list',
    data(){
        return {}
    },
    watch:{
        '$store.state.playingSong.currentSong'(){
            const currentSong = this.$store.state.playingSong.currentSong
            if(currentSong===null) return

            let songInfo = this.$store.state.playingSong.songInfo
            const index  = songInfo.findIndex(song=>song.id===currentSong.id)
            let playinglist = document.querySelector('#playinglist > .list')

            //异步添加
            setTimeout(()=>{
                //删除之前被选中元素的selected类属性
                Array.from(playinglist.children).forEach(song=>{
                song.classList.contains('selected') && song.classList.remove('selected')
                })
                //为新选中元素添加selected
                playinglist.children[index].classList.add('selected')
                playinglist=null
            })

        }
    },
    methods:{
        PlaySong(id){
            this.$store.commit('switchListSong',id)
        },
        deleteSong(id){
            const playingSong = this.$store.state.playingSong
            const index = playingSong.songInfo.findIndex(item=>item.id===id)
            playingSong.songInfo.splice(index,1)
            playingSong.coverUrl.splice(index,1)
            //删除后列表空了
            if(playingSong.songInfo.length===0){
                 this.$store.commit('clearList')
            }else if(index === playingSong.index){ //当删除的是正在播放的歌曲
                //该曲在列表末,往前一首
                if(index === playingSong.songInfo.length){
                    playingSong.index--
                }
                //改变播放音频url
                this.$store.commit('switchListSong',playingSong.songInfo[playingSong.index].id)
            }else{  //不是正在播放的，index得-1
                playingSong.index--
            }
        },
        clearList(){
            this.$store.commit('clearList')
            this.$store.state.openlist = false
            this.$store.state.openlist = true
        }
    }
}
</script>

<style scoped>
#playinglist{
  position:absolute;
  right:0%;
  bottom:0%;
  width:30%;
  height:90%;
  padding-left:2%;
  padding-right:2%;
  background: black;
  color: white;

  opacity:0.6;

  display: flex;
  flex-direction: column;
}
.head{
    flex:1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
button:hover{
    cursor: pointer;
}
.list{
    flex:8;
    display: flex;
    flex-direction: column;
}

.song{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    /* background: grey; */
}
.song p{
       margin: 0% auto;
}
.songName{
    padding: 2% auto;
    flex:4;
}
.songName:hover{
    color:red;
}
.songArtist{
align-self: center;
    flex:3;
}

.songTime{
    align-self: center;
    flex:2;
}   

.deleteSong{
    flex:1;
}

.deleteSong:hover{
    opacity:0.5;
}

.selected{
    color:rgb(232, 131, 131);
}
</style>