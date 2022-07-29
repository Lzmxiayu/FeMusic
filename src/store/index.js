import Vue from 'vue'
import Vuex from 'vuex'
import theme from './theme'
import musicplayer from './musicplayer'
import playlist from './playlist'
import search from './search'
import singer from './singer'
import songSheet from './songsheet'

// import { searchKeywords } from '../api/search'

Vue.use(Vuex);

//持久化插件
function persists(store){
    let music = localStorage.getItem('music')
    console.log('初始化')
    if(music){
        store.replaceState(JSON.parse(music))
        store.state.songsheet =[] 
        store.state.musicplayer =null
        store.state.playingSong.isPlay = false
    }

    store.subscribe((mutation,state)=>{
        // console.log(state.playingSong)
        localStorage.setItem('music',JSON.stringify(state))
    })

}

export default new Vuex.Store({
    plugins:[persists],
    state:{
        value:0,
        status:true,
        user:[],
        album:[],
        openSongBoard:false,
        ...theme.state,
        ...search.state,
        ...singer.state,
        ...musicplayer.state,
        ...playlist.state,
        ...songSheet.state
    },
    actions:{
        ...search.actions,
        ...musicplayer.actions,
        ...playlist.actions
    },
    mutations:{
        ...theme.mutations,
        ...search.mutations,
        ...musicplayer.mutations,
        ...playlist.mutations
        
    },
    
})