<template>
  <div id="music-player">
      <div class="mpHead" >
            <div class="m-img" v-if="$store.state.playingSong.songInfo.length!==0">
             <img v-lazy="coverUrl || ''" 
             @click="OpenSongBoard()" >
            </div>
            <div class="m-Name" v-if="$store.state.playingSong.songInfo.length!==0">
                <p>{{$store.state.playingSong.songInfo[$store.state.playingSong.index].name}}</p>     
                <p>{{$store.state.playingSong.songInfo[$store.state.playingSong.index].artist.name}}</p>
            </div>
      </div>

      
    <div class="mpControl">

        <div class="m-con">
            <pre-song />
            <play-pause/>
            <next-song />        
        </div>
        <div class="progress-container" @click="changePlayProgress($event)">
           <div class="progress" 
            :style="{'width':`${$store.state.progress}`}"
            >
            </div>
        </div>
    </div>
    <div class="mpList">
        <MusicPlayListButton/>
    </div>
  </div>
</template>

<script>
import MusicPlayListButton from '../../common/button/PlayingList.vue'
import PlayPause from '../../common/button/PlayPause.vue'
import PreSong from '../../common/button/PreSong.vue'
import NextSong from '../../common/button/NextSong.vue'

import {_getSongDetail} from '../../../api/song'

export default {
    name:'music-player',
    components:{
        MusicPlayListButton,
        PlayPause,
        PreSong,
        NextSong,
    },
    data(){
        return{
            progressContainer:null,
        }
    },
    computed:{
        coverUrl(){
            return this.$store.state.playingSong.coverUrl[this.$store.state.playingSong.index] 
        }  
    },
    methods:{
        OpenSongBoard(){
            let playingSong = this.$store.state.playingSong
            this.$store.state.openSongBoard = !this.$store.state.openSongBoard
            console.log(this.$store.state.openSongBoard)

        },
        changePlayProgress(e){
            const progressWidth = this.progressContainer.clientWidth
            const position = parseInt((e.offsetX/progressWidth)*100)

            //获取当前播放歌曲总时长 以秒为单位
            const duration = this.$store.state.musicplayer.duration
            this.$store.state.musicplayer.currentTime = (position/100) * duration
        }
    },
    mounted(){
        this.progressContainer = document.querySelector('.progress-container')
    },

}
</script>

<style scoped>
#music-player{
    display: flex;
    height:7vh;    
    width:100%;
}
.mpHead{
    flex:3;
    display: flex;
    align-items: center;
    padding-left: 2%;
    height: 100%;
}
.m-img{
    width:30%;
    height:100%;
    padding-top:2%;
}
.m-img img{
    width:50px;
    height:50px;
    /* width:100%; */
    border-radius:10px;
}
.m-Name{
    flex:1;
    padding:2%;
    font-size: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.m-Name p{
    margin:0% 0% 0% 0%;
}
.mpControl{
    flex:8;
    height:8vh;
}
.m-con{
    height:70%;
    width:80%;
    margin-left:10%;
    display:flex;
    justify-content: center;
    /* align-items: center; */
    font-size: 25x;
}
.m-con .likeSong{
    font-size:25px;
}


.progress-container{
    margin-left: 10%;
    width:80%;
    height:12%;
    border-radius: 10px;
    background-color:rgb(221, 220, 220);

}
.progress{
    height:100%;
    border-radius: 10px;
    background-color:red;
}
.mpList{
    flex:3;
    display: flex;
    align-items: center;
}
</style>