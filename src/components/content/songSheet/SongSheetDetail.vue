<template>
  <div id="sgst-detail">
      <div class="sgs-header">
          <div class="sgst-ava">
            <img v-lazy="info.coverImgUrl">
          </div>
          <div class="sgst-desc">
            <h2>{{info.name}}</h2>
            <p>歌曲：{{info.trackCount}}</p>
            <p>播放：{{info.playCount}}</p>
            <p>简介：{{info.description}}</p>
          </div>
      </div>
      
        <div class="switch-header">
            <p @click="switchTo($event,0)" class="selected">歌曲列表</p>
            <p @click="switchTo($event,1)">评论</p>
        </div>


      <SSList v-show="info.tracks && choose===0" :songs="info.tracks"/>
      <SSComment v-show="comment.hotComments && comment.comments && choose===1" :comment="comment"/>



  </div>
</template>

<script>
import { _getPlaylistDetail } from '../../../api/playlist'
import {_getSongUrl} from '../../../api/song'
import {_getPlaylistComment} from '../../../api/comment'
import SSList from './SSList.vue'
import SSComment from './SSComment.vue'

export default {
  components: { SSList },
    name:'sgst-detail',
    components:{
        SSList,
        SSComment
    },
    data(){
        return {
            id:'',
            info:{},
            playlist:[],
            choose:0,
            comment:{}
        }
    },

    methods:{
        switchTo(e,type){
            this.choose = type 
            this.changeStyle(e)
        },
        changeStyle(e){
            Array.from(e.target.parentNode.children).forEach(item=>{
                if(item.classList.contains('selected'))
                    item.classList.remove('selected')
            })
            e.target.classList.add('selected')

        },
        addIndex(){
            this.info.tracks.forEach((song,index) => {
                song.index= ((index+1)<10?'0':'') + (index+1)
            });
        },
        transCount(){
            const wan=10000
            const yi = 10000*10000
            const playCount = this.info.playCount
            this.info.playCount = playCount>yi?parseInt(playCount/yi)+'亿':parseInt(playCount/wan)+'万'
        },
        SendMusic(id){
            //歌曲获取
				_getSongUrl(id).then(
				response => {
                    this.$store.dispatch('sendToPlay',response.data.data[0])
				},
				error => {
					alert('请求歌曲失败')
				}
				)
        }
    },
    mounted(){
        const id = this.$store.state.songsheet.slice(-1)[0]
        id!=null && _getPlaylistDetail(id).then(
                        res=>{
                                this.info = res.data.playlist
                                this.transCount()
                                this.addIndex()
                    })
         id!=null && _getPlaylistComment(id).then(
            res=>{
                console.log(res.data)
                this.comment = res.data
            },
            err=>{
                console.log('评论请求失败')
            }
         )

    },

}
</script>

<style scoped>
#sgst-detail{
    height:100%;
    width:94%;
    margin-left: 3%;
    overflow: scroll;
}
#sgst-detail::-webkit-scrollbar{
    display: none;
}
.sgs-header{
    height:40%;
    width: 100%;
    padding-top:1%;   
    display: flex; 
}
.sgst-ava{
    width:240px;
    height:100%;
    display:flex;
    justify-content: left;
    align-items: center;
}
.sgst-ava img{
    width:220px;
    border-radius:5px;
}
.sgst-desc{
    width:60%;
    margin:2%;
}
h2{
    margin-top:0%;
}
.switch-header{
    display: flex;
    flex-direction: row;
}
.switch-header p{
    margin-right: 4%;
}

.switch-header p:hover{
    cursor: pointer;
}

.selected{
    border-bottom: 3px solid red;
}
</style>