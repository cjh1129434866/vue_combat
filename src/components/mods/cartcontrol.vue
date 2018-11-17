<template>
    <div class="cartcontrol">
        <transition name="fadeRotate">
            <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click.stop="addCart($event)">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import {mapMutations, mapState} from "vuex"
    export default {
        props: ["food"],
        methods: {
            ...mapMutations([
                'vxaddCart',
                'vxreduceCart'
            ]),
            addCart (event) {
                console.log(event);
                // _constructed:true这个属性是滚动插件加上的
                // 那么没有这个属性的点击事件是pc端的。
                // 禁用掉pc端的点击事件
                if(!event._constructed){
                    return false
                }
                if (typeof this.food.count === "undefined") {
                    Vue.set(this.food,'count',0)
                    Vue.set(this.food,'active',true)
                }
                this.food.count++
                if (this.food.active) {
                    this.vxaddCart(this.food)
                    this.food.active = false
                }
                console.log(this.vxfood);
            },
            decreaseCart (event) {
                if(!event._constructed){
                    return false
                }
                this.food.count--
                if (this.food.count === 0) {
                    this.vxreduceCart(this.food)
                }
                console.log(this.vxfood);
            }
        },
        computed: {
            ...mapState([
               "vxfood"
            ])
        }
    }
</script>