import { request } from "./request";

export function searchKeywords(keywords,limit){
    return request({
        url:'/search',
        params:{
            keywords,limit
        }
    })
}


export function search(keywords,type,limit){
    return request({
        url:'/search',
        params:{
            keywords,type,limit
        }
    })
}