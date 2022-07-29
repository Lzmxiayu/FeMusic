export default{
    state:{
        theme:'normaltheme'
    },
    mutations:{
         //改变主题
         changeTheme(stat,type){
            stat.theme = type
        },
    }
}