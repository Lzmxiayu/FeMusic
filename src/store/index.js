import Vue from 'vue'
import Vuex from 'vuex'
import {_getSongDetail} from '../api/song'
import { searchKeywords } from '../api/search'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        keyword:'',
        value:0,
        status:true,
        user:[],
        progress:'0%',
        musicplayer:null,
        playingSong:{
            songInfo:[],
            coverUrl:[],
            index:-1,
            isPlay:false,
            hasSong:false
        },
        singer:[],
        album:[],
        openlist:false,
        theme:'normaltheme'
    },
    actions:{
        changKeywords(context,keyword){
            context.commit('CHANGEKEYWORD',keyword)
        },
        changeMusicPlayStatus(context){
            if(context.state.playingSong.isPlay)
                context.commit('pauseSong')
            else
                context.commit('playSong')
        },
        sendToPlay(context,song){
            const has = context.state.playingSong.songInfo.some(item=>item.id===song.id)
            console.log(has)
            if(!has){
                context.commit('SENDSONG',song)
            }else{
                context.commit('switchListSong',song.id)
            }
        }
       
    },
    mutations:{
        //改变主题
        changeTheme(stat,type){
            stat.theme = type
        },
        //改变搜索词
        CHANGEKEYWORD(stat,keyword){
            stat.keyword = keyword
        },

        //传递播放器
        sendMusicPlayer(stat,audio){
            // console.log(audio)
            stat.musicplayer = audio
            stat.musicplayer.addEventListener('timeupdate',function(){
                // console.log('时间改变')
                stat.progress = parseInt(stat.musicplayer.currentTime/stat.musicplayer.duration*100) +'%'
            })
    
            stat.musicplayer.addEventListener('loadeddata',function(){
                // console.log('加载完毕')
                stat.musicplayer.play()
            })

        },
        //加入播放列表
        SENDSONG(stat,song){
            let playingSong = stat.playingSong
            //获取歌曲信息
            playingSong.songInfo.push(song)
            //改变状态
            playingSong.hasSong=true
            playingSong.isPlay=true
            playingSong.index++
            //改变播放音频url
            stat.musicplayer.src = song.url
            //获取封面
            _getSongDetail(song.id).then(
                response => {
                    console.log(response.data.songs[0].al.picUrl)
                    playingSong.coverUrl.push(response.data.songs[0].al.picUrl)        
                },
                error => {
                    alert('请求封面失败')
                }
            )
          
        },
        //切换列表中的曲子
        switchListSong(stat,id){
            console.log('列表切换歌曲')

            const index = stat.playingSong.songInfo.findIndex(song=>song.id===id)
            //改变状态
            stat.progress = '0%'
            stat.playingSong.isPlay=true
            stat.playingSong.index = index
            //改变播放音频url
            stat.musicplayer.src = stat.playingSong.songInfo[stat.playingSong.index].url
        },
        //清空列表
        clearList(stat){
            stat.playingSong.songInfo.length=0
            stat.playingSong.index =-1
            stat.playingSong.coverUrl.length = 0
            stat.playingSong.isPlay =false
            stat.playingSong.hasSong = false
            stat.musicplayer.src=''
            stat.progress = '0%'
        },
        //暂停歌曲
        pauseSong(stat){
            stat.playingSong.isPlay = false
            stat.musicplayer.pause()    
        },
        //播放歌曲
        playSong(stat){
            let playingSong = stat.playingSong
            if(playingSong.hasSong){
                playingSong.isPlay = true
                stat.musicplayer.play()
            }
        },
        //切歌
        switchSong(stat,num){
            let playingSong = stat.playingSong
            let newindex = playingSong.index + num 

            //新索引小于0或大于等于列表长度时处理
            if(newindex<0) 
                newindex=playingSong.songInfo.length-1
            if(newindex>=playingSong.songInfo.length)
                newindex=0

            //改变状态，当前索引和播放源        
            stat.progress = '0%'
            playingSong.index = newindex
            playingSong.isPlay=true
            stat.musicplayer.src = playingSong.songInfo[playingSong.index].url
            setTimeout(()=>{stat.musicplayer.play()},20)
            
        },
        //打开或关闭播放列表
        switchList(stat){
            stat.openlist = !stat.openlist
        },
        //将歌曲时长转换成分秒表示
        correctSongTime(stat,dt){
            const seconds = dt/1000
            const second = parseInt(seconds%60)
            return parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
        }
    },
    
})