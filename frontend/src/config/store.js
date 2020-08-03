import Vue from 'vue'
import Vueex from 'vuex'

Vue.use(Vueex)

export default new Vueex.Store({
    state: {
        visibilidadeMenu: true,
        user: {
            name: "Usuário Mock",
            email: "mock@gmail.com"
        }
    },
    mutations: {
        toggleMenu(state, visivel) {
            if(visivel === undefined) {
                state.visibilidadeMenu = !state.visibilidadeMenu
            } else {
                state.visibilidadeMenu = visivel
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers
            }
        }
    }
})