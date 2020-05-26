import Vue from 'vue'
import Vueex from 'vuex'
import axios from 'axios'

Vue.use(Vueex)

export default new Vueex.Store({
    state: {
        user: {
            name: "Usuário Mock",
            email: "mock@gmail.com"
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers
            }
        }
    }
})