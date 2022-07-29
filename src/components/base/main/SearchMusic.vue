<template>
  <div id="find-music">
    <div class="search-header">
      <p @click="switchTo($event,0)" class="selected">单曲</p>
      <p @click="switchTo($event,1)">歌手 </p>
      <p @click="switchTo($event,2)">专辑</p>
      <p @click="switchTo($event,3)">视频</p>
      <p @click="switchTo($event,4)">歌单</p>
  </div>
        <song-list v-show="choose==0"/>
        <artist-list v-show="choose==1"/>
        <album-list v-show="choose==2"/>
        <videos-list v-show="choose==3"/>
        <song-sheet v-show="choose==4"/>

  </div>
</template>

<script>
import SongList from '../../content/search-content/SongList.vue'
import ArtistList from '../../content/search-content/ArtistList.vue'
import AlbumList from '../../content/search-content/AlbumList.vue'
import VideosList from '../../content/search-content/VideosList.vue'
import SongSheet from '../../content/search-content/SongSheet.vue'

export default {
    name:'find-music',
    components: { SongList,ArtistList,AlbumList,VideosList,SongSheet },
    data(){
        return {
            keyword:'',
            choose:0,
            result:{
                songs:[],
                artists:[]

            }
        }
    },
    methods:{
        switchTo(e,type){
            this.choose = type 
            this.changeStyle(e)
        },
        changeStyle(e){
            Array.from(e.target.parentNode.children).forEach(item=>{
                if(item.classList.contains('selected'))
                    item.classList.remove('selected')
            })
            e.target.classList.add('selected')

        },
    },
}   
</script>

<style scoped>
#find-music{
    height:84vh;
    width:95%;
    overflow: scroll;
    margin:1.5% auto;

}
#find-music::-webkit-scrollbar {
    display: none;
}

.search-header{
    width:100%;
    display: flex;
}

p{
    margin-right:10px;
    margin-left:20px;  
}
p:hover{
    cursor:pointer;
}


.selected{
    /* font-weight: bold; */
    border-bottom: 3px solid red;
}
</style>