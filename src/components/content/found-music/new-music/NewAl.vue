<template>
    <div id="nes-als">
        <div class="ns-header">
            <p @click="ChangeArea('ALL')">全部</p>
            <p @click="ChangeArea('ZH')">华语</p>
            <p @click="ChangeArea('EA')">欧美</p>
            <p @click="ChangeArea('KR')">韩国</p>
            <p @click="ChangeArea('JP')">日本</p>
        </div>
        <div v-if="load" class="Loading">
            <img src="../../../../assets/loading.gif" >
            <h2>Loading...</h2>
        </div>
        <div v-if="!load">
        <div class="ns-content" v-if="ifwk">
            <div class="ns-side">
                <h4>本周新碟</h4>
            </div>
            <div class="ns-main">
                <div v-for="wd in weekdata" :key="wd.id" class="ns-unit">
                    <img v-lazy="wd.blurPicUrl" >
                    <p>{{wd.name}}</p>
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
                    <p>{{wd.name}}</p>
                    <p class="nsArtist">{{wd.artist.name}}</p>
                </div>
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
            weekdata:[],
            monthdata:[],
            ifwk:true,
            load:true
        }
    },
    methods:{
        fetchData(area){
            // &year=2019&month=6
            axios.get(`/top/album?area=${area}`).then(
            response =>{
                this.weekdata=response.data.weekData;
                this.monthdata=response.data.monthData;
                this.load=false
                console.log(response.data)
            }
        )
        },
        ChangeArea(area){
            if(area == 'ALL')
                this.ifwk=true
            else
                this.ifwk=false
            this.load=true
            this.fetchData(area)
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
#nes-als{
    width:100%;
    /* height:100%; */
     background:#FFF2E2;
}

.ns-header{
    display: flex;
}
.ns-header p{
    margin-right:2%;
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
}
.ns-unit img{
    height:70%;
    width:90%;
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

</style>