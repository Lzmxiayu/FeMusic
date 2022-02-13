<template>
  <div id='found-music'>
      <!-- <found-header/> -->
      <div >
      </div>
      <!-- <button @click="login">login</button> -->
      <!-- <button @click="recmdSong">test</button> -->
      <router-view></router-view>
 
  </div>
</template>

<script>
import axios from 'axios'
import FoundHeader from '../../content/found-music/FoundHeader.vue'
export default {
    name:'found-music',
    data(){
        return {
            // artists:[],
        }
    },
    components:{
        FoundHeader,
    },
    // mounted(){
    //      axios.get('/toplist/artist').then(
    //         response => {
    //             // console.log(response.data.list)
    //             this.artists=response.data.list.artists
    //             this.$bus.$emit('sendArtists',this.artists)
    //         },
    //         error => {

    //         }
    //     )
    // },
    methods:{
        login(){
            axios.post('/login/cellphone').then(
                            
                response => {
                    console.log(response)
                },
                error => {

                }
        )
    },
    recmdSong(){
        // console.log('sa')
        ///artist/desc/?id=11972054详情页
        //前进后退
        // window.history.back()
        // window.history.forward()
        // console.log(this.$store.state.count)
        // this.$store.state.count=546
        
        ///personalized
        // /recommend/songs
        axios.get('/login/qr/check?key=c83b4c8d-b8ad-4464-b991-74477d2c708d').then(
                            
                response => {
                    console.log(response)
                },
                error => {
                    console.log(error)
                }
        )
    }
}
}
</script>

<style scoped>
#found-music{
    height:80vh;
    width:100%;
    /* overflow: scroll; */
    /* margin-left:2.5vw; */
    padding:2% 2% 2% 2%;
    display: flex;
    flex-direction: column;
}
#found-music::-webkit-scrollbar{
    display: none;
}
.found-head{
    flex:1;
}
.found-content{
    flex:7;
}
button{
    width:50px;
}
</style>