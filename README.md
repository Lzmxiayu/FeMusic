# Femusic

接口来自开源项目
[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
后端运行在本地3000端口

项目采用Vue+Vuex+Vue-Router+Axios开发，
实现了最新音乐，榜单，歌手页，MV页，收藏音乐页，歌手信息，歌单信息，歌曲播放页等界面，
支持夜间模式，歌曲封面，歌词滚动效果，播放列表切换歌曲，滚动条实时进度调整等，
通过localstorage实现状态持久化，防止刷新后数据丢失，使用懒加载缓解同时加载大量图片卡顿问题


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

