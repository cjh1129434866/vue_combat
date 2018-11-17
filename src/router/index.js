import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods.vue'
import ratings from '../components/ratings.vue'
import seller from '../components/seller.vue'

Vue.use(Router);

/* eslint-disable no-new */

export default new Router({
  routes: [
    {path: "/",redirect:"/goods"},
    {path: "/goods", component: goods},
    {path: "/ratings", component: ratings},
    {path: "/seller", component: seller}
  ]
})
