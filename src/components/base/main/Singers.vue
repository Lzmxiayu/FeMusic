<template>
  <div id='singers'>
      <div class="sg-head">
            <div class="sg-category">
                <div class="sg-area">
                    <p>语种：</p>
                    <div v-for="area in area" :key="area" class="sg-item" >
                        <button @click="selected($event,1)">{{area}}</button>
                    </div>
                </div>
                <div class="sg-type">
                    <p>分类：</p>
                    <div v-for="t in type " :key="t" class="sg-item">
                        <button @click="selected($event,2)">{{t}}</button>
                    </div>              
                </div>
                <div class="sg-sort">
                    <p>筛选：</p>
                    <div class="chars">
                        <div v-for="s in char " :key="s" class="sg-item">
                            <button @click="selected($event,3)">{{s}}</button>
                        </div>  
                    </div>
                    
                </div>
            </div>
        </div>
      <div class="singer-lists">
          <div v-for="artist in artists" :key="artist.id" class="singerLink" @click="PushSinger(artist.id)">
          <div class="singer-avar">
              <img v-lazy="artist.img1v1Url">
          </div>
              <p >{{artist.name}}</p>
          </div>
          
         
      </div>
  </div>
</template>

<script>
import { _getTopListArtist,_getArtiBywords } from '../../../api/artist'
export default {
    name:'singers',
    data(){
        return{
            artists:[],
            serachword:{
                area:-1,
                type:-1,
                initial:-1
            },
            area:[ '全部','华语','欧美','日本','韩国','其他'],
            type:['全部','男歌手','女歌手','乐队组合'],
            areaCode:{
                '全部':-1,
                '华语':7,
                '欧美':96,
                '日本':8,
                '韩国':16,
                '其他':0
            },
            typeCode:{'全部':-1,'男歌手':1,'女歌手':2,'乐队组合':3},
            char:[]
        }
    },
    mounted(){
        this.char = ['热门',...Array(26).fill(0).map((ch,ind)=>String.fromCharCode(65+ind)),'#']
        _getTopListArtist().then(
            response => {
                this.artists=response.data.list.artists.slice(0,50)
            },
            error => {

            }
        )


    },
    methods:{
        selected(e,no){
            const target = e.target
            this.changeStyle(target)
            this.requestSinger(target.innerText,no)

        },
        requestSinger(text,no){
            const proper =  no===1?'area':no===2?'type':'initial'
            if(proper!=='initial')
                this.serachword[proper] = this[proper+'Code'][text]
            else
                this.serachword['initial'] = text==='热门'?'-1':text==='#'?'0':text.toLowerCase()

             _getArtiBywords(this.serachword).then(
                response => {
                    this.artists = response.data.artists
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
        PushSinger(id){
            this.$store.state.singer.push(id)
            this.$router.push(
                {
                    name:'SingerInfo',
                    params:{
                        sid:id,
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
#singers{
    height:96%;

    width:94%;
    padding-left: 3%;
    padding-top:2%;
    overflow: scroll;

}

#singers::-webkit-scrollbar{
    display: none;
}

#sg{
    padding-top:1%;
    padding-left:5%;
    height:98%;
    width:90%;
    overflow: scroll;
}

#sg::-webkit-scrollbar{
    display: none;
}
.sg-category{
    display: block;
}
.sg-category{
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
}
.sg-area,
.sg-type{
    display: flex;
    width:70%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1%;
    font-size: 80%;
}


.sg-sort{
     display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1%;
    font-size: 80%;
     width:100%;
}
/* .sg-sort > p{
    height:100%;
    /* margin:0% 1.5%;
    display: block;
} */
.chars{
     display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width:80%;
}
.chars .sg-item{
    width:8%;
    height:4vh;
}
.sg-area > p,
.sg-type > p,
.sg-sort > p
{
    margin:0% 1.5% 0% 0%;
}

.sg-item{
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
.sg-item > button:hover{
    cursor: pointer;
    opacity: 1;
}

.choose{
    border-radius: 15px;
    color:red;
    background: rgb(242, 181, 181);
}


















.singer-lists{
    width:100%;
    height:100%;
    display: flex;
    flex-wrap:wrap;
}
.singer-lists .singerLink{
    width:15vw;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.singer-avar{
    width:85%;
    height:84%;
    margin:0% auto;
    flex:15;
    border-radius: 15px;
}
.singer-avar img{
    width:100%;
    height:100%;
    margin:0% auto;
    border-radius: 15px;
}
.singerLink p{
    flex:3; 
    margin:0% auto;
    /* font-size:80%; */
}
</style>