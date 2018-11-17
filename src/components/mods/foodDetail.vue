<template>
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
        <div class="foodDetail">
            <div class="back" @click="showDetail = !showDetail">
                <i class="icon-arrow_lift"></i>
            </div>
            <img :src="detailPageDatas.image" width="100%" height="425" alt="">
            <div class="info">
                <div class="title">{{detailPageDatas.name}}</div>
                <div class="desc">
                    <span>月售{{detailPageDatas.sellCount}}</span>
                    <span>好评率{{detailPageDatas.rating}}%</span>
                </div>
                <div class="price">${{detailPageDatas.price}}</div>
                <transition name="fade">
                    <div class="shopCart" v-show="detailPageDatas.count === undefined || detailPageDatas.count===0" @click="add($event)">
                        <div class="text">加入购物车</div>
                    </div>
                </transition>
                <cartcontrol ref="cartcontrol" :food="detailPageDatas"></cartcontrol>
            </div>
            <div class="divider"></div>
            <div class="desc">
                <div class="title">商品介绍</div>
                <div class="content">{{detailPageDatas.info}}</div>
            </div>
            <div class="divider"></div>
            <div class="evaluation">
                <div class="title">商品评价</div>
                <div class="classify">
                    <span v-for="(item,index) in classify" class="item" :class="{active: item.active,bad: index==2,badActive: index==2 && item.active}" @click="classifyClick(item)">{{item.name}}{{item.count}}</span>
                </div>
                <div class="switch">
                    <span @click="flag = !flag" class="icon-check_circle" :class="{on: flag}"></span>
                    <span>只看有内容的评价</span>
                </div>
                <div class="evel-list">
                    <ul>
                        <li class="evel" v-for="item in commontss">
                            <div class="userInfo">
                                <div class="time">{{item.rateTime}}</div>
                                <div class="user">
                                    <span>{{item.rateTime}}</span>
                                    <img :src="item.avatar" width="12" height="12" alt="">
                                </div>
                            </div>
                            <div class="content">
                                <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Scroll from "better-scroll"
    import cartcontrol from "./cartcontrol.vue"
    export default {
        props: ["detailPageDatas"],
        data () {
            return {
                showDetail: false,
                classify: [
                    {name: "全部", count: 0, commont: [], active: true},
                    {name: "推荐", count: 0, commont: [], active: false},
                    {name: "吐槽", count: 0, commont: [], active: false}
                ],
                commonts: [],
                flag : true
            }
        },
        computed: {
            commontss () {
                // 这段函数看上去先执行了，其实当这段函数执行的时候先注册$nextTick()事件，然后等dom更新完再执行回调函数。
                this.upDatasc();
                let arr = [];
                if(this.flag){
                    console.log(this.commonts.length);
                    this.commonts.forEach(val => {
                        if(val.text.length>0){
                            arr.push(val);
                        }
                    });
                    return arr;
                }else {
                    return this.commonts;
                }
            }
        },
        mounted () {

        },
        methods: {
            foodShow () {
                this.showDetail = true
                this.$nextTick(() => {
                    if (!this.sc) {
                        this.sc = new Scroll(this.$refs['detailWrapper'], {
                            click: true
                        })
                    }else{
                        this.sc.refresh();
                    }
                })
                this.$nextTick(() => { // 在这里是等dom更新完
                    this.commonts = this.detailPageDatas.ratings;
                console.log(this.commonts.length);
                    this.classify.forEach(val => {
                        val.count = 0;
                        val.commont = [];
                    });
                    this.detailPageDatas.ratings.forEach(val => {
                        this.classify[0].count++;
                        this.classify[0].commont.push(val);
                        if(val.rateType){
                            this.classify[2].count++;
                            this.classify[2].commont.push(val);
                        }else{
                            this.classify[1].count++;
                            this.classify[1].commont.push(val);
                        }
                    })
                })
            },
            add () {
                this.$refs["cartcontrol"].addCart(event)
            },
            classifyClick (item) {
                this.commonts = item.commont;
                this.classify.forEach(function (value,index) {
                    value.active = false
                });
                item.active = true;
            },
            upDatasc () {
                this.$nextTick(() => {
                    this.sc.refresh(); // 页面的滚动高度重新计算
                })
            }
        },
        components: {
            cartcontrol
        }
    }
</script>