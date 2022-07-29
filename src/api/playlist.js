import {request} from './request'

export function _getPlaylistDetail(id){
    return request({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}