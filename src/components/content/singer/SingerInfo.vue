<template>
  <div id="singer-info">
      <div class="sgio-header">
          <div class="imgp">
               <img v-lazy="singerIo.coverUrl"> 
          </div>
         
          <div class="desc">
              <h2>{{singerIo.name}}</h2>
              <p>{{singerIo.briefDesc}}</p>
          </div>
      </div>
      <div class='sgio-menu'>
        <p @click="Opens(0)" >专辑</p>
        <p @click="Opens(1)">歌手详情</p>
        <p @click="Opens(2)">MV</p>
        <p @click="Opens(3)">相似歌手</p>     
      </div>
        <div class="sgio-item">
            <SingerAlbums v-show="cate===0"/>
            <SingerDetails v-show="cate===1"/>
            <SingerMv v-show="cate===2"/>
            <SimilarSingers v-show="cate===3"/>
        </div>

  </div>
</template>

<script>
import SingerAlbums from './SingerAlbums.vue'
import SingerDetails from './SingerDetails.vue'
import SingerMv from './SingerMv.vue'
import SimilarSingers from './SimilarSingers.vue'

import {_getDetailOfArtist,_getDescOfArtist} from '../../../api/artist'

export default {
    name:'singer-info',
    components:{SingerAlbums,SingerDetails,SingerMv,SimilarSingers},
    data(){
        return {
            cate:0,
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
        '$store.state.singer.length'(){
           this.singerIo.id=this.$store.state.singer[this.$store.state.singer.length-1]
         this.getInfo(this.singerIo.id)
        }

    },
     methods:{
        Opens(type){
            this.cate = type
        },
        getInfo(id){
            _getDetailOfArtist(id).then(        
                response => {
                    console.log(response)
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
         this.singerIo.id=this.$store.state.singer[this.$store.state.singer.length-1]
         this.getInfo(this.singerIo.id)
    },
   
}
</script>

<style scoped>
#singer-info{
    height:100%;
    width:100%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
}
#singer-info::-webkit-scrollbar{
    display: none;
}

.sgio-header{
    width:96%;
    height:40%;
    padding-left: 2%;
    display: flex;
}
.sgio-header .imgp{
    flex:2;
    display: flex;
    height:100%;
    justify-content: center;
    align-items: center;
    position:relative;

}
img{
    width:80%;
    /* height:20SimilarSingers0px; */
    border-radius:15px;
}
.desc{
    flex:6;
    heigSingerMvht:96%;
    margin-top:2%;
}
.desc h2{
    margin:0% auto;
}
.desc p{
    fSingerDetailsont-size:80%; 
    overflow: scroll;
    height:78%; 
    width:90%;
}
p::-webkit-scrollbar{
    display: none;
}

.sgio-menu{
    width:30%;
    height:10%;
    padding-left:3%;
    display: flex;
    align-items: center;
}
.sgio-menu p{
    flex:1; 
    text-align:center;
    vertical-align: center;
}
.sgio-menu p:hover{
    cursor:pointer;
    color:rgb(219, 192, 141);
}
.sgio-item{
    height:50%;
}

</style>