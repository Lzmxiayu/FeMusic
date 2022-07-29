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
    watch:{
        '$store.state.singer.length'(){
            this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
            _getDescOfArtist(this.sid).then(
                    response =>{
                        this.details = response.data.introduction
                    }
                )
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
}
#singer-details::-webkit-scrollbar{
    display: none;
}


</style>