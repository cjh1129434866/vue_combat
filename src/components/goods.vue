<template>
    <div class="goods">
        <!--左侧楼梯导航-->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="item in datas.goods" class="menu-item">
                    <span class="text">
                         <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!--右侧商品-->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in datas.goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item" @click="detailPage(food)">
                            <!--食品图片-->
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" alt="">
                            </div>
                            <!--商品描述-->
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <div class="description">{{food.description}}</div>
                                <div class="sell-info">
                                    <span class="sellCount">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}</span>
                                    <div class="price">
                                        <span class="newPrice">${{food.price}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartControl :food="food"></cartControl>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!--底部购物车-->
        <shopCar :food = "food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="this.datas.seller.minPrice"></shopCar>
        <foodDetail ref="foodDetail" :detailPageDatas="detailPageData"></foodDetail>
    </div>
</template>
<script>
    import icon from "./mods/icon.js"
    import Scroll from 'better-scroll'   // 引入滑屏插件
    import shopCar from './mods/shopping_car.vue'
    import cartControl from './mods/cartcontrol.vue'
    import foodDetail from './mods/foodDetail.vue'
    export default {
        props: ['datas'],
        data () {
            return {
                icon: icon,
                detailPageData : null
            }
        },
        computed: {
            food () {
                let arr = []
                this.datas.goods.forEach(goods => {
                    goods.foods.forEach(foods => {
                        if (foods.count > 0) {
                            arr.push(foods)
                        }
                    })
                })
                return arr
            }
        },
        mounted () {
            console.log(this.datas)
            console.log(this.datas.seller.deliveryPrice)
            console.log(this.datas.seller.minPrice)
        },
        methods : {
            scroll () { // 在这里定义这个方法，那么在app.vue里面使用this.$refs[]的时候就能拿到这个方法和当前组件
                /* eslint-disable no-new */
                // 这个回调函数是在dom渲染完毕之后执行的。
                // 这里的bom渲染完毕可以理解为===window.onload
                // 做到这一步的时候，可能出现的一个问题就是移动端可以拖动当前这个元素实现滚动，pc端不能实现滚动；或者是pc端可以滚动但是移动端不能滚动
                // 那么出现这种情况的原因是因为dom渲染完毕之后----》new Scroll() -------》ajax获取数据 -----》dom渲染
                // 解决问题的办法就是   dom渲染完毕之后----》ajax获取数据 -----》dom渲染 ------》new Scroll()
                new Scroll(this.$refs["foodsWrapper"], {
                    click: true  // 使用这个插件必须加上这个键值对，才能在移动端实现点击事件
                })
                new Scroll(this.$refs["menuWrapper"], {
                    click: true // 使用这个插件必须加上这个键值对，才能在移动端实现点击事件
                })
            },
            detailPage (val) {
                this.$refs["foodDetail"].foodShow()
                this.detailPageData = val
            }
        },
        components : {
            shopCar,
            cartControl,
            foodDetail
        }
    }
</script>