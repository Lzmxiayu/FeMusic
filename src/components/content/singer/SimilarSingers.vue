<template>
  <div id="singer-similar">
      
        <div v-for="sg in simisg" :key="sg.id" @click="PushSg(sg.id)" class="simi-con">
          <div class="sr-cover">
              <!-- img1v1Url -->
             <img  :src="sg.img1v1Url">
          </div>
            <div class="simi-name">
                {{sg.name}}
          </div>

          </div>
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-similar',
    data(){
        return{
            simisg:[],
        }
    },
    mounted(){
        axios.get(`/simi/artist?id=${this.$route.params.sid}`).then(
            response => {
                console.log(response.data)
                this.simisg =response.data.artists
            }
        )
    },
    methods:{
        PushSg(id){
            // this.$router.push({path:'/'})
            this.$bus.$emit('senSingerId',id)
            this.$router.push(
                {
                    name:'SingerAlbums',
                    params:{
                        sid:id
                    }
                }
            )
        }
    }

}
</script>

<style scoped>
#singer-similar{
    /* height:40%; */
    /* overflow: scroll; */
    flex:10;
    /* margin-top:20px; */
    margin-bottom: 5%;
    margin-left:5%;
      display:grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    /* grid-row-gap:10px; */
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
    /* margin:5px; */
    /* margin-left:5%; */
  
}
.simi-con:hover{
    cursor: pointer;
}
 .sr-cover{
    height:80%;
    width:90%;
    /* margin:4%; */
} 
.sr-cover img{
    width:100%;
}
.simi-name{
    margin:0% auto;
}
</style>