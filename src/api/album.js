import { request } from "./request";

function _getAlbum(id){
    return request({
        url:'/album',
        params:{
            id
        }
    })
}

function _getAlbumOfArtist(id){
    return request({
        url:'/artist/album',
        params:{
            id
        }
    })
}
function _getNewestAlbum(limit){
    return request({
        url:'/album/newest',
        params:{
            limit
        }
    })
}
function _getTopAlbum(area){
    return request({
        url:'/top/album',
        params:{
            area
        }
    })
}





export {_getAlbum,_getAlbumOfArtist,_getNewestAlbum,_getTopAlbum}