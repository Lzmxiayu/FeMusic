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

            if(this.$route.name !== 'SearchMusic')
                this.$router.push({name:'SearchMusic'})

        }
    },
    mounted(){
        this.keyword = this.$store.state.keyword || ''
    }   

}
</script>

<style scoped>
#search{
    text-align: center;
    font-size: 25% ;
    flex:2;
    position: relative;
}
#search .search-box{
    position:absolute;
    width:30%;
    height:40%;
    top:30%;
    left:30%;   
    border-radius: 10px;
    border-color: black;
    /* background-color:rgba(146, 108, 108,0.6); */
    /* opacity:0.7; */
}
</style>