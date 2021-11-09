<template>
  <div id='new-albums'>
      <div class="newalbum-lists">
        
          <div v-for="newalbum in newalbums" :key="newalbum.id" 
                @click="PushNewAlbum(newalbum.id)" 
                class="newalbumLink" >
                <!-- <div class="newalbum"> -->
                     <img :src="newalbum.picUrl">
                     <h4>{{newalbum.name}}</h4>
                <!-- </div> -->
             
          </div>
          
         
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'new-albums',
    data(){
        return{
            newalbums:[],
        }
    },
    mounted(){
        axios.get('/album/newest?limit=40').then(
            response => {
                console.log(response.data.albums)
                this.newalbums=response.data.albums
                // console.log(this.artists)
            },
            error => {

            }
        )
        // this.artists=this.$route.params.artists
        // console.log(this.$route.params)
    },
    methods:{
        PushNewAlbum(id){
            // this.$router.push(
            //     {
            //         name:'MvPlayer',
            //         params:{
            //             mid:id,
            //         }
            //     }
            // )
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
    /* height:80%; */
    /* margin-left:1%; */
    /* margin-top:1%; */
    /* padding-top:0.5%; */
    border-radius: 3px;
}
.newalbumLink h4{
    /* flex:8;  */
    /* font-size:90%; */
    margin-left:2%;
    /* margin:0% auto; */
}
</style>