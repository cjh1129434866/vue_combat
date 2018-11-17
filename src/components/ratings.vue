<template>
    <div ref="ratingsWrapper" class="ratingsWrapper">
        <div class="ratings-content">
            <div class="info">
                <div class="mark">
                    <div class="num">{{datas.seller.score}}</div>
                    <div class="text">综合评分</div>
                    <div class="contrast">高于周边商家{{datas.seller.rankRate}}</div>
                </div>
                <div class="stars">
                    <div class="serviceScore">
                        <span class="text">服务态度</span>
                        <star :size="36" :score="datas.seller.serviceScore"></star>
                        <span class="num">{{datas.seller.serviceScore}}</span>
                    </div>
                    <div class="foodScore">
                        <span class="text">商品评分</span>
                        <star :size="36" :score="datas.seller.serviceScore"></star>
                        <span class="num">{{datas.seller.serviceScore}}</span>
                    </div>
                </div>

            </div>
            <div class="divider"></div>
            <div class="evaluation">
                <div class="classify">
                    <span class="item" :class="{active: item.active,bad: index===2,badActive: item.active&&index===2}" @click="evel(item)" v-for="(item,index) in classify">
                        {{item.name}}
                        <span class="count" >{{item.count}}</span>
                    </span>
                </div>
                <div class="switch" @click="show = !show">
                    <span class="icon-check_circle" :class="{on: show}"></span>
                    <span class="text">只看有内容的评价</span>
                </div>
                <div class="evel-list">
                    <ul>
                        <li class="evel" v-for="item in commont">
                            <div class="avatar">
                                <!--img标签必须写alt属性-->
                                <img :src="item.avatar" alt="" height="28" width="28">
                            </div>
                            <div class="content">
                                <div class="user">
                                    <span class="name"></span>
                                    <span class="rateTime"></span>
                                </div>
                                <div class="star-wrapper">
                                    <star :size="24" :score="item.score"></star>
                                    <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
                                </div>
                                <div class="text">{{item.text}}</div>
                                <div class="recommend">
                                    <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                                    <span class="dish" v-for="dish in item.recommend">{{dish}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import star from "./mods/star.vue"
    import Scroll from "better-scroll"
    export default {
        props: ["datas"],
        data () {
            return {
                ratings : [],
                classify: [
                    {name: "全部", active: true, count: 0, comment: []},
                    {name: "推荐", active: false, count: 0, comment: []},
                    {name: "吐槽", active: false, count: 0, comment: []},
                ],
                show: true,
                comments : []
            }
        },
        mounted (){
            axios.get('/static/data.json').then((res) => {
                // 如果写在这里那么逻辑是：注册$nextTick=》更新dom=》触发$nextTick，new Scroll();=》更新dom=》
                // 所以这里写两个$nextTick（嵌套）页面就可以滚动
//                this.$nextTick( () => {
//                    this.$nextTick( () => {
//                        this.sc = new Scroll(this.$refs["ratingsWrapper"],{
//                            click : true
//                        });
//                    })
//                });
                this.ratings = res.data.ratings;
                this.comments = this.ratings;
                this.ratings.forEach((val) => {
                    this.classify[0].count++;
                    this.classify[0].comment.push(val);
                    if (val.rateType) { // 根据这个判断是吐槽的数据还是推荐的数据
                        this.classify[2].count++;
                        this.classify[2].comment.push(val);
                    }else{
                        this.classify[1].count++;
                        this.classify[1].comment.push(val);
                    }
                });
            });
            // 这里是把评论归类好了之后=》注册了一个$nextTick()=》计算属性计算好之后更新dom=》触发$nextTick()=>执行new Scroll();
            this.$nextTick( () => {
                this.sc = new Scroll(this.$refs["ratingsWrapper"],{
                    click : true
                });
            })

        },
        activated () {
            // 第一次加载组件完成的时候，数字 1 和 2 都被打印一次，那么以后再次加载当前组件的时候
            // 数字2 在每次组件加载完成的时候都会打印，所以可以把ajax请求放在这里面。
            console.log(2);
        },
        computed: {
            commont () {
                if (this.show) {
                    let arr = []; // 定义这个数组就是把筛选出来的数据保存起来
                    this.comments.forEach(val => {
                        if(val.text.length>0){
                            arr.push(val);
                        }
                    });
                    return arr;
                }else {
                    return this.comments
                }
                this.sc.refresh(); // 重新计算滚动高度
            }
        },
        methods: {
            evel (item) {
                this.classify.forEach( (val) => {
                    val.active = false;
                });
                this.comments = item.comment;
                item.active = true;
            }
        },
        components: {
            star
        }
    }
</script>