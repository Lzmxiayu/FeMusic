# femusic

> A music app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


目前：  
1.数据传参：  
中央数据总线因为路由跳转引起的组件销毁和创建问题  
解决方法：在传参前先跳转 其他页面搜索歌曲失效也用该方法解决了  
路由转换时传递 问题：本界面继续搜索时参数无法传递 不用

2./fdmc下点击单曲切换到/fdmc/sglt时之前搜索数据丢失  
解决方法：1.搜索数据保存到FindMusic组件,而非SongList组件  2.使用VueX?  
 采用：Search组件传递搜索词给FindMusic，通过路由传参给各板块  

3.前进后退时,数据丢失,原因：数组挂载在执行组件上，前进后退切换路由销毁组件同时销毁了数据  
尝试解决办法:建立TempData组件备份数据  
TempData监视route属性,对二级组件传递备份值，如SingerInfo传递备份的id值,  
注意先后顺序或者通过路由参数判断是路由跳转还是回溯
最终解决：vueX共享了变量，目前注意前进后退索引变化
后退后再跳转则要将此节点后的记录删除

4.search-content/VideoList图片大小问题

已做版块:
搜索结果
音乐播放
MV板
歌曲板
歌手主页
专辑详情
歌单详情
热门歌手,MV,歌单,专辑展示
...

待做版块：
前进后退,使用vuex保存数据,索引获取
专辑详情(待完善)
登录功能
推荐页
分页机制
...

需优化：
大量图片加载时的卡顿，目前考虑方向:SessionStorage,...
播放音乐图片与播放按钮同步 