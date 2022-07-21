<template>
  <div id="music-player">
      <!-- <button @click="OpenSongBoard" style="width:50px;">详细信息</button> -->
      <div class="mpHead">
          <div class="m-img">
             <img v-lazy="$store.state.playingSong.coverUrl[$store.state.playingSong.index]" @click="OpenSongBoard()" >
            </div>
      </div>

       <audio
        src=""
        class="myvideo"       
      >
      </audio>
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
            <!-- `${$store.state.musicplayer.currentTime/$store.state.musicplayer.duration}` -->
            <!-- ${$store.state.progress.currentTime/$store.state.progress.duration +'%'} -->
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
        NextSong
    },
    data(){
        return{
            value:0,
            currentTime:0,
            duration:1000,
            progressContainer:null,
        }
    },
    computed:{
    },
    watch:{
    },
    methods:{
        OpenSongBoard(){
            let playingSong = this.$store.state.playingSong
            
            if(playingSong.hasSong)
                this.$router.push({
                    name:'SongBoard',
                    params:{
                        songInfo:playingSong.songInfo[playingSong.index]
                    }
                } )
        },
        changePlayProgress(e){
            const progressWidth = this.progressContainer.clientWidth
            const position = parseInt((e.offsetX/progressWidth)*100)
            this.value= position +'%'
 
            //获取当前播放歌曲总时长 以秒为单位
            const duration = this.$store.state.musicplayer.duration
            this.$store.state.musicplayer.currentTime = (position/100) * duration
        }
    },
    mounted(){
        const audio = document.querySelector('.myvideo')
        this.$store.commit('sendMusicPlayer',audio)

        this.progressContainer = document.querySelector('.progress-container')

    },

}
</script>

<style scoped>
#music-player{
    display: flex;
    /* align-items: ce; */
    height:8vh;    
    width:100%;
}
.mpHead{
    flex:3;
}
.m-img{
    width:100%;
    height:100%;
    padding-top:2%;
    padding-left:10%;
}
.m-img img{
    border-radius:10px;
    height:90%;
    width:auto;
}

.mpControl{
    flex:8;
    height:8vh;
}
.m-con{
    height:70%;
    width:40%;
    margin-left:30%;
    display:flex;
    justify-content: center;
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