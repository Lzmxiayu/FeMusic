<template>
  <div id='videos-list'>
     <div v-for="video in videos" 
        :key="video.vid"
        @click="PushSinger(video.vid)"
        class="video">
        <div class="a-ava">
          <img :src="video.coverUrl">
        </div>
        <div class="a-name">
          <h4>{{video.title.slice(0,20)}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'videos-list',
    data(){
    return{
      keyword:'',
      videos:[],
    }
  },
  methods:{
        PushSinger(mid){
          this.$router.push({
            name:'MvPlayer',
            params:{
              mid:mid
            }
          })
        }
  },
  mounted(){
        // this.keyword=this.$route.params.keyword
         this.keyword=this.$store.state.keyword
         //获取歌手
        axios.get(`/search?keywords=${this.keyword}&type=1014&limit=50`).then(
            response => {
                this.videos = response.data.result.videos        
                console.log(response.data.result.videos)
            },
            error => {
                console.log('Failed')
            })
  }

}
</script>

<style scoped>
#videos-list{
  width:97%;
  height:100%;
  padding-left:3%;
  margin-top:2%;
  overflow: scroll;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-row-gap: 3%;
}
#videos-list::-webkit-scrollbar{
  display: none;
}
.video{
  width:90%;
  text-align: center;
  /* height:100%; */
}
.video img{
  width:100%;
  border-radius: 5px;
}
.video h4{
  margin:0% auto;
}

</style>