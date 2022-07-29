import { request } from "./request";

function _getArtist(id){
    return request({
        url:'/artist',
        params:{
            id
        }
    })
}

function _getArtists(id){
    return request({
        url:'/artists',
        params:{
            id
        }
    })
}

function _getArtiBywords(searchword){
    return request({
        url:'/artist/list',
        params:{
            ...searchword
        }
    })
}

function _getSimilarArtists(id){
    return request({
        url:'/simi/artist',
        params:{
            id
        }
    })
}

function _getMvOfArtist(id){
    return request({
        url:'/artist/mv',
        params:{
            id
        }
    })
}

function _getDetailOfArtist(id){
    return request({
        url:'/artist/detail',
        params:{
            id
        }
    })
}

function _getDescOfArtist(id){
    return request({
        url:'/artist/desc',
        params:{
            id
        }
    })
}

function _getTopListArtist(){
    return request({
        url:'/toplist/artist',
        params:{
            // area
        }
    })
}





export {_getArtist,_getArtists,_getSimilarArtists,_getMvOfArtist,
    _getDetailOfArtist,_getDescOfArtist,_getTopListArtist,_getArtiBywords}