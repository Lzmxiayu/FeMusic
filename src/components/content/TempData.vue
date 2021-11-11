<template>

</template>

<script>
export default {
    name:'temp-data',
    data(){
        return{
            keyword:'stars',
        }
    },
    watch:{
        $route:{
            immediate:true,
           handler(to,from){
                this.$bus.$on('sendtempkey',(data)=>{
                    this.keyword =data
                })
                this.$bus.$emit('recvtempkey',this.keyword)
                // console.log('qdqw')
           }
           
        }
    },
    mounted(){
        if(this.keyword !== '')
            this.$bus.$on('sendSearchkey',(keyword)=>{
                // console.log(keyword)
            })
        // this.$bus.$emit('recvtempkey','push')
    
    
    
    
    }
}
</script>

<style>

</style>