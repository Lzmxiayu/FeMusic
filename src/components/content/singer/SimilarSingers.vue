<template>
  <div id="singer-similar">
      
        <div v-for="sg in simisg" :key="sg.id" @click="PushSg(sg.id)" class="simi-con">
          <div class="sr-cover">
             <img  v-lazy="sg.img1v1Url">
          </div>
            <div class="simi-name">
                {{sg.name}}
          </div>

          </div>
     
  </div>
</template>

<script>
import { _getSimilarArtists } from '../../../api/artist'
export default {
    name:'singer-similar',
    data(){
        return{
            sid:'',
            simisg:[],
        }
    },
    watch:{
        '$store.state.singer.length'(){
           this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
            _getSimilarArtists(this.sid).then(
                response => {
                    this.simisg =response.data.artists
                }
            )
        }
    },
    mounted(){
        this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
        _getSimilarArtists(this.sid).then(
            response => {
                this.simisg =response.data.artists
            }
        )
    },
    methods:{
        PushSg(id){
            this.$store.state.singer.push(id)
        }
    }

}
</script>

<style scoped>
#singer-similar{
    width:100%;
    display:grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
}
#singer-similar::-webkit-scrollbar{
    display: none;
}
.simi-con{
    height:100%;
    width:90%;
    text-align: center;
    margin:4%;
    margin-top:10%;

}
.simi-con:hover{
    cursor: pointer;
}
 .sr-cover{
    height:80%;
    width:90%;
} 
.sr-cover img{
    width:100%;
    border-radius:8px;
}
.simi-name{
    margin:0% auto;
}
</style>