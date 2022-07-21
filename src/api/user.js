import { request } from "./request";

export function _getUserDeatil(id){
    return request({
        url:'/user/detail',
        params:{
            id
        }
    })
}

export function _getUserPlaylist(id){
    return request({
        url:'/user/playlist',
        params:{
            id
        }
    })
}