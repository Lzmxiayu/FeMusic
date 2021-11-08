<template>
  <div id="singer-albums">
      <div v-for="al in hotAlbums" :key="al.id" class="con">
          <div class="al-cover">
              <!-- {{al.blurPicUrl}} -->
              <img :src="al.blurPicUrl">
          </div>
          <div class="al-content">
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-albums',
    data(){
        return {
            sid:'',
            hotSongs:[],
            hotAlbums:[],
        }
    },
    mounted(){
        this.sid=this.$route.params.sid
        console.log(this.sid)

        axios.get(`/artists/?id=${this.sid}`).then(            
                response => {
                this.hotAlbums=response.data.hotSongs
                  console.log('hotSong:')
                  console.log(response.data.hotSongs)
                },
                error => {
                    console.log(error)
                }
        )

        axios.get(`/artist/album/?id=${this.sid}`).then(            
                response => {
                this.hotAlbums=response.data.hotAlbums
                  console.log('album:')
                  console.log(this.hotAlbums)
                },
                error => {
                    console.log(error)
                }
        )
    },
    methods:{

    }

}
</script>

<style scoped>
#singer-albums{
    height:40%;
    width:100%;
    /* margin-left:5%; */
    /* overflow: scroll; */
    flex:10;
}
#singer-albums::-webkit-scrollbar{
    display:none;
}
.con{
    width:100%;
    height:100%;
    display:flex;
}
.con .al-cover{
    flex:2;
    background: yellow;
    height:100%;
    width:100%;
}
.al-cover img{
    width:40%;
    padding:15%;
}
.con .al-content{
    flex:4;
    background: sandybrown;
}
</style>