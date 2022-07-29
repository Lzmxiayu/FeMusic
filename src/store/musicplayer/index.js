import store from ".."

export default {
    state:{
        progress:'0%',
        currentTime:0,
        musicplayer:null,
    },
    actions:{
        changeMusicPlayStatus(context){
            if(context.state.playingSong.isPlay)
                context.commit('pauseSong')
            else
                context.commit('playSong')
        },
        //传递播放器
        sendMusicPlayer(context,audio){
            // console.log(audio)
            context.commit('initMusicPlayer',audio)

            context.state.musicplayer.addEventListener('timeupdate',function(){
                // console.log('时间改变')
                context.commit('changeProgress')
            })
    
            context.state.musicplayer.addEventListener('loadeddata',function(){
                // console.log('加载完毕')
                context.commit('audioPlay')
            })

            context.state.musicplayer.addEventListener('ended',function(){
                //播放停止
                context.commit('switchToEnd')
            })
            
        },
    },
    mutations:{
        audioPlay(stat){
            if(stat.playingSong.isPlay===true)
                    stat.musicplayer.play()
        },
        //改变播放状态为结束
        switchToEnd(stat){
            stat.playingSong.isPlay=false
        },
        //更改进度条百分比
        changeProgress(stat){
            stat.progress = parseInt(stat.musicplayer.currentTime/stat.musicplayer.duration*100) +'%'
            stat.currentTime = stat.musicplayer.currentTime
        },
        initMusicPlayer(stat,audio){
            stat.musicplayer = audio
            console.log(audio)
            if(stat.playingSong.hasSong){
                stat.musicplayer.src = stat.playingSong.currentSong.url
                stat.musicplayer.currentTime = stat.currentTime
            }
        }

    }
}