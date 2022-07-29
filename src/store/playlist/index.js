import {_getSongDetail} from '../../api/song'

export default{
    state:{
        playingSong:{
            songInfo:[],
            coverUrl:[],
            currentSong:null,
            index:-1,
            isPlay:false,
            hasSong:false
        },
        openlist:false,
    },
    actions:{ 
        sendToPlay(context,song){
            console.log(song)
            const has = context.state.playingSong.songInfo.some(item=>item.id===song.id)
            if(!has){
                //获取封面
                _getSongDetail(song.id).then(
                    response => {
                        console.log(response)
                        context.commit('SENDSONG',song)
                        context.commit('getCover',response)
                    },
                    error => {
                        console.log('请求封面失败')
                    })
            }else{
                context.commit('switchListSong',song.id)
            }
        },

    },
    mutations:{
        //加入播放列表
        SENDSONG(stat,song){
            // console.log(song)
            let playingSong = stat.playingSong
            //获取歌曲信息
            playingSong.songInfo.push(song)
            //改变状态
            playingSong.hasSong=true
            playingSong.isPlay=true
            playingSong.index++
            playingSong.currentSong = playingSong.songInfo[playingSong.index]
            //改变播放音频url
            stat.musicplayer.src = song.url
            
        },
        getCover(stat,res){
            const playingSong = stat.playingSong
            console.log(res.data.songs[0].al.picUrl)
            playingSong.coverUrl.push(res.data.songs[0].al.picUrl) 
            stat.playingSong.currentSong.coverUrl = res.data.songs[0].al.picUrl    
        },
        //切换列表中的曲子
        switchListSong(stat,id){
            console.log('列表切换歌曲')
            const index = stat.playingSong.songInfo.findIndex(song=>song.id===id)
            //改变状态
            stat.progress = '0%'
            stat.playingSong.isPlay=true
            stat.playingSong.index = index
            stat.playingSong.currentSong = stat.playingSong.songInfo[index]
            //改变播放音频url
            stat.musicplayer.src = stat.playingSong.songInfo[stat.playingSong.index].url
        },
        //清空播放列表
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
            playingSong.currentSong = playingSong.songInfo[newindex]
            playingSong.isPlay=true
            stat.musicplayer.src = playingSong.songInfo[playingSong.index].url
        },
        //打开或关闭播放列表
        switchList(stat){
            stat.openlist = !stat.openlist
        },
        //将歌曲时长转换成分秒表示
        correctSongTime(stat,dt){
            const seconds = dt/1000
            const second = parseInt(seconds%60)
            console.log(parseInt(seconds/60) + ':' + (second<10?'0'+second:second))
            return parseInt(seconds/60) + ':' + (second<10?'0'+second:second)
        }
    }
}