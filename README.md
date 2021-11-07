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
解决方法：1.搜索数据保存到FindMusic组件,而非SongList组件  
         2.使用VueX?  
 采用：Search组件传递搜索词给FindMusic，通过路由传参给各板块  
