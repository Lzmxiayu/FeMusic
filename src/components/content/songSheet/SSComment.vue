<template>
  <div id="ss-comemnt">
    <div class="hotcomments" v-show="comment.hotComments">
        <h4>热门评论:</h4> 
      <div v-for="comment in comment.hotComments" class="ssct" :key="comment.commentId">
        <div class="avatar">
            <img v-lazy="comment.user.avatarUrl" >
        </div>
        <div class='ct'>
            <a href="#" style="text-decoration: none;">{{comment.user.nickname}}</a>
            <p>{{comment.content}}</p>
        </div>
      </div>

    </div>

    <div class="newomments" v-show="comment.comments">
        <h4>最新评论:</h4> 
      <div v-for="comment in comment.comments" class="ssct" :key="comment.commentId">
        <div class="avatar">
            <img v-lazy="comment.user.avatarUrl" >
        </div>
        <div class='ct'>
            <a href="#" style="text-decoration: none;">{{comment.user.nickname}}</a>
            <p>{{comment.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'ss-comemnt',
    props:['comment'],

}
</script>

<style scoped>
#ss-comemnt{
    width:100%;
        height:92%;
}

.newomments{
    width:100%;
    display:flex;
    flex-direction: column;
}
.ssct{
    display: flex;
    flex-direction: row;
    margin-bottom:2%;
    
}
.avatar{
    width:50px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.avatar img{
    width:40px;
    border-radius: 50%;
}

.ct{
    flex:1;
}

.ct > p{
    margin:0% auto;
}
</style>