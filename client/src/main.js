// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './stores/'
import 'normalize.css'
import './styles/index.scss'
import './styles/icon.scss'

// 注册插件
import VueHighlightJS from 'vue-highlightjs'
import VModal from 'vue-js-modal'
Vue.use(VueHighlightJS)
Vue.use(VModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
