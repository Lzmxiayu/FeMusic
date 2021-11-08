<template>
  <div id="singer-info">
      <!-- <button @click="recmdSong">test</button> -->
      <div class="sgio-header">
          <div class="imgp">
               <img :src="singerIo.coverUrl">
          </div>
         
          <div class="desc">
              {{singerIo.name}}
          </div>
      </div>
      <div class='sgio-menu'>
          <p @click="Opens('SingerAlbums',singerIo.id)" >专辑</p>
      <p @click="Opens('SingerDetails')">歌手详情</p>
      <p @click="Opens('SingerMv')">MV</p>
      <p @click="Opens('SimilarSingers')">相似歌手</p>
     
          </div>
         
      <router-view></router-view>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-info',
    data(){
        return {
        singerIo:{
            id:'',
            name:'',
            coverUrl:'',
            mvs:[],
            introduction:[],
            albums:[],
            hotSongs:[],
            similarSingers:[],

        }
    }
    },
    mounted(){
        this.singerIo.id=this.$route.params.sid
        
         axios.get(`/artist/detail/?id=${this.singerIo.id}`).then(
                            
                response => {
                  this.singerIo.coverUrl=response.data.data.artist.cover
                  this.singerIo.name=response.data.data.artist.name
                  console.log(response)
                },
                error => {
                    console.log(error)
                }
        )

    
    },
    methods:{
         recmdSong(){
        // console.log('sa')
        // /artist/desc/?id=11972054详情页
        // /artist/album
        // /artist/mv
        // /artists
    },
        Opens(name,id){
            // console.log(id)
            this.$router.push(
                {
                    name:name,
                    params:{
                        sid:id,
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
#singer-info{
    display: flex;
    flex-direction: column;
    height:100%;
    width:100%;
    overflow: scroll;
}
#singer-info::-webkit-scrollbar{
    display: none;
}

.sgio-header{
    flex:10;
    height:100%;
    width:100%;
    background: goldenrod;
    display: flex;
    /* text-align:center; */
}
.sgio-header .imgp{
    /* width:40%; */
    height:100%;
    flex:3;
    text-align: center;
    background: white;
}
img{
    height:80%;
    width:70%;
    top:10%;
    position: relative;
    /* height:80%; */
}
.desc{
    flex:6;
}

.sgio-menu{
    flex:2;
    /* margin-left:5%; */
    width:40%;
    padding:0%;
    padding-left:6%;
    padding-right:54%;
    /* background: indianred; */
    display: flex;
    border-bottom: solid 1px;
}
.sgio-menu p{
    /* flex:1; */
    /* width:10%; */
    /* width:20px; */
    margin-bottom:0%;
    font-size:100%;
    margin-right:10%;
}
.sgio-menu p:hover{
    cursor:pointer;
    color:rgb(219, 192, 141);
}

/* .temp{
    flex:10;
    background: lemonchiffon;
} */
</style>