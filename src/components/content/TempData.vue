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
    mounted(){
        if(this.keyword !== '')
            this.$bus.$on('sendSearchkey',(keyword)=>{
                console.log(keyword)
            })
        this.$bus.$emit('sendearchkey','push')
    
    
    
    
    }
}
</script>

<style>

</style>