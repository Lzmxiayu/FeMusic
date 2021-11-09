<template>
  <div id="mv-player">
      <div class="mvc">
          <h2>{{name}}</h2>
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
                  <img :src="comment.user.avatarUrl" >
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
          <h2>推荐MV</h2>
          <div v-for="sm in simimvs" :key="sm.id" 
              @click="ChangeMv(sm.id)"
                class="recv-mvs">
              <img :src="sm.cover">
              <p>{{sm.name}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
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
        axios.get(`/mv/url?id=${this.id}`).then(
            response =>{
                this.url=response.data.data.url
                // console.log(response.data.data.url)
            }
        )
        //获取mv评论
        axios.get(`/comment/mv?id=${this.id}`).then(
            response =>{
                this.comments=response.data.comments
                // console.log(response.data)
            }
        )
        axios.get(`/mv/detail?mvid=${this.id}`).then(
            response =>{
                this.name=response.data.data.name
                // console.log(response)
            }
        )
        //获取相似mv
         axios.get(`/simi/mv?mvid=${this.id}`).then(
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
        
    }

}
</script>

<style scoped>
#mv-player{
    width:100%;
    height:100%;
    display:flex;
    overflow:scroll;
    background:#FFF2E2;

}
#mv-player::-webkit-scrollbar{
    display: none;
}
.mvc{
    flex:2;
    /* background: coral; */
    height:auto;
    /* overflow: scroll; */
    /* display:flex;
    flex-direction: column; */
}
.mvc::-webkit-scrollbar{
    display:none;
}
.mv{
    height:70%;
    /* margin-top:5%; */
    /* background: white; */
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
    /* margin-top:5%; */
    width:100%;
}
.mv-comment{
    display:flex;
    margin-bottom:5%;
    border-bottom: solid 1px;
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
}
.mv-comment a{
  text-decoration: none;
  font-size:14px;
}
.mv-comment p{
  margin:1%;
  /* font-size:14px; */
}

.video-js{
    width:96%;
    height:95%;
    margin-left:2%;
    /* margin-top:5%; */
    border-style:hidden;
    
}
.recm{
    flex:1;
    height:auto;
    /* background:darkcyan; */
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