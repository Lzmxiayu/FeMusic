<template>
    <div id="nes-als">
        <div class="ns-header">
            <p @click="ChangeArea($event,'ALL')" class="area selected">全部</p>
            <p @click="ChangeArea($event,'ZH')" class="area">华语</p>
            <p @click="ChangeArea($event,'EA')" class="area">欧美</p>
            <p @click="ChangeArea($event,'KR')" class="area">韩国</p>
            <p @click="ChangeArea($event,'JP')" class="area">日本</p>
        </div>
        <div v-if="load" class="Loading">
            <img src="../../../assets/loading.gif" >
            <h3>Loading...</h3>
        </div>
        <div v-if="!load">
        <div class="ns-content" v-if="ifwk">
            <div class="ns-side">
                <h4>本周新碟</h4>
            </div>
            <div class="ns-main">
                <div v-for="wd in weekdata" :key="wd.id" class="ns-unit">
                    <img v-lazy="wd.blurPicUrl" @click="PushAlbum(wd.id)">
                    <p>{{wd.name.length>15?(wd.name.slice(0,15)+'...'):wd.name}}</p>
                    <p class="nsArtist">{{wd.artist.name}}</p>
                </div>
            </div>
        </div>
        <div class="ns-content" >
            <div class="ns-side">
                <h4>本月新碟</h4>
            </div>
            <div class="ns-main">
                <div v-for="wd in monthdata" :key="wd.id" class="ns-unit">
                    <!-- <img :src="wd.blurPicUrl" > -->
                    <img v-lazy="wd.blurPicUrl" >
                    <p>{{wd.name.length>15?(wd.name.slice(0,15)+'...'):wd.name}}</p>
                    <p class="nsArtist">{{wd.artist.name}}</p>
                </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import {_getSongUrl} from '../../../api/song'
import {_getTopAlbum} from '../../../api/album'

export default {
    name:'new-als',
    data(){
        return {
            weekdata:[],
            monthdata:[],
            ifwk:true,
            load:true,
        }
    },
    methods:{
        fetchData(area){
            // &year=2019&month=6
            _getTopAlbum(area).then(
            response =>{
                this.weekdata=response.data.weekData;
                this.monthdata=response.data.monthData;
                this.load=false
            }
        )
        },
        ChangeArea(e,area){
            //改变选中状态
            Array.from(e.target.parentNode.children).forEach(item=>{
                if(item.classList.contains('selected')){
                    item.classList.remove('selected')   
                }
            })
            e.target.classList.add('selected')

            if(area == 'ALL')
                this.ifwk=true
            else
                this.ifwk=false

            this.load=true
            this.fetchData(area)
        },
        playMusic(id){
            //歌曲获取
				_getSongUrl(id).then(
				response => {
                    this.$store.dispatch('sendToPlay',response.data.data[0])
				},
				error => {
					alert('请求歌曲失败')
				}
				)
        },
        PushAlbum(alid){
            // console.log
             this.$store.state.album.push(alid)
          this.$router.push({
            name:'AlbumDetail',
            params:{
              aid:alid
            }
          })
        }


    },
    mounted(){
        this.fetchData(0)
        this.lastSelected = document.querySelector('.selected')
    }

}
</script>

<style scoped>
#nes-als{
    width:100%;
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

.Loading{
    width: 100%;
    height:100%;
    margin-top:5%;
    text-align: center;
}
.ns-content{
    display: flex;
    /* flex-direction: column; */
    width:100%;
    height:100%;
}
.ns-side{
    width:10%;
    flex:1;
}
.ns-main{
    width:90%;
    display: grid;
    grid-template-columns:25% 25% 25% 25% ;
    flex:9;
}

.ns-unit{
    /* flex:2; */
    display: flex;
    flex-direction: column;
    text-align: center;
}
.ns-unit img{
    height:70%;
    width:90%;
    margin-left: 5%;
    border-radius: 5px;
}
.ns-unit p{
    padding:0% auto;
    margin:2% ;
}

.nsArtist{
    /* flex:5; */
     padding:0% auto;
    margin:2% ;
    font-size:10%;
    color: rgb(128, 128, 128);
}

.selected{
   font-weight: bold;
   opacity: 1;
}

</style>