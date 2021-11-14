<template>
  <div id='found-music'>
      <found-header/>
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
            axios.post('/login/cellphone?phone=15360247358&password=1260937224lzm').then(
                            
                response => {
                    // console.log(response)
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
        axios.get('/top/album').then(
                            
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
    /* height:80vh; */
    height:100%;
    /* width:100%; */
    /* overflow: scroll; */
    /* margin-left:2.5vw; */
    margin:0% 2% 0% 2%;
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