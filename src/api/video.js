import {request} from './request'

function _getMvUrl(id){
    return request({
        url:'/mv/url',
        params:{
            id
        }
    })
}

function _getMvDetail(mvid){
    return request({
        url:'/mv/detail',
        params:{
            mvid
        }
    })
}

function _getMvComment(id){
    return request({
        url:'/comment/mv',
        params:{
            id
        }
    })
}

function _getSimiMv(mvid){
    return request({
        url:'/simi/mv',
        params:{
            mvid
        }
    })
}

function _getNewMvs(limit){
    return request({
        url:'/mv/first',
        params:{
            limit
        }
    })
}



export {_getMvUrl,_getMvDetail,_getMvComment,_getSimiMv,_getNewMvs}