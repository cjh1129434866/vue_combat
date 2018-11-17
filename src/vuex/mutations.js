export default {
  vxaddCart (state,val) { // 默认第一个参数是vuex里面定义的数据
    // console.log(arguments)
    state.vxfood.push(val)  // 把添加的商品存到数据里
  },
  vxreduceCart (state,val) {
    state.vxfood.forEach( (value,index) => {
      if (value.name == val.name) {
        state.vxfood.splice(index,1)
      }
    })
  }
}