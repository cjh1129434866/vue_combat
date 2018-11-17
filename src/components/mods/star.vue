<template>
    <div class="star" :class="'star-'+size">
        <span class="star-item" v-for="(item,index) in calcu" :class="item" ></span>
    </div>
</template>
<script>
    export default {
        props: ["score","size"],
        computed: {
            calcu () {
                let arr = []
                // 获取整数部分，向下取整
                let taiyang = Math.floor(this.score)
                // 获取小数部分
                let xiaoshu = this.score - taiyang
                // 判断
                let bool = (xiaoshu < 0.5)
                for (var i=0;i<taiyang;i++) {
                    arr.push("on")
                }
                if(!bool){
                    arr.push("half")
                }
                while (arr.length < 5) {
                    arr.push("off")
                }
                return arr
            }
        }
    }
</script>