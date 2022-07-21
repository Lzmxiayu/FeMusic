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
import { _getDescOfArtist } from '../../../api/artist'
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
       _getDescOfArtist(this.sid).then(
            response =>{
                this.details = response.data.introduction
            }
        )
    }

}
</script>

<style scoped>
#singer-details{
    width:90%;
    margin-left: 5%;
    margin-top: 2%;
    flex:10;
    margin-bottom: 5%;
}
#singer-details::-webkit-scrollbar{
    display: none;
}


</style>