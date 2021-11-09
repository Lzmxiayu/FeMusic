<template>
  <div id="find-music">
      <!-- <p>寻找音乐</p> -->
      <search-header></search-header>
      <router-view></router-view>
      <!-- <song-list/> -->
  </div>
</template>

<script>
import SearchHeader from '../../content/search-content/SearchHeader.vue'
import SongList from '../../content/search-content/SongList.vue'
import axios from 'axios'
export default {
    name:'find-music',
    data(){
        return {
            keyword:'',
            result:{
                songs:[],
                artists:[]

            }
        }
    },
     components: { SongList, SearchHeader },
    methods:{
        fetchData(){
            // 当是从FindMusic进入时,即重新搜索时
            if(this.$route.path === '/fdmc')
            {
             this.keyword=this.$route.params.keyword
             //获取单曲
            axios.get(`/search?keywords=${this.keyword}&limit=50`)
            .then(
                response=>{
                    this.result.songs = response.data.result.songs
                    this.$bus.$emit('sendSongs',this.result.songs) 
                    //切换到结果显示界面 
                     this.$router.push(
                        {
                        name:'singlesong',
                        params:{
                            songs:this.result.songs
                            }
                        }
                        )
                },
                error=>{
                     console.log('Failed')
                }

            )
          //获取歌手

          }
        //   console.log(this.keyword)
          this.$bus.$emit('sendSearchkey',this.keyword)
           this.$bus.$on('sendearchkey',(keyword)=>{
                console.log(keyword)
            })
          //获取备份数据
        //   this.$bus.$on('sendSearchkey',(keyword)=>{
        //       this.keyword=keyword
        //       console.log(this.keyword)
        //   })
        }
    },
    watch:{
        '$route':'fetchData'
    },
    mounted(){
        this.fetchData();
    }   

}   
</script>

<style scoped>
#find-music{
    height:75vh;
    width:75vw;
    /* overflow: scroll; */
    /* margin-left:2.5vw; */
    margin:2% auto;
}
#find-music::-webkit-scrollbar {
    display: none;
}
</style>