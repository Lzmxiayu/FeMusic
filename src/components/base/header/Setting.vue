<template>
  <div id="setting">
    <div class="circle theme1" @click="changeTheme('normaltheme')">

    </div>
    <div class="circle theme2" @click="changeTheme('blacktheme')">

    </div>
    <div class="circle theme3">

    </div>

    </div>
</template>

<script>
export default {
    name:'setting',
    methods:{
        changeTheme(type){
            this.$store.commit('changeTheme',type)
        }
    }
}
</script>

<style scoped>
#setting{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:antiquewhite;
}
.circle{
    border-radius: 100%;
    height:30px;
    width:30px;
    margin-left: 5px;
    margin-right:5px ;
}

.theme1{
    background: white;
    /* border-style: solid; */
}

.theme2{
    background: #181a1b;
    /* border-style: solid;
    border-color: white; */
}

.theme3{
    background: greenyellow;
     /* border-style: solid;
    border-color: white; */
}

</style>