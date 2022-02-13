<template>
  <div id="music-player">
      <!-- <button @click="OpenSongBoard" style="width:50px;">详细信息</button> -->
      <div class="mpHead">
          <div class="m-img">
             <img v-lazy="coverUrl" @click="OpenSongBoard()" >
            </div>
      </div>
       <audio
       autoplay
       :src="(songInfo[this.index]!==undefined)?songInfo[this.index].url:''" 
       class="myvideo"
       
      >
       <!-- controls  -->
      </audio>
    <div class="mpControl">
        <div class="m-con">
            <el-button  type="text" icon="el-icon-caret-left" @click="ChangeSong(-1)" class="prev-song"></el-button>
            <el-button type="text" icon="el-icon-video-pause" v-if="isPlay" @click="ChangePlayStatus()" class="pause-song"></el-button>
            <el-button type="text" icon="el-icon-video-play" v-if="!isPlay" @click="ChangePlayStatus()" class="play-song"></el-button>
            <el-button type="text" icon="el-icon-caret-right" @click="ChangeSong(1)" class="next-song"></el-button>
        </div>
    </div>
    <div class="mpList">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'music-player',
    data(){
        return{
            songInfo:[],
            coverUrl:'',
            id:[],
            index:-1,
            isPlay:false,
            hasSong:false
        }
    },
    watch:{
        index(){
            //封面获取
				axios.get(`/song/detail?ids=${this.id[this.index]}`).then(
                    response => {
                        this.coverUrl =response.data.songs[0].al.picUrl          
                    },
                    error => {
                        // alert('请求歌曲失败')
                    }
				)
        }
    },

    mounted(){
       this.$bus.$on('sendSong',(song)=>{
            this.songInfo.push(song)
            this.id.push(song.id)
            this.hasSong=true
            this.isPlay=true
            this.index++
       })
       this.$bus.$on('PauseSong',()=>{
           if(this.isPlay)
            this.ChangePlayStatus();
       })

         
    },
    methods:{
        OpenSongBoard(){
            // this.$bus.$emit('sendSongInfo',this.songInfo)
            if(this.hasSong)
                this.$router.push({
                    name:'SongBoard',
                    params:{
                        songInfo:this.songInfo[this.index]
                    }
                    } )
        },
        ChangePlayStatus(){
            if(this.hasSong){
                this.isPlay = !this.isPlay
                const audio = document.getElementsByClassName('myvideo');
                if(this.isPlay) audio[0].play()
                else audio[0].pause()
            }
            // return;
            
        },
        ChangeSong(flag){
            if(flag == -1 && this.index != 0)
                this.index -= 1
            else if(flag ==1 && this.index != this.songInfo.length-1)
                this.index += 1
        }

}
}
</script>

<style scoped>
#music-player{
    display: flex;
    height:100%;    
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
    height:10vh;
    text-align: center;
}
.m-con{
    height:100%;
    width:25%;
    text-align: center;
    margin-left:30%;
    display:flex;

}
.prev-song{
    flex:1;
    font-size:250%;
    color:black;
    /* background-color:none; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:0%;

} 
.prev-song:hover{
    color:rgb(214, 78, 78);
    cursor:pointer;
}
.next-song{
    font-size:250%;   
    color:black;
    flex:1; 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:0%;
}
.next-song:hover{
    color:rgb(214, 78, 78);
    cursor:pointer;
}
.play-song{
    font-size:250%;
    flex:1;
    color:black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:0%;
}
.play-song:hover{
    color:rgb(139, 139, 139);
    cursor:pointer;
}
.pause-song{
    font-size:250%;
    display: flex;
    color:black;
    align-items: center;
    justify-content: center;
    margin-left:0%;
}
.pause-song:hover{
    color:rgb(139, 139, 139);
    cursor:pointer;

}

.mpList{
    flex:3;
}
</style>