<template>
  <div id="search">
         <input @keyup.enter="search" v-model="keyword"  class="search-box">
      </div>
</template>

<script>
export default {
    name:'search',
    data(){
        return{
            keyword:'',
            songs:[],
            t:null,
        }
    },
    methods:{
        searchDebounce(func,delay=100){
                if(this.t) clearTimeout(this.t);
                this.t = setTimeout(()=>{
                    this.search.call(this); //this绑定事件对象
                },delay);  
            },
        search(){
            this.$store.dispatch('changKeywords',this.keyword)

            if(this.$route.name !== 'singlesong')
                this.$router.push({name:'singlesong'})

        }
    },
    mounted(){

    }

}
</script>

<style scoped>
#search{
    text-align: center;
    font-size: 25% ;
    flex:2;
}
#search .search-box{
    transform: translate(0,45%); 
    height:50%;
    width:40%;

    border-radius: 10px;
    border-color: black;
    background-color:rgba(146, 108, 108,0.6);
    opacity:0.7;
}
</style>