<template>
  <div id="song-board">
    <div class="song-info">
      <div class="song-info-left">
        <div class="song-cover">
          <img v-lazy="$store.state.playingSong.coverUrl[$store.state.playingSong.index]">
        </div>
      </div>
      <div class="song-lyric">
        <div class="one" v-for="l in songInfo.lyrics" :key="l.uid" @click="changeProgress(l)">
            <p>{{l.lyric.lyric}}</p>
            <p v-if="l.tlyric!==null">{{l.tlyric.lyric}}</p>
        </div>
      </div>
    </div>
    <div class="comments">
      <h4>全部评论:</h4> 
      <div v-for="comment in songInfo.comments" class="comment" :key="comment.commentId">
        <div class="avatar">
        <img v-lazy="comment.user.avatarUrl" >
        </div>
        <div class='ct'>
          <a href="#">{{comment.user.nickname}}</a>
        <br>
        <p>{{comment.content}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {_getSongDetail,_getSongLyric,_getSongComment} from '../../../api/song'
export default {
    name:'song-board',
    data(){
      return{
          songInfo:{
            id:'',
            coverUrl:'',
            comments:[],
            lyrics:[]
          },
          angle:0,
          changeLyric:null,
          coverScroll:null
      }
    
    },
    watch:{
      '$store.state.playingSong.currentSong'(){
          this.songInfo.id=this.$store.state.playingSong.currentSong.id
          this.getCover()
          this.getComment()
          this.getLyric()
      },
      '$store.state.playingSong.isPlay'(){
        if(!this.$store.state.playingSong.isPlay){
          clearInterval(this.coverScroll)
          clearInterval(this.changeLyric)
        }else{
          this.rollingCover()
        }
      }

    },
    methods:{
      formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
            const regMin = /.*:/;
            const regSec = /:.*\./;
            const regMs = /\./;

            const min = parseInt(time.match(regMin)[0].slice(0, 2))
            let sec = parseInt(time.match(regSec)[0].slice(1, 3))
            const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
            if (min !== 0) {
              sec += min * 60
            }
            return Number(sec + '.' + ms)
        },
      changeProgress(lyric){
        this.$store.state.musicplayer.currentTime = lyric.time
      },
      getLyric(){
        this.songInfo.lyrics=[]
        //歌词获取
        _getSongLyric(this.songInfo.id).then(
            response => {
              const regNewLine = /\n/
              const lineArr = response.data.lrc.lyric.split(regNewLine)
              const tArr = response.data.tlyric.lyric.split(regNewLine)
              const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/

              const tempLyric=[]
              const tempTlyric = []

              lineArr.forEach(item => {
                if (item === '') return
                  const obj = {}
                  const time = item.match(regTime)

                  obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                  obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
                  obj.uid = Math.random().toString().slice(-6)

                  if (obj.lyric !== '') {
                    tempLyric.push(obj)
                  }

              })

              tArr.forEach(item => {
                  if (item === '') return
                    const obj = {}
                    const time = item.match(regTime)

                    obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                    obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
                    obj.uid = Math.random().toString().slice(-6)

                    if (obj.lyric !== '') {
                      tempTlyric.push(obj)
                    }
                  
              })

              if(tempTlyric.length===0){
                tempLyric.forEach(item=>{
                  this.songInfo.lyrics.push({
                      lyric:item,
                      tlyric:null
                  })              
                })
              }else{
                const pos = tempLyric.findIndex(item=>item.time === tempTlyric[0].time)
                for(let i=0;i<pos;i++){
                   this.songInfo.lyrics.push({
                    lyric:tempLyric[i],
                    tlyric:null
                 }) 
                }

                for(let i=0;i<tempTlyric.length;i++){
                    this.songInfo.lyrics.push({
                      lyric:tempLyric[i+pos],
                      tlyric:tempTlyric[i]
                    }) 

                }
              }
              this.rollingLyric()
            },  
            error => {
              // alert('请求歌曲失败')
            }
        )
      },
      //歌词滚动
      rollingLyric(){
        const lyrics = document.querySelector('.song-lyric')
        const startTime = this.songInfo.lyrics.map(one=>one.lyric.time)

        let i = startTime.findLastIndex(time=>time<=this.$store.state.currentTime)

        this.changeLyric = setInterval(()=>{
            const temp = i
            i = startTime.findLastIndex(time=>time<=this.$store.state.currentTime)  
            
            if(temp!==i){
              Array.from(lyrics.childNodes).forEach((item,index)=>{
                if(lyrics.childNodes[index].classList.contains('selected')){
                  lyrics.childNodes[index].classList.remove('selected')
                }
              })

              if(i>=0 && i<startTime.length){
                lyrics.childNodes[i].classList.add('selected')
                lyrics.scrollTo(0,lyrics.childNodes[i].offsetTop-lyrics.clientHeight/2)
              }      
            }     
        },50)
      
      },
      getCover(){
        //封面获取
        _getSongDetail(this.songInfo.id).then(
            response => {
              this.songInfo.coverUrl =response.data.songs[0].al.picUrl
            },
            error => {
              // alert('请求歌曲失败')
            }
          )
        // this.rollingCover()
      },
      //封面旋转
      rollingCover(){
          const cover = document.querySelector('.song-cover')
          this.coverScroll = setInterval(()=>{
            cover.style.transform = 'rotate('+ this.angle%360 + 'deg)'
            this.angle = (this.angle===360)?0:this.angle+1
          },60)
      },
      getComment(){
        //评论获取
        _getSongComment(0,this.songInfo.id,100).then(
          response => {	
            this.songInfo.comments=response.data.comments
          },
          error => {
          }
        )
      }
    },
    beforeDestroy(){
        clearInterval(this.coverScroll)
        clearInterval(this.changeLyric)
    }

}
</script>

<style scoped>
#song-board{
    position:absolute;
    left: 0%;
    top:0%;

    height:80vh;
    width:100%;
    overflow: scroll;
}
#song-board::-webkit-scrollbar {
    display: none;
}
.song-info{
   height:80%;
    width:60%;
    margin-right: 40%;
    display:flex;
}
.song-info .song-info-left{
  flex:6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.song-cover{
  width:250px;
  height:250px;
  border-radius: 100%;
  box-shadow:0 0 100px white;
}

.song-cover img{
  width:250px;
  height:250px;
  position:absolute;
  top:50%;
  left:50%; 
  transform: translate(-50%,-50%);
  border-radius: 100%;
  border: 30px solid black;
}


.song-info .song-lyric{
  flex:4;
  opacity:0.8;
  overflow: scroll;
  text-align: center;
  
}
.song-lyric::-webkit-scrollbar{
  display: none;
}
.one{
  margin:10px;
  font-size:13px;
}

.one:hover{
  opacity: 0.5;
}

.comments{
   width:60%;
    margin-left:20%;
    padding-top:8%;
    padding-bottom:2.5%;
}
h4{
  margin-left:5%;
}
.comment{
  width:70%;
  margin-left:5%;
  border-radius: 10px;
  margin-bottom:10px;
  padding: 1%;
  display: flex;
  font-size:5px;
}
.comment .ct{
  flex:16;
}
.comment a{
  text-decoration: none;
  font-size:14px;
}
.comment p{
  margin:0%;
  font-size:14px;
}

.comment .avatar{
  flex:2;
}
.avatar img{
  width:80%;
  border-radius:50%;
}

.selected{
  font-weight: bold;
  font-size: 18px;
}
</style>