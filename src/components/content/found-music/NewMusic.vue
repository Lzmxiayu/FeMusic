<template>
  <div id="new-music">
      <div class="nwmc-header">
          <button class="sw-container">
            <button class="swbtn" exact>新歌速递</button>
            <button class="swbtn" exact>新碟上架</button>
          </button>
      </div>
      <div class="nwmc-content">
      </div>
  </div>
</template> 

<script>
export default {
    name:'new-music',
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
    height:20%;
    width: 100%;
    text-align: center;
    margin:0%;
    /* padding-top:35%; */
}
.sw-container{
    width:25%;
    height:30%;
    margin:2% 0% 2% 37.5% ;

    /* border:none; */
    border-radius: 25px;
    border:rgb(204, 199, 193);
    background: white;
    padding:0%;
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
.swbtn .active:after{
    background: rgba(163, 159, 159, 0.836);
    color:white;
    border:none;
}
.swbtn:checked{
    /* background: rgba(207, 207, 207, 0.336); */
    /* color:white; */
    /* border:black; */
}
.nwmc-content{
    background: white;
}
</style>