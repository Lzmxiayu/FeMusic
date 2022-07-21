<template>
  <div id="singer-info">
      <!-- <button @click="recmdSong">test</button> -->
      <div class="sgio-header">
          <div class="imgp">
               <img :src="singerIo.coverUrl">
          </div>
         
          <div class="desc">
              <h2>{{singerIo.name}}</h2>
              <p>{{singerIo.briefDesc}}</p>
          </div>
      </div>
      <div class='sgio-menu'>
        <p @click="Opens('SingerAlbums',singerIo.id)" >专辑</p>
        <p @click="Opens('SingerDetails',singerIo.id)">歌手详情</p>
        <p @click="Opens('SingerMv',singerIo.id)">MV</p>
        <p @click="Opens('SimilarSingers',singerIo.id)">相似歌手</p>     
      </div>
         
      <router-view></router-view>

  </div>
</template>

<script>
import {_getDetailOfArtist,_getDescOfArtist} from '../../../api/artist'
export default {
    name:'singer-info',
    data(){
        return {
        singerIo:{
            id:'',
            name:'',
            coverUrl:'',
            mvs:[],
            briefDesc:'',
            introduction:[],
            albums:[],
            hotSongs:[],
            similarSingers:[],

        }
    }
    },
    watch:{

    },
     methods:{
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
    },
        getInfo(id){
            _getDetailOfArtist(id).then(        
                response => {
                  this.singerIo.coverUrl=response.data.data.artist.cover
                  this.singerIo.name=response.data.data.artist.name
                },
                error => {
                    console.log(error)
                }       
        )
            _getDescOfArtist(id).then(
                    response =>{
                    this.singerIo.briefDesc = response.data.briefDesc
                }
            )

        }
    },
    mounted(){

        //通过路由切换时
        // this.singerIo.id=this.$route.params.sid
         this.singerIo.id=this.$store.state.singer[this.$store.state.singer.length-1]
       
          //通过相似歌手切换时
        this.$bus.$on('senSingerId',(id)=>{
             this.singerIo.id=this.$store.state.singer[this.$store.state.singer.length-1]
            // this.singerIo.id=id
            this.getInfo(this.singerIo.id)
        })
         this.getInfo(this.singerIo.id)

    },
   
}
</script>

<style scoped>
#singer-info{
    /* display: flex; */
    /* flex-direction: column; */
    height:100%;
    width:100%;
    overflow: scroll;
}
#singer-info::-webkit-scrollbar{
    display: none;
}

.sgio-header{
    /* flex:1; */
    height:40%;
    flex:10;
    width:100%;
    /* background: goldenrod; */
    display: flex;
    /* text-align:center; */
}
.sgio-header .imgp{
    width:40%;
    height:100%;
    flex:3;
    text-align: center;
    /* background: white; */
}
img{
    /* height:80%; */
    width:60%;
    margin-top:10%;
    border-radius:15px;
    /* height:80%; */
}
.desc{
    flex:6;
    margin-top:2%;
}
.desc h2{
    /* margin:10px; */
    margin:0% auto;
}
.desc p{
    font-size:80%; 
    overflow: scroll;
    height:78%; 
    width:90%;
}
p::-webkit-scrollbar{
    display: none;
}

.sgio-menu{
    height:10%;
    width:100%;
    padding:0%;
    padding-left:6%;
    padding-right:54%;
    display: flex;
    border-bottom: solid 1px;
}
.sgio-menu p{
   margin-right:5%;
   margin-top:5%;
   margin-bottom: 0;
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