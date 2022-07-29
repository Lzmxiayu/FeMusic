import {request} from './request'

function _getAllMv(searchword){
    return request({
        url:'mv/all',
        params:{
            ...searchword
        }
    })
}

function _getNewestMv(){
    return request({
        url:'/mv/first?limit=7',
    })
}

function _getCM(){
    return request({
        url:'/mv/exclusive/rcmd?limit=10',
    })
}

function _getTopMv(){
    return request({
        url:'/top/mv',
    })
}

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



export {_getMvUrl,_getMvDetail,_getMvComment,_getSimiMv,_getNewMvs,_getNewestMv,_getCM,_getTopMv,_getAllMv}