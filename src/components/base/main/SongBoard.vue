<template>
  <div id="song-board">
    <div class="song-info">
      <div class="song-cover">
        <img :src="songInfo.coverUrl">
      </div>
      <div class="song-lyric">
        <div class="one" v-for="l in songInfo.lyric" :key="l.uid">
            {{l.lyric}}
        </div>
      </div>
    </div>
    <div class="comments">
      <h4>全部评论:</h4> 
      <div v-for="comment in songInfo.comments" class="comment" :key="comment.commentId">
        <div class="avatar">
        <img :src="comment.user.avatarUrl" >
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
import axios from 'axios'
export default {
    name:'song-board',
    data(){
      return{
          songInfo:{
            id:'',
            coverUrl:'',
            comments:[],
            lyric:[],
          },
          // commentUser
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
          }
    },
    mounted(){
      // this.$bus.$on('sendSongInfo',)
      this.songInfo.id=this.$route.params.songInfo.id
      // console.log(this.songInfo.id)
      
      //歌词获取
				axios.get(`/lyric?id=${this.songInfo.id}`).then(
				response => {
					// this.songInfo.lyric =response.data.lrc.lyric
          const regNewLine = /\n/
          const lineArr = response.data.lrc.lyric.split(regNewLine)
          const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/

          
          lineArr.forEach(item => {
            if (item === '') return
              const obj = {}
              const time = item.match(regTime)

              obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
              obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
              obj.uid = Math.random().toString().slice(-6)
              if (obj.lyric === '') {
                console.log('这一行没有歌词')
              } else {
                this.songInfo.lyric.push(obj)
              }
            })
            // this.songInfo.lyric = lineArr
          console.log(this.songInfo.lyric)
				},
				error => {
					// alert('请求歌曲失败')
				}
				)

      //封面获取
				axios.get(`/song/detail?ids=${this.songInfo.id}`).then(
				response => {
					this.songInfo.coverUrl =response.data.songs[0].al.picUrl
          // console.log('cover')
          // console.log(this.songInfo.coverUrl)
				},
				error => {
					// alert('请求歌曲失败')
				}
				)
				//评论获取
        
				axios.get(`/comment/music?type=0&id=${this.songInfo.id}&limit=100`).then(
				response => {	
					this.songInfo.comments=response.data.comments
          console.log(response.data.comments)
				},
				error => {
					// alert('请求歌曲失败')
				}
				)

    }

}
</script>

<style scoped>
#song-board{
    height:100%;
    width:100%;
    /* padding:1% ; */
    overflow: scroll;
    /* text-align: center; */
    /* margin-left:2.5vw; */
    /* margin:2% auto; */
}
#song-board::-webkit-scrollbar {
    display: none;
}
.song-info{
   height:80%;
    width:95%;
    margin-left:2.5%;
    display:flex;
}
.song-info .song-cover{
  flex:6;
  background: rgb(231, 226, 226);
  text-align: center;
}
.song-cover img{
  width:60%;
  height:70%;
  position:relative;
  top:50%;
  left:10%; 
  margin-top:-25%;
  /* margin:0 auto; */
}

.song-info .song-lyric{
  flex:4;
  background: rgb(219, 214, 206);
  opacity:0.8;
  overflow: scroll;
  text-align: center;
  
}
.song-lyric::-webkit-scrollbar{
  display: none;
}
.one{
  margin:10px;
  color:white;
}

.comments{
   width:95%;
    margin-left:2.5%;
    padding-top:2.5%;
    padding-bottom:2.5%;
    background: papayawhip;
    /* text-align: center; */
}
h4{
  margin-left:15%;
}
.comment{
  width:70%;
  margin-left:15%;
  background: white;
  opacity:0.8;
  border-radius: 10px;
  margin-bottom:10px;
  padding: 1%;
  display: flex;
  /* font-size:5px; */
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
</style>