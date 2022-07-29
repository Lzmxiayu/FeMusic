<template>
  <div id="mv-player">
      <div class="mvc">
          <h3>{{name}}</h3>
          <div class="mv">
              <video 
              class="video-js"
              controls="controls"
              autoplay
              :src="url">
              </video>
          </div>
          <div class="mv-comments">
               <h4>全部评论:</h4> 
            <div v-for="comment in comments" class="mv-comment" :key="comment.commentId">
                <div class="mv-avatar">
                  <img v-lazy="comment.user.avatarUrl" >
                </div>
                <div class='mv-ct'>
                    <a href="#">{{comment.user.nickname}}</a>
                <br>
                    <p>{{comment.content}}</p>
                </div>
            </div>
          </div>
      </div>
      <div class="recm">
          <h3 class="rechead">推荐MV</h3>
          <div v-for="sm in simimvs" :key="sm.id" 
              @click="ChangeMv(sm.id)"
                class="recv-mvs">
              <p>{{sm.name}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import { _getMvUrl,_getMvDetail,_getMvComment,_getSimiMv } from '../../../api/video'
export default {
    name:'mv-player',
    data(){
        return {
            id:'5436712',
            url:'',
            comments:[],
            simimvs:[],
            name:'',
        }
    },
    methods:{
        fetchData(){
        //获取mv地址
        _getMvUrl(this.id).then(
            response =>{
                this.url=response.data.data.url
                // console.log(response.data.data.url)
            }
        )
        //获取mv评论
        _getMvComment(this.id).then(
            response =>{
                this.comments=response.data.comments
                // console.log(response.data)
            }
        )
       _getMvDetail(this.id).then(
            response =>{
                this.name=response.data.data.name
                // console.log(response)
            }
        )
        //获取相似mv
        _getSimiMv(this.id).then(
            response =>{
                this.simimvs=response.data.mvs
                // console.log('similar')
                // console.log(response.data.mvs)
            }
        )

        },
        ChangeMv(id){
            this.id=id
            this.fetchData()
        }
    },
    mounted(){
        this.id=this.$route.params.mid
        this.fetchData()
        this.$store.commit('pauseSong')
        
    }

}
</script>

<style scoped>
#mv-player{
    width:94%;
    height:100%;
    margin-left: 3%;
    display:flex;
    overflow:scroll;
}
#mv-player::-webkit-scrollbar{
    display: none;
}
.mvc{
    flex:3;
    height:auto;
}
.mvc::-webkit-scrollbar{
    display:none;
}

.mvc h3{
    margin-left:2%;
}
.mv{

}
.mvc h2{
    margin:5% 0% 2% 2%;

}
.mv-comments{
    width:95%;
    /* height:20%; */
    margin-left:2.5%;
    margin-top:5%;
    display: flex;
    flex-direction: column;
}
.video-js{
    width:100%;
    /* margin-left: 0% auto; */
}
.mv-comment{
    display:flex;
    margin-bottom:5%;
    /* border-bottom: solid 1px; */
}
.mv-avatar{
    flex:2;
}
.mv-avatar img{
    width:80%;
    border-radius:50%;
}
.mv-ct{
    flex:16;
}
.recm h2{
    margin-left:6%;
    margin-top:10%;
}
.mv-comment a{
  text-decoration: none;
  font-size:14px;
}
.mv-comment p{
  margin:1%;
}

.video-js{
    width:96%;
    height:95%;
    margin-left:2%;
    border-style:hidden;
    
}
.recm{
    flex:1;
    height:auto;
}
.rechead{
    margin-left:10%;
}
.recv-mvs{
    display:flex;
    flex-direction: column  ;
    text-align:center;
    width:100%;

    margin-bottom:5%;
}.recv-mvs:hover{
    cursor:pointer;
}
.recv-mvs img{
    width:80%;
    margin-left:10%;
    border-radius:5px;
}
.recv-mvs p{
    width:80%;
    margin:1% auto;
}



</style>