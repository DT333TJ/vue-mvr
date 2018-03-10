// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'router'
import 'router/filter'
import MHeader from 'component/m-header'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import 'style/index.styl'


Vue.config.productionTip = false
Vue.use(MHeader)
Vue.use(VueLazyload)
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
