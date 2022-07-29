<template>
  <div id='allmv'>
        <div class="allmv-head">
            <h4>全部MV</h4>
            <div class="allmv-category">
                <div class="allmv-area">
                    <p>地区：</p>
                    <div v-for="area in areas " :key="area" class="catg-item" >
                        <button @click="selected($event,1)">{{area}}</button>
                    </div>
                </div>
                <div class="allmv-type">
                    <p>类型：</p>
                    <div v-for="t in type " :key="t" class="catg-item">
                        <button @click="selected($event,2)">{{t}}</button>
                    </div>              
                </div>
                <div class="allmv-sort">
                    <p>排序：</p>
                    <div v-for="s in order " :key="s" class="catg-item">
                        <button @click="selected($event,3)">{{s}}</button>
                    </div>  
                </div>
            </div>
        </div>

      <div class="allmv-lists">
          <div v-for="newMv in Mvs" :key="newMv.id" 
                @click="Pushnewmv(newMv.id)"    
                class="allmvLink" >
              <img v-lazy="newMv.cover">
              <p >{{newMv.name.length>15?(newMv.name.slice(0,15)+'...'):newMv.name}}</p>
              <p>{{newMv.artistName}}</p>
          </div>

      </div>
  </div>
</template>

<script>
import { _getAllMv } from '../../../api/video'
export default {
    name:'allmv',
    data(){
        return{
            Mvs:[],
            serachword:{
                area:'全部',
                type:'全部',
                order:'上升最快'
            },
            areas:['全部','内地','港台','欧美','日本','韩国'],
            type:['全部','官方版','原声','现场版'],
            order:['上升最快','最热','最新']
        }
    },
    mounted(){
        _getAllMv(this.serachword).then(
            response => {
                this.Mvs=response.data.data
            },
            error => {

            }
        )
    },
    methods:{
        selected(e,no){
            const target = e.target
            this.changeStyle(target)
            this.requestMv(target.innerText,no)

        },
        requestMv(text,no){
            const proper =  no===1?'area':no===2?'type':'order'
            
            this.serachword[proper] = text

             _getAllMv(this.serachword).then(
                response => {
                    this.Mvs = response.data.data
                },
                error => {

                }
            )
        },
        changeStyle(target){
            Array.from(target.parentNode.parentNode.children).slice(1).forEach(item=>{
                if(item.children[0].classList.contains('choose')){
                         item.children[0].classList.remove('choose')   
                }
            })

            target.classList.add('choose')
        },
        Pushnewmv(id){
            this.$router.push(
                {
                    name:'MvPlayer',
                    params:{
                        mid:id,
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
#allmv{
    padding-top:1%;
    padding-left:5%;
    height:98%;
    width:90%;
    overflow: scroll;
}

#allmv::-webkit-scrollbar{
    display: none;
}
.allmv-category{
    display: block;
}
.allmv-category{
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
}
.allmv-area,
.allmv-type,
.allmv-sort{
    display: flex;
    width:100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1%;
    font-size: 80%;
}

.allmv-area > p,
.allmv-type > p,
.allmv-sort > p{
    margin:0% 1.5% 0% 0%;
}

.catg-item{
    opacity:0.7;
    font-size: 80%;
    display: flex;
    justify-content: center;
    width:10%;
}
button{
    background: none;
    border:none;
}
.catg-item > button:hover{
    cursor: pointer;
    opacity: 1;
}

.choose{
    border-radius: 15px;
    color:red;
    background: rgb(242, 181, 181);
}


.allmv-lists{
    width:100%;
    margin-left: 1%;
    display: flex;
    flex-wrap:wrap;
}
.allmv-lists .allmvLink{
    width:30%;
    margin-bottom: 3%;
    margin-right:3%;
    display: flex;
    flex-direction: column;
}
.allmvLink img{
    width:100%;
    margin:0% auto;
    border-radius: 5px;
}
.allmvLink p{
    font-size:14px;
    margin:1% auto;
    margin-left: 0%;
}
.allmvLink > p + p{
    opacity: 0.5;
}

</style>