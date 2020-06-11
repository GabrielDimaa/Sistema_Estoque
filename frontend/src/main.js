import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vue from 'vue'
import { dom } from '@fortawesome/fontawesome-svg-core'

import App from './App'
import store from './config/store'
import router from './config/router'

import './config/bootstrap'
import './config/axios'
import './config/mensagens'

dom.watch()

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')