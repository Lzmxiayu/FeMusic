<template>
  <div id="singer-mv">
      
          <div  v-for="mv in mvs " :key="mv.id" @click="PushMv(mv.id)" class="sg-con">
                <div  class="sgmv-cover">
                    <img v-lazy="mv.imgurl">
                </div>
                <div class="sgmv-name">
                {{mv.name>15?(mv.name.slice(0,15)+'...'):mv.name}}
                </div>
          </div>
      
  </div>
</template>

<script>
import {_getMvOfArtist} from '../../../api/artist'
export default {
    name:'singer-mv',
    data(){
        return{
            sid:'',
            mvs:[],
        }
    },
    watch:{
        '$store.state.singer.length'(){
            this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
            _getMvOfArtist(this.sid).then(
                response => {
                    this.mvs=response.data.mvs
                },
                error => {
                    console.log('Failed')
                }
        )
           
        }

    },
    mounted(){
        this.sid=this.$store.state.singer[this.$store.state.singer.length-1]
        _getMvOfArtist(this.sid).then(
            response => {
                this.mvs=response.data.mvs
            },
            error => {
                console.log('Failed')
            }
        )

    },
    methods:{
        PushMv(mid){
            this.$router.push(
                {
                    name:'MvPlayer',
                    params:{
                        mid:mid
                    }
                }
            )
        }
    }

}
</script>

<style scoped>
#singer-mv{
    width:95%;
    display: flex;
    flex-wrap: wrap;
}
#singer-mv::-webkit-scrollbar{
    display: none;
}
.sg-con{
    width:17vw;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin:2%;
}
.sg-con:hover{
    cursor: pointer;
}
.sgmv-cover{
    flex:3;
    height:80%;
    width:15vw;
}
img{
    width:17vw;
    height:20vh;
    border-radius: 8px;
}
.sgmv-name{
    flex:1;
    margin:0% auto;
}
</style>