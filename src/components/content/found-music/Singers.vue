<template>
  <div id='singers'>
      <div class="singer-lists">
          <div v-for="artist in artists" :key="artist.id" class="singerLink" @click="PushSinger(artist.id)">
              <img v-lazy="artist.img1v1Url">
              <p >{{artist.name}}</p>
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
    padding:2%;
    padding-bottom: 2%;
    height:98%;
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
    row-gap:15px;

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
    width:85%;
    height:84%;
    margin:0% auto;
    flex:15;
    border-radius: 15px;

}
.singerLink p{
    flex:3; 
    margin:0% auto;
    /* font-size:80%; */
}
</style>