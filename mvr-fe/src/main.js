// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'router'
import 'router/filter'
import store from 'store'
import THeader from 'component/t-header'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'style/index.styl'
import 'base'

Vue.config.productionTip = false
Vue.use(THeader)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
