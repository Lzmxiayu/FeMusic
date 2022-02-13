<template>
  <div id='newmvs'>
      <div class="newmv-lists">
        
          <div v-for="newMv in newMvs" :key="newMv.id" 
                @click="Pushnewmv(newMv.id)"    
                class="newmvLink" >
              <img v-lazy="newMv.cover">
              <p >{{newMv.name.length>15?(newMv.name.slice(0,15)+'...'):newMv.name}}</p>
          </div>
      <div class="space">
      </div>  
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'newmvs',
    data(){
        return{
            newMvs:[],
        }
    },
    mounted(){
        axios.get('/mv/first?limit=40').then(
            response => {
                this.newMvs=response.data.data
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
    padding:2%;
    padding-bottom: 2%;
    height:98%;
    width:100%;
    overflow: scroll;

}

#newmvs::-webkit-scrollbar{
    display: none;
}
.newmv-lists{
    width:100%;
    height:90%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 34% 34% 34% ;
    row-gap:25px;

}
.newmv-lists .newmvLink{
    width:100%;
    height:100%;
    margin-bottom: 2%;
    /* margin:10% 5% 10% 5%; */
    display: flex;
    flex-direction: column;
    text-align: center;
}
.newmvLink img{
    width:90%;
    height:90%;
    margin:0% auto;
    flex:19;
    border-radius: 3px;
}
.newmvLink p{
    flex:1; 
    font-size:90%;
    margin:0% auto;
}
.space{
    height:2%;
}
</style>