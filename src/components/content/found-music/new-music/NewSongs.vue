<template>
    <div id="nes-songs">
        <div class="ns-header">
            <p @click="ChangeArea(0)">全部</p>
            <p @click="ChangeArea(7)">华语</p>
            <p @click="ChangeArea(96)">欧美</p>
            <p @click="ChangeArea(16)">韩国</p>
            <p @click="ChangeArea(8)">日本</p>
        </div>
        <div class="ns-content">
            <div v-for="song in songdata" :key=song.id>
                <div class="ns-song">
                    <p class='nsOrder'>
                       {{song.index}}
                    </p>
                    <div class="nsImg"> 
                        <img :src="song.album.picUrl">
                    </div>
                    <p class="nsName" type="text" v-on:click="playMusic(song.id)">
                                {{song.name}}
                                <!-- <div v-if="permitted"> -->
                                <!-- <p>jin</p> -->
                                <!-- </div> -->
                    </p>
                    <p class="nsArtist">
                                {{song.artists[0].name}}
                    </p>
                    <p class="nsAlbum"  v-on:click="PushAlbum(song)">
                                {{song.album.name}}
                    </p>
                    <p class="nsTime">
                    </p>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'new-songs',
    data(){
        return {
            songdata:[],
        }
    },
    methods:{
        fetchData(id){
            axios.get(`/top/song?type=${id}`).then(
            response =>{
                this.songdata=response.data.data;
                for(let i =0;i<this.songdata.length;)
                {
                    this.songdata[i].index= (++i)<10?'0'+i:i;
                }
                console.log(response.data.data[0])
            }
        )
        },
        ChangeArea(id){
            this.fetchData(id)
        },
        playMusic(id){
            //歌曲获取
				axios.get(`/song/url?id=${id}`).then(
				response => {
					
                     this.$bus.$emit('sendSong',response.data.data[0])	
					
				},
				error => {
					// alert('请求歌曲失败')
				}
				)
        },
        PushAlbum(song){

        }


    },
    mounted(){
        this.fetchData(0)
    }

}
</script>

<style scoped>
#nes-songs{
    width:100%;
     background:#FFF2E2;
}
.ns-header{
    display: flex;
}
.ns-header p{
    margin-right:2%;
}
.ns-content{
    display: flex;
    flex-direction: column;
}
.ns-song{
    width:100%;
    /* height:%; */
    padding:0.5%;
    display: flex;
}
.nsOrder{
    flex:1;
}
.nsImg{
    flex:2;
}
.nsImg img{
    width:90%;
    border-radius: 10px;
}
.nsName{
    flex:8;
}
.nsArtist{
    flex:5;
}
.nsAlbum{
    flex:5; 
}
.nsTime{
    flex:4;
}
</style>