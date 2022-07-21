<template>
  <div id='newmvs'>
      <div class="newmv-lists">
        
          <div v-for="newMv in newMvs" :key="newMv.id" 
                @click="Pushnewmv(newMv.id)"    
                class="newmvLink" >
              <img v-lazy="newMv.cover">
              <p >{{newMv.name.length>15?(newMv.name.slice(0,15)+'...'):newMv.name}}</p>
          </div>

      </div>
  </div>
</template>

<script>
import { _getNewMvs } from '../../../api/video'
export default {
    name:'newmvs',
    data(){
        return{
            newMvs:[],
        }
    },
    mounted(){
        _getNewMvs(40).then(
            response => {
                this.newMvs=response.data.data.slice(1)
            },
            error => {

            }
        )
    },
    methods:{
        Pushnewmv(id){
            this.$router.push(
                {
                    name:'MvPlayer',
                    params:{
                        mid:id,
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
#newmvs{
    padding-top:1%;
    height:98%;
    width:100%;
    overflow: scroll;
}

#newmvs::-webkit-scrollbar{
    display: none;
}
.newmv-lists{
    width:90%;
    margin-left: 5%;
    display: flex;
    flex-wrap:wrap;
}
.newmv-lists .newmvLink{
    width:33%;
    margin-bottom: 2%;
    display: flex;
    flex-direction: column;
}
.newmvLink img{
    width:22vw;
    margin:0% auto;
    border-radius: 3px;
}
.newmvLink p{
    font-size:90%;
    margin:2% auto;
}

</style>