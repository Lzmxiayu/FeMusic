<template>
  <div id="singer-details">
      <div v-for="d in details" :key="d.ti" class="dl-con">
          <h4 class="dl-title">
              {{d.ti}}
          </h4>
          <p class="dl-content">
              {{d.txt}}
          </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-details',
    data(){
        return{
            sid:'',
            details:[],
        }
    },
    mounted(){
         this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
        axios.get(`/artist/desc?id=${this.sid}`).then(
            response =>{
                // console.log
                this.details = response.data.introduction
                // console.log(response.data)
            }
        )
    }

}
</script>

<style scoped>
#singer-details{
    /* min-height:40%; */
    width:90%;
    margin-left: 5%;
    /* overflow: scroll; */
    flex:10;
    /* padding-bottom: 2%; */
      margin-bottom: 5%;
}
#singer-details::-webkit-scrollbar{
    display: none;
}


</style>