<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
        <div class="tab-item">
            <router-link to="/goods" >商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
      <!--下面的这个标签不能忘记写，不然路由不显示-->
      <!--kee--alive组件缓存，加了这个标签能解决之前从其他选显卡切换回商品页面的时候不能滑屏的bug-->
      <keep-alive>
          <router-view :datas="datas" ref="routerComp"></router-view>
      </keep-alive>

  </div>
</template>
<script>
  import vheader from './components/mods/header.vue'

  // 通过npm下载的东西可以直接引入不需要写路径
  import axios from 'axios'
  export default {
    data () {
        return {
           datas : {
               // 商户的信息
               seller : {},
               // 商品数据
               goods: [],
               // 评论
               ratings: []
           }
        }
    },
    mounted () {
        axios.get("/static/data.json").then(res => {
            this.datas.seller = res.data.seller
            this.datas.goods = res.data.goods
            this.datas.ratings = res.data.ratings
            this.$nextTick( () => {
                    this.$refs.routerComp.scroll()
            })
             console.log(this.$refs.routerComp);
        }),
        document.addEventListener("visibilitychange",this.changetitle,false) // 监听切换标签页的事件
    },
    components: {
        vheader
    },
    methods : {
        changetitle () {  // 切换标签页之后改变title
            if (document.hidden) {
                document.title = "赶快回来"
            }else {
                document.title = "shopping_car"
            }
        }
    }
  }
</script>

<style scoped>
.tab .tab-item a.router-link-active{
    /* 这里写样式要一层一层的写*/
    color:red;
}
</style>
