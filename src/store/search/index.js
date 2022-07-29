export default{
    state:{
        keyword:'',
    },
    actions:{
        changKeywords(context,keyword){
            context.commit('changKeywords',keyword)
            
        }
    },
    mutations:{
        //改变搜索词
        changKeywords(stat,keyword){
            stat.keyword = keyword
            console.log(stat)
        },
    }
}