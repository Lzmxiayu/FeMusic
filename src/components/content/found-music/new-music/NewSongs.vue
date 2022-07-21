<template>
    <div id="nes-songs">
        <div class="ns-header">
            <p @click="ChangeArea($event,0)" class="area selected" >全部</p>
            <p @click="ChangeArea($event,7)" class='area'>华语</p>
            <p @click="ChangeArea($event,96)" class='area'>欧美</p>
            <p @click="ChangeArea($event,16)" class='area'>韩国</p>
            <p @click="ChangeArea($event,8)" class='area'>日本</p>
        </div>
        <div class="ns-content">
            <div v-for="song in songdata" :key=song.id>
                <div class="ns-song">
                    <p class='nsOrder'>
                       {{song.index}}
                    </p>
                    <div class="demo-image__lazy">
                        <img :src="song.album.picUrl" lazy>
                    </div>
                    <p class="nsName" type="text" v-on:click="playMusic(song)">
                                {{song.name}}
                    </p>
                    <p class="nsArtist">
                                {{song.artists[0].name}}
                    </p>
                    <p class="nsAlbum"  v-on:click="PushAlbum(song)">
                                {{song.album.name.length>15?song.album.name.slice(0,15)+'...':song.album.name}}
                    </p>
                    <p class="nsTime">
                    </p>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {_getSongUrl,_getTopSong} from '../../../../api/song'
export default {
    name:'new-songs',
    data(){
        return {
            songdata:[],
            count:0,
            lastSelected:null
        }
    },
    methods:{
        fetchData(type){
            _getTopSong(type).then(
            response =>{
                this.songdata=response.data.data;
                for(let i =0;i<this.songdata.length;)
                {
                    this.songdata[i].index= (++i)<10?'0'+i:i;
                }
            },
            err=>{
                console.log(err)
            }
        )
        },
        ChangeArea(e,type){
            //改变选中状态
            this.lastSelected.classList.remove('selected')
            e.target.classList.add('selected')
            this.lastSelected = e.target

            this.fetchData(type)
        },
        playMusic(song){
            //歌曲获取
				_getSongUrl(song.id).then(
				response => {
					this.$store.dispatch('sendToPlay',{
                        ...response.data.data[0],
                        name:song.name,
                        artist:song.artists[0],
                        duration:this.$store.commit('correctSongTime',song.duration)
                    })	
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
         this.lastSelected = document.querySelector('.selected')
    }

}
</script>

<style scoped>
#nes-songs{
    width:100%;
     /* background:#FFF2E2; */
}


.ns-header{
    display: flex;
}
.area{
    margin-right:2%;
    opacity:0.7;
}
.area:hover{
    cursor: pointer;
    opacity:1;
}

.selected{
   font-weight: bold;
   opacity: 1;
}
.ns-content{
    display: flex;
    flex-direction: column;
}
.ns-song{
    width:100%;
    padding:1%;
    display: flex;
    align-items: center;
}
.nsOrder{
    flex:1;
    margin-bottom: 0%;
}
.demo-image__lazy{
    flex:2;
}
.demo-image__lazy img{
    width:50px;
    height:50px;
    border-radius: 10px;
}
.nsName{
    flex:8;
    margin-bottom: 0%;
}
.nsArtist{
    flex:5;
    margin-bottom: 0%;
}
.nsAlbum{
    flex:5; 
    margin-bottom: 0%;
}
.nsTime{
    flex:4;
    margin-bottom: 0%;
}
</style>