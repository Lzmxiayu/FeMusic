<template>
  <div id='videos-list'>
     <div v-for="video in videos" 
        :key="video.vid"
        @click="PushMvBoard(video.vid)"
        class="video">
        <div class="a-ava">
          <img v-lazy="video.coverUrl">
        </div>
        <div class="a-name">
          <h6>{{video.title.slice(0,20)}}</h6>
        </div>
    </div>
  </div>
</template>

<script>
import { search } from '../../../api/search'
export default {
    name:'videos-list',
    data(){
    return{
      keyword:'',
      videos:[],
    }
  },
  methods:{
        PushMvBoard(mid){
          this.$router.push({
            name:'MvPlayer',
            params:{
              mid:mid
            }
          })
        }
  },
  mounted(){
         this.keyword=this.$store.state.keyword
         //获取歌手
        search(this.keyword,1014,50).then(
            response => {
                this.videos = response.data.result.videos        
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
  /* grid-template-rows: 30% 30% 30%; */
  grid-row-gap: 3%;
}
#videos-list::-webkit-scrollbar{
  display: none;
}
.video{
  width:90%;
  height:100%;
  text-align: center;
  /* height:100%; */
}
.video img{
  width:100%;
  height:80%;
  border-radius: 5px;
}
.video h4{
  margin:0% auto;
}

</style>