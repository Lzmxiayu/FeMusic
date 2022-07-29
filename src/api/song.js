import { request } from "./request";


function _getSongUrl(id){
    return request({
        url:'/song/url',
        params:{
            id
        }
    })
}

function _getSongDetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}

function _getSongLyric(id){
    return request({
        url:'/lyric',
        params:{
            id
        }
    })
}

function _getSongComment(type,id,limit){
    return request({
        url:'/comment/music',
        params:{
            type,
            id,
            limit
        }
    })
}

function _getTopSong(type){
    return request({
        url:'/top/song',
        params:{
            type
        }
    })
}

function _checkSongRoot(id){
    return request({
        url:'/check/music',
        params:{
            id
        }
    })
}


export {_getSongUrl,_getSongDetail,_getSongLyric,_getSongComment,_getTopSong,_checkSongRoot}