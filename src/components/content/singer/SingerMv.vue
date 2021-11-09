<template>
  <div id="singer-mv">
      
          <div class="sg-con" v-for="mv in mvs " :key="mv.id">
                <div  class="sgmv-cover">
                    <img :src="mv.imgurl">
                </div>
                <div class="sgmv-name">
                {{mv.name}}
                </div>
          </div>
      
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-mv',
    data(){
        return{
            mvs:[],
        }
    },
    mounted(){
        axios.get(`/artist/mv?id=${this.$route.params.sid}`).then(
            response => {
                this.mvs=response.data.mvs
                // console.log(response.data.mvs)
            },
            error => {
                console.log('Failed')
            }
        )
        axios.get(`/mv/url?id=14423239`).then(
            response => {
                // console.log(response)
            },
            error => {
                console.log('Failed')
            }
        )

    }

}
</script>

<style scoped>
#singer-mv{
    min-height:40%;
    width:95%;
    margin-left:5%;
    margin-bottom:5%;
    /* overflow: scroll; */
    flex:10;

    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}
#singer-mv::-webkit-scrollbar{
    display: none;
}
.sg-con{
     height:80%;
    width:90%;
    text-align: center;
     margin:4%;
     margin-top:10%;
}
.sg-con:hover{
    cursor: pointer;
}
.sgmv-cover{
    height:90%;
    width:100%;
}
.sgmv-cover img{
    width:100%;
    height:90%;
    border-radius: 3px;
}
.sgmv-name{
    width:90%;
    margin:0% auto;
    /* margin-top:5px; */
}
</style>