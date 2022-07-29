import {request} from './request'

export function _getTopList(){
    return request({
        url:'/toplist',
    })
}