<template>
  <div id="mv">
    <div class="newest-mv">
        <div >
            <h4 @click="PushAllmv">最新MV></h4>
        </div>
        <div class="mv-list">
            <div class="mv-item" v-for="m in newestMv" :key="m.id">
                <img v-lazy="m.cover" @click="Pushnewmv(m.id)" >
                <p>{{m.name}}</p>
                <p>{{m.artistName}}</p>
            </div>
        </div>
    </div>
    <div class="top-mv">
        <div >
            <h4>MV排行榜  ></h4>
        </div>
        <div class="topmv-list">
            <div class="topmv-item" v-for="m in topmv" :key="m.id">
                <div class="topmindex">
                    <p>{{m.index}}</p>
                </div>
                <img v-lazy="m.cover" @click="Pushnewmv(m.id)">
                <div>
                    <p>{{m.name.length>6?m.name.slice(0,6)+'...':m.name}}</p>
                    <p>{{m.artistName}}</p>
                </div>
            </div>
        </div>
    </div>



  </div>
</template>

<script>
import {_getNewestMv,_getCM,_getTopMv} from '../../../api/video'
export default {
    name:'mv',
    data(){
        return {
            newestMv:[],
            cm:[],
            topmv:[]

        }
    },
    methods:{
        Pushnewmv(id){
            this.$router.push(
                {
                    name:'MvPlayer',
                    params:{
                        mid:id,
                    }
                }
            )
        },
        PushAllmv(){
            this.$router.push(
                {
                    name:'AllMV',
                }
            )
        }
    },
    mounted(){
        _getNewestMv().then(
            res=>{
                this.newestMv = res.data.data.slice(1)
            }
        )
        _getCM().then(
            res=>{
                this.cm = res.data.data.slice(0,6)
            },
            err=>{

            }
        )
        _getTopMv().then(
            res=>{
                this.topmv = res.data.data.slice(0,10).map((item,index)=>{
                    item.index = (index+1)<10?'0'+(index+1):index+1
                    return item
                })
            }
        )
    }
}
</script>

<style scoped>
#mv{
    padding-top:1%;
    height:98%;
    width:100%;
    overflow: scroll;
}
#mv::-webkit-scrollbar{
    display: none;
}

h4:hover{
    cursor: pointer;
}

.newest-mv,
.top-mv
{
    margin-left: 5%;
    width:90%;
    display: flex;
    flex-direction: column;
}

.mv-list{
    display: flex;
    flex-wrap: wrap;
}
.mv-item{
    width:22vw;
    margin-right:4vw;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;;
    align-items: left;
}

.mv-item img{
    width:100%;
    border-radius:10px;
    margin-bottom:5px;
}
.mv-item img + p{
    
    font-weight: bold;
    opacity:1;

}
.mv-item>p{
    font-size:5px;  
    margin-top: 0%;
    margin-bottom: 0%;
}

.topmv-list{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center ;
}
.topmv-item{
    width:50%;
    height:10%;
    display: flex;
}
.topmindex{
    display: flex;
    justify-content: center;
}

.topmindex > p{
    color:grey;
    font-size: 20px;
}


.topmv-item > img{
    width:18vw;
    border-radius:10px;
    margin:2%;
}
.topmv-item > div{
    margin: 2%;
    height: 10vh;
    display: flex;
    flex-direction: column;
}
.topmindex ~ div p{

    font-size:13px;
    margin:0% auto;
        margin-bottom: 10px;
}
</style>