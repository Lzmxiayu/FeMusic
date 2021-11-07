<template>
  <div id="search">
         <input @keyup.enter="searchSong" v-model="keyword"  class="search-box">
      </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'search',
    data(){
        return{
            keyword:'',
            songs:[]
        }
    },
    methods:{
        searchSong(){
            if(this.$route.path !== '/'){
                this.$router.push({path:'/'})
                // console.log('主界面')
            }
                
            
            this.$destroy('FindMusic')
                if(this.$route.path !== '/fdmc')
                        this.$router.push({
                            // path:'/fdmc',
                            //注意这里只能用name，用path收不到参数
                            name:'FindMusic',
                            params:{
                                keyword:this.keyword
                            }                         
                        },)
            
                    
            // console.log('切换路由中')
            this.$bus.$emit('sendKeywords',this.keyword)
            //获取数据
             
        }
    }

}
</script>

<style scoped>
#search{
    text-align: center;
    flex:2;
}
#search .search-box{
    transform: translate(0,70%); 
    height:30%;
    width:30%;

    border-radius: 10px;
    border-color: black;
    background-color:rgba(146, 108, 108,0.6);
    opacity:0.8;
}
</style>