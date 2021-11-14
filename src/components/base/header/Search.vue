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
          if(this.$route.name === 'singlesong')
                this.$router.push({path:'/'}) //切换到根目录再回来相当于销毁原FindMusic组件
            
            this.$bus.$emit('sendtempkey',this.keyword)

            this.$store.state.keyword=this.keyword

            //注意这里用延时解决数据不更新问题
          setTimeout(()=>{
               this.$router.push({
                    // path:'/fdmc',
                    //注意这里只能用name，用path收不到参数
                    name:'singlesong',
                    params:{
                        keyword:this.keyword
                    }                         
                },)

          },2)
       
               

                    
            // console.log('切换路由中')
            // this.$bus.$emit('sendKeywords',this.keyword)
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