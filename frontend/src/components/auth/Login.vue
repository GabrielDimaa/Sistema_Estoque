<template>
    <div class="login-conteudo">
        <div class="login-modal">
            <div class="login-titulo">{{ showlogin ? "Cadastro" : "Login" }}</div>

            <input v-if="showlogin" v-model="user.name" placeholder="Nome" type="text">

        </div>
    </div>
</template>

<script>
    import { baseApiUrl, userKey, showError } from '@/global'
    import axios from 'axios'

    export default {
        name: 'Login',
        data: function() {
            return  {
                showLogin: false, //alternar cadastro/login
                user: {}
            }
        },
        methods: {
            login() {
                axios.post(`${baseApiUrl}/login`, this.user)
                    .then(res => {
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        this.$router.push({ caminho: '/' })
                    })
                    .catch(showError)
            }
        }
    }
</script>

<style>
