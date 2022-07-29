<template>
    <div id="setting">
        <div>
            <div class="circle theme1" @click="changeTheme('normaltheme')">
            </div>
            <div class="circle theme2" @click="changeTheme('blacktheme')">
            </div>
            <!-- <div class="circle theme3">
            </div> -->
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
    justify-content: center;
}

#setting > div{
    align-self: center;
    height:30px;
    width:70px;
    display:flex;
    align-items:center;
    justify-content: center;
    background-color:antiquewhite;
    border-radius: 20px;
}
.circle{
    border-radius: 100%;
    height:25px;
    width:25px;
    margin-left: 5px;
    margin-right:5px ;
}

.theme1{
    background: white;
}
.theme2{
    background: #181a1b;
}
.theme3{
    background: greenyellow;
}

</style>