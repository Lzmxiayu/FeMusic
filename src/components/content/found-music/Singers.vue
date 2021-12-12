<template>
  <div id='singers'>
      <div class="singer-lists">
          <div v-for="artist in artists" :key="artist.id" class="singerLink" >
              <!-- <img :src="artist.img1v1Url"> -->
              <img v-lazy="artist.img1v1Url">
              <p @click="PushSinger(artist.id)">{{artist.name}}</p>
          </div>
          
         
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singers',
    data(){
        return{
            artists:[]
        }
    },
    mounted(){
        axios.get('/toplist/artist').then(
            response => {
                // console.log(response.data.list)
                this.artists=response.data.list.artists.slice(0,50)
                // console.log(this.artists)
            },
            error => {

            }
        )
        // this.artists=this.$route.params.artists
        // console.log(this.$route.params)
    },
    methods:{
        PushSinger(id){
             this.$store.state.singer.push(id)
            this.$router.push(
                {
                    name:'SingerAlbums',
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
#singers{
    height:100%;
    width:100%;
    overflow: scroll;

}

#singers::-webkit-scrollbar{
    display: none;
}
.singer-lists{
    width:100%;
    height:100%;
    display: grid;
    padding:0% 2% 0% 2%;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 33% 33% 33% ;
    row-gap:25px;

}
.singer-lists .singerLink{
    width:15vw;
    height:100%;
    /* margin:10% 5% 10% 5%; */
    display: flex;
    flex-direction: column;
    text-align: center;
}
.singerLink img{
    width:95%;
    height:95%;
    margin:0% auto;
    flex:19;
    border-radius: 15px;
}
.singerLink p{
    flex:1; 
    margin:0% auto;
}
</style>