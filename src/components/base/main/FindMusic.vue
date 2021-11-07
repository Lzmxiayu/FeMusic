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
         axios.get(`http://localhost:3000/search?keywords=${this.keyword}&limit=50`)
            .then(
                response=>{
                    console.log(response.data)
                    this.result.songs = response.data.result.songs
                    this.$bus.$emit('sendSongs',this.result.songs) 
                   
                    
                     this.$router.push(
                        {
                        name:'singlesong',
                        params:{
                            songs:this.result.songs
                            }
                        }
                        
                        )
                    
                    // console.log(this.songs)
                    
                },
                error=>{
                     console.log('Failed')
                }

            )
          //获取歌手
          axios.get
          
          
          }
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