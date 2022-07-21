<template>
    <div id="user-list">
        <div v-for="user in users"
        :key="user.userId"
        @click="PushUser(user.userId)"
        class="user">
            <div class="user-ava">
                <img v-lazy="user.avatarUrl">
                </div>
                <div class="user-name">
                    <h4>{{user.nickname}}</h4>
                    </div>

            </div>
    </div>
</template>

<script>
import { search } from '../../../api/search'
export default{
    name:'user-list',
    data(){
        return {
            keyword:'',
            users:[],
        }
    },
    methods:{
        PushUser(uid){
        //   console.log(uid)
         this.$store.state.user.push(uid)
        //   console.log(this.$store.state.user)
          this.$router.push({
            name:'UserDetail',
            params:{
              uid:uid
            }
          })
        }
    },
    mounted(){
        // this.keyword=this.$route.params.keyword
         this.keyword=this.$store.state.keyword
        search(this.keyword,1002,50).then(
            response => {
                this.users = response.data.result.userprofiles 
                // console.log(this.users)
            },
            error =>{
                console.log('Failed!')
            }
        )
    }
}
</script>

<style scoped>
#user-list{
    width:90%;
    height:100%;
    margin-left:2%;
    overflow:scroll;
    display: flex;
    flex-direction: column;
}
#user-list::-webkit-scrollbar{
    display:none;
}
.user{
    display:flex;
    margin-top:2%;
    width:100%;
    /* text-align:center; */
}
.user:hover{
  background: rgb(228, 225, 225);
  cursor: pointer;
}
.user-ava{
    flex:2;
}
.user-ava img{
    margin-top:5%;
  width:90%;
  border-radius: 10px;
}
.user-name{
    flex:16;
}

</style>
