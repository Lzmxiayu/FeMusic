<template>
  <div id="user-detail">
      <div class="ud-header">
          <div class='ud-ava'>
             <img :src="this.user.avatarUrl">
          </div>
          <div class="ud-desc">
          </div>
      </div>
      <h4>歌单({{this.playlist.length}})</h4>

      <div class="ud-content">
          
              <div v-for="pt in this.playlist" :key="pt.id" class="ud-playlist">
                  <img :src="pt.coverImgUrl" @click="Push(pt.id)">
                  <p class="s_name">{{pt.name}}</p>
                   <p class="s_num"> {{pt.trackCount}}首</p>
              </div>
          
      </div>
  </div>
</template>

<script>
import { _getUserDeatil,_getUserPlaylist } from '../../../api/user'
export default {
    name:"user-detail",
    data(){
        return {
            id:'',
            user:'',
            playlist:''
        }
    },
    methods:{
        PushAlbum(aid){
            // console.log
             this.$store.state.album.push(aid)
          this.$router.push({
            name:'AlbumDetail',
            params:{
              aid:aid
            }
          })
        }
    },
    mounted(){
        this.id=this.$store.state.user[this.$store.state.user.length-1]
        //获取用户详情
        _getUserDeatil(this.id).then(
            response => {
                //userId,avatarUrl,nickname,signature,eventCount,follows,followeds,province,city
                this.user = response.data.profile
                // console.log(response.data.profile)
            },
            error =>{}

        )
        //获取用户歌单
         _getUserPlaylist(this.id).then(
            response => {
                //id,name,coverImgUrl,trackCount(歌曲数)
                this.playlist=response.data.playlist
                console.log(this.playlist)
            },
            error =>{
                console.log('Failed')
            }

        )
    }
}
</script>

<style scoped>
#user-detail{
    width:96%;
    height:100%;
    margin-left:2%;
    margin-right: 2%;
    overflow: scroll;
}
#user-detail::-webkit-scrollbar{
    display: none;
}
.ud-header{
    height:45%;
    width: 100%;
}
.ud-ava{
    width:30%;
    height:100%;
    /* padding:5%; */
    /* background: white; */
    position: relative;
}
.ud-ava img{
    /* width:70%; */
    height:80%;
    margin-left:10%;
    /* margin: auto; */
    margin-top:10%;
    border-radius: 50%;

    /* height: 100%;
	width: auto;
	left:50%;
	position: absolute;
	-webkit-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
    object-fit: scale-down; */

}
.ud-desc{
    width:70%;
    height:100%;
}
.ud-content{
     height:55%;
    width: 100%;
    display: grid;
    grid-template-columns:25% 25% 25% 25% ;
    grid-row-gap: 15px;

}
.ud-playlist{
    width:100%;
    height:100%;
    /* text-align: center; */
}
.ud-playlist img{
    width: 90%;
    margin-left: 5%;
    border-radius: 10px;
    /* height:100%; */
}
.ud-playlist .s_name{
    margin:0% auto;
    font-size:100%; 
    margin-left: 5%;

}
.s_num{
    margin:0% auto;
    font-size: 20%;
    margin-left: 5%;

/* position: relative;
    margin-left: -50%; */
}
</style>