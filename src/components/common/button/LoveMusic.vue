<template>
  <div id="love-music-button" @click="changeStatus()">

    <svg v-show="!liked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
    <svg v-show="liked" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>

  </div>
</template>

<script>

export default {
    name:'love-music-button',
    props:['song'],
    data(){
        return {
            liked:false,
            bt:null,
            unlike:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>`,
            like:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>`
        }
    },
    computed:{
        // liked(){  
        //     return this.song.hasBeenCollected
        // }
    },
    methods:{
        changeStatus(){
            //改变图标状态
            this.liked= !this.liked
            this.bt.innerHTML = this.liked?this.like:this.unlike
            //根据状态加入收藏或从收藏中删去
            if(this.liked) this.addToCollect()
            else this.deleteFromCollect()
        },
        //添加到收藏的歌曲LocalStorage
        addToCollect(){
            let collects = JSON.parse(localStorage.getItem('musicCollect'))
            if(collects!==null){
               const has = collects.some((item)=>item.id===this.song.id)
               !has && collects.push(this.song)  
            }else{
                collects = [this.song]
            }
            localStorage.setItem('musicCollect',JSON.stringify(collects))


        },
        deleteFromCollect(){
            let collects = JSON.parse(localStorage.getItem('musicCollect'))
            if(collects===null || (Array.isArray(collects) && collects.length===0)){
                return
            }
            const index = collects.findIndex((item)=>item.id==this.song.id)
            collects.splice(index,1)
            localStorage.setItem('musicCollect',JSON.stringify(collects))

        }
    },  
    mounted(){
        this.bt = this.$el    
        this.liked = this.song?this.song.hasBeenCollected:false
        this.bt.innerHTML = this.liked?this.like:this.unlike

    }
}
</script>

<style scoped>
#love-music-button{
    float:right;
}
.bi-heart {
    color:red;
}

</style>