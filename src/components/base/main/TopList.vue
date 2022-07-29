<template>
  <div id="top-list">
    <h2>官方榜</h2>
    <div v-for="t in list.slice(0,4)" :key="t.id" class="tpl" >
        <div class="tpl-img">
            <img v-lazy="t.coverImgUrl" @click="OpenSheet(t)">
        </div>
        <div  class="tpl-songs">
            <div v-for="sg in t.tracks" :key="sg.index" class="tpl-song">
            <p>{{sg.index}}</p>
               <p @click="sendToplay(sg)">{{sg.name}}</p> 
               <p>{{sg.ar[0].name}}</p> 
            </div>
        </div>
    </div>
    <h2>全球榜</h2>
    <div class="global-list">
        <div v-for="l in list.slice(4)" :key="l.id" class="list-item">
            <img v-lazy="l.coverImgUrl" @click="OpenSheet(l)">
            {{l.name}}
        </div>
    </div>

  </div>
</template>

<script>
import { _getTopList } from '../../../api/toplist'
import { _getPlaylistDetail } from '../../../api/playlist'
import { _getSongUrl } from '../../../api/song'

export default {
    name:'top-list',
    data(){
        return {
            list:[],
            songs:['1','2','1','2','1','2'],
        }
    },
    methods:{
        getPlaylistDetail(){
            this.list.slice(0,4).forEach((item,index)=>{
                _getPlaylistDetail(item.id).then(
                    res=>{
                        this.list[index].tracks= res.data.playlist.tracks.slice(0,6) 
                        this.list[index].tracks.forEach((item,inx)=>{
                            item.index = inx+1
                        })
                    }
                )
            })
        },
        OpenSheet(sheet){
            this.$store.state.songsheet.push(sheet.id)
            this.$router.push({
                name:'SongSheetDetail'
            })
        },
        sendToplay(song){
             //歌曲获取
            _getSongUrl(song.id).then(
                response => {
                    this.$store.dispatch('sendToPlay',{
                        ...response.data.data[0],
                        name:song.name,
                        artist:song.ar[0],
                        duration:song.duration
                    })
                },
                error => {
                    alert('请求歌曲失败')
                }
            )
        }
  
    },
    mounted(){
        _getTopList().then(
            res=>{
                this.list = res.data.list
                this.flist = res.data.list.slice(0,4).map(item=>{
                    return item.id
                })

                this.getPlaylistDetail()                 
            }
        )
    }
}
</script>

<style scoped>
#top-list{
    padding-top:1%;
    height:98%;
    width:100%;
    overflow: scroll;
}
#top-list::-webkit-scrollbar{
    display: none;
}
h2{
    margin-left: 10%;
}

.tpl{
    width:80%;
    margin-left: 10%;
    margin-bottom: 3%;
    display: flex;
}
.tpl-img{
    width:200px;
    height:200px;
}
.tpl-img img{
    border-radius: 5px;
    margin-top:15px;
    margin-left:15px;
    width:175px;
    height:175px;
}
.tpl-songs{
    flex:1;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}
.tpl-song{
    flex:1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 5%;
}
.tpl-song > p{
    width:35%;
    margin:0% 30% 0% 0%;
}
.tpl-song > p:first-child{
    width:10%;
    margin:0% 0% 0% 0%;
}

.tpl-song > p:last-child{
    float: right;
    width:35%;
    margin:0% 0% 0% 0%;
}

.global-list{
    width:80%;
    margin-left: 10%;
    flex-wrap: wrap;
    display: flex;
}

.list-item{
    width:20%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    align-items: center;
}

.list-item img{
    border-radius: 5px;
    width:80%;
    margin-bottom: 5%;
}

</style>