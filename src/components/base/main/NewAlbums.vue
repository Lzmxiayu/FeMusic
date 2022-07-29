<template>
  <div id='new-albums'>
      <div class="newalbum-lists">
          <div v-for="newalbum in newalbums" :key="newalbum.id" 
                @click="PushNewAlbum(newalbum.id)" 
                class="newalbumLink" >
                     <img v-lazy="newalbum.picUrl">
                     <h5 class="al-name">{{newalbum.name}}</h5>             
          </div>
      </div>
  </div>
</template>

<script>
import {_getNewestAlbum} from '../../../api/album'
export default {
    name:'new-albums',
    data(){
        return{
            newalbums:[],
        }
    },
    mounted(){
        _getNewestAlbum(40).then(
            response => {
                this.newalbums=response.data.albums
            },
            error => {

            }
        )
    },
    methods:{
        PushNewAlbum(id){
          this.$store.state.album.push(id)
          this.$router.push({
            name:'AlbumDetail',
            params:{
              aid:id
            }
          })
        }
    }
}
</script>

<style scoped>
#new-albums{
    height:100%;
    width:100%;
    overflow: scroll;

}

#new-albums::-webkit-scrollbar{
    display: none;
}
.newalbum-lists{
    width:90%;
    height:auto;
    margin-left:3%;
    margin-top:2%;
    margin-bottom:2%;
    display: flex;
    flex-direction: column;
   
    row-gap:10px;

}
.newalbum-lists .newalbumLink{
    width:100%;
    height:20%;
    display: flex;
    background: rgba(128, 128, 128, 0.384);
}
.newalbumLink img{
    width:10%;
    border-radius: 3px;
}
.newalbumLink .al-name{

    margin-left:2%;
    margin-top:2%;
    text-align: center;

}

</style>