import Vue from "vue"
import Vuex from "vuex"
import state from "./state.js"
import mutations from "./mutations.js"
Vue.use(Vuex)
  /* eslint-disable no-new */
export default new Vuex.Store({
  state,  // 这里state必须小写
  mutations
})
