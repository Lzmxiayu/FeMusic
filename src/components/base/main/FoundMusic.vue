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