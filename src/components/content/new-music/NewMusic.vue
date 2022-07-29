<template>
  <div id="new-music">
      <div class="nwmc-header">
          <button class="sw-container">
              <button 
              class="swbtn"
              v-for="(op,index) in options" 
              :key="index"
              @click="titleclick(index,op.cop)"
               :class="{ swbtnTitle: index === currentIndex }"
              >
                  {{op.name}}
              </button>
          </button>
      </div>
      <div class="nwmc-content">
         <NewSongs v-show='!currentIndex'/>
            <NewAl v-show="currentIndex"/>
        </div>
  </div>
</template> 

<script>
import NewSongs from './NewSongs.vue'
import NewAl from './NewAl.vue'

export default {
    name:'new-music',
    components:{NewSongs,NewAl},
    data(){
        return {
            options:[
                {
                name:'新歌速递',
                cop:'NewSongs'
                },
                {
                name:'新碟上架',
                cop:'NewAl'
                }
            ],
            currentIndex:0
        }
    },
    methods:{
        titleclick(index,name){
            this.currentIndex=index 
        }
    }
}
</script>

<style scoped>
#new-music{
    width:100%;
    height:100%;
    text-align: center;
    overflow: scroll;
}
#new-music::-webkit-scrollbar{
    display: none;
}
.nwmc-header{
    height:10%;
    width: 90%;
    margin-left: 5%;
    text-align: center;
}
.sw-container{
    width:25%;
    height:60%;
    margin:2% 0% 2% 37.5% ;
    padding:0%;
    border-radius: 25px;
    border:rgb(204, 199, 193);
    background: white;
    display: flex;
}
.swbtn{
    width:55%;
    height: 100%;
    border:none;
    padding:0%;
    border-radius: 30px;
    background: white;
    margin:0% auto;
}
.swbtnTitle{
    background: rgba(163, 159, 159, 0.836);
    color:white;
    border:none;
}

.nwmc-content{
    width: 90%;
    margin-left: 5%;
}
</style>