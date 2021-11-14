<template>
  <div id="singer-albums">
      <div class="con">
          <div class="al-cover">
              <img src="../../../assets/top50.png">
          </div>
          <div class="al-content">
              <div v-for="song in this.hotSongs" :key="song.id" class="al-songs">
                   <button  class='al-songOrder'>
                       <!-- {{song.index}} -->
              </button>
              <button @click="playMusic(song.id)" class="al-songName" type="text" >
                    	{{(song.name.length>20)?song.name.slice(0,20)+'...':song.name}}
                        <!-- <div v-if="permitted"> -->
                           <!-- <p>jin</p> -->
                        <!-- </div> -->
 			  </button>
                <button class="al-songAlbum" type="text" >
						
 			  </button>
              </div>
          </div>
      </div>
      <div v-for="al in this.alSongs" :key="al.id" class="con">
          <div class="al-cover">
              <!-- {{al.album}} -->
              <!-- {{al.blurPicUrl}} -->
              <img :src="al.blurPicUrl">
          </div>
          <div class="al-content">
              <div v-for="song in al.songs" :key="song.id" class="al-songs">
                   <button  class='al-songOrder'>
                       {{song.index}}
                    </button>
                     <button @click="playMusic(song.id)" class="al-songName" type="text" >
                    	{{(song.name.length>20)?song.name.slice(0,20)+'...':song.name}}
                        <!-- <div v-if="permitted"> -->
                           <!-- <p>jin</p> -->
                        <!-- </div> -->
 			         </button>
               
                <button class="al-songAlbum" type="text" >
						
 			  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'singer-albums',
    data(){
        return {
            sid:'',
            hotSongs:[],
            alSongs:[],
            albumSongs:[],
        }
    },
    mounted(){
        // this.sid=this.$route.params.sid
        this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
        // console.log(this.sid)
        var albums=new Array();
        

        axios.get(`/artists?id=${this.sid}`).then(            
                response => {
                this.hotSongs=response.data.hotSongs
                //   console.log('hotSong:')
                //   console.log(this.hotSongs)
                },
                error => {
                    console.log(error)
                }
        )

        axios.get(`/artist/album?id=${this.sid}`).then(            
                response => {
                let hotAlbums=response.data.hotAlbums
                var songs=[]
                for(let i=0;i<hotAlbums.length;i++)
                    {
                        let songs=[]
                        axios.get(`/album?id=${hotAlbums[i].id}`).then(
                            response => {
                                
                              for(let j=0;j<response.data.songs.slice(0,10).length;)
                              {
                                 let song={
                                    index:'',
                                    id:'',
                                    name:'',
                                };
                                    song.id = response.data.songs[j].id;
                                    song.name= response.data.songs[j].name;
                                    song.index= (++j==10)?10:('0'+j);
                                    songs.push(song)
                                     //mv的id也在同一级，即mv 
                              }
                            },
                            error => {
                                console.log(error)
                            }
                        )
                    
                        hotAlbums[i].songs=songs
                        this.alSongs.push(hotAlbums[i]) 

                    }
                
                },
                error => {
                    console.log(error)
                }
        )
      
        
        // console.log(this.alSongs)
        axios.get(`/album?id=128749721`).then(            
                response => {
                // this.hotAlbums=response.data.hotAlbums
                //   console.log('album songs:')
                //   console.log(response.data)
                },
                error => {
                    console.log(error)
                }
        )


    },
    methods:{
        playMusic(id){
            // console.log(id)
            axios.get(`/song/url?id=${id}`).then(
				response => {
                     this.$bus.$emit('sendSong',response.data.data[0])	
				},
				error => {
					alert('请求歌曲失败')
				}
				)


        }
    }

}
</script>

<style scoped>
#singer-albums{
    /* height:40%; */
    width:100%;
    margin-bottom:5%;
    flex:10;
}
#singer-albums::-webkit-scrollbar{
    display:none;
}
.con{
    width:100%;
    /* height:auto; */
    margin:10px;
    display:flex;
}
.con .al-cover{
    flex:2;
    /* background: yellow; */
    height:100%;
    width:100%;
}
.al-cover img{
    width:60%;
    padding:5% 10%;
}
.con .al-content{
    flex:4;
     height:40%;
    /* background: sandybrown; */
}
/* .al-content{
   
} */
.al-songs{
    width:90%;
    height:8%;
    margin:3px;
    /* margin-left:20%; */
    /* height:30px; */
    display:flex;
}

.al-songOrder{
    flex:1;
    border:none;
}
.al-songName{
    border:none;
    flex:8;
    /* display: flex; */
    
            /* margin: auto; */

    /* background: white; */
}
.al-songName:hover{
    color:rgb(238, 73, 73);
    cursor: pointer;
}
.al-songAlbum
{
     border:none;
    flex:3;
}

</style>