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
            <!-- <button class="swbtn" @click="SwitchS('NewSongs')">新歌速递</button>
            <button class="swbtn" >新碟上架</button> -->
              </button>
          </button>
      </div>
      <div class="nwmc-content">
          <router-view></router-view>
      </div>
  </div>
</template> 

<script>
export default {
    name:'new-music',
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
            this.$router.push({
                name:name,
            })
        }
    }
}
</script>

<style scoped>
#new-music{
    width:100%;
    height:100%;
    overflow: scroll;
}
#new-music::-webkit-scrollbar{
    display: none;
}
.nwmc-header{
    height:10%;
    width: 100%;
    text-align: center;
    /* margin:0%; */
    /* padding:0%; */
    /* padding-top:35%; */
}
.sw-container{
    width:25%;
    height:60%;
    margin:2% 0% 2% 37.5% ;
    padding:0%;
    /* border:none; */
    border-radius: 25px;
    border:rgb(204, 199, 193);
    background: white;
    /* padding:0%; */
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
    /* height:100%; */
    /* width:100%; */
}

.nwmc-content{
    background: white;
}
</style>