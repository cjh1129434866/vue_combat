<template>
    <div class="shopCart">
        <div @click="showList" class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo active">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="badge" v-show="totalPrice > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{active:totalPrice>0}">总价：${{totalPrice}}</div>
                <div class="desc" v-show="totalPrice < 99">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{enough: totalPrice >= minPrice}">
                <div class="pay">{{pay}}</div>
            </div>
        </div>
        <transition name="transHeight">
            <div v-show="totalPrice > 0 && show" class="shopcart-list">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span @click="empty" class="empty">清空</span>
                </div>
                <div ref="listContent" class="list-content">
                    <ul>
                        <li class="food" v-for="item in food">
                            <span class="name">{{item.name}}</span>
                            <div class="price">
                                <span>${{item.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="item"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

    </div>
</template>
<script>
    // 这个滚动插件必须要等dom渲染完毕（包括ajax请求完数据并渲染结束）之后才可以new初始化它
    import Scroll from "better-scroll"
    import cartcontrol from './cartcontrol.vue'
    export default {
        props: ["deliveryPrice","minPrice","food"],
        data () {
            return {
                show : false
            }
        },
        computed: {
            totalPrice () { // 总价
                let total = 0;
                this.food.forEach(val => {
                    total += val.count*val.price
                })
                return total
            },
            totalCount () { // 选择的商品数量
                let count = 0;
                this.food.forEach(val => {
                    count += val.count
                })
                return count
            },
            pay () {
                if (this.totalPrice === 0) {
                    return `还差$ ${this.minPrice}起送`
                }else if (this.totalPrice < this.minPrice){
                    return `还差$ ${this.minPrice - this.totalPrice}元起送`
                }else if (this.totalPrice >= this.minPrice) {
                    return `去结算`
                }
            }
        },
        methods: {
            empty () {
                this.food.forEach( val => {
                    val.count = 0
                })
                this.show = false
            },
            showList () {
                this.show = !this.show
                // dom更新完使用滚动插件
                // 那么这边可能会遇到一个问题就是第一次展开购物车列表的时候，
                // 滚动高度是1000px.那么清空购物车第二次再次添加商品，
                // 发现滚动购物车列表的时候，滚动高度还是1000px.并没有实时刷新高度
                if(this.show){
                    this.$nextTick(() => {
                      if(!this.sc){
                        this.sc = new Scroll(this.$refs.listContent,{
                            click: true
                        })
                      }else{
                        // 强制重新计算高度
                        this.sc.refresh();
                      }
                    })
                }
            }
        },
        components: {
            cartcontrol
        }
    }
</script>