import {request} from './request'

export function _getPlaylistComment(id){
    return request({
        url:'/comment/playlist',
        params:{
            id,
            limit:50
        }
    })
}