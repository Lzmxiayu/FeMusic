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
            
            this.$bus.$on('recvtempkey',(keyword)=>{
                    this.keyword=keyword
                    //这里很重要，搞备份时要看
                    // console.log('新关键词')
                    // console.log(this.keyword)

                    this.$bus.$emit('sendKey',this.keyword) 
                })

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
    /* width:75vw; */
    width:95%;
    overflow: scroll;
    /* margin-left:2.5vw; */
    margin:1.5% auto;
    /* margin-left:1%; */
}
#find-music::-webkit-scrollbar {
    display: none;
}
</style>