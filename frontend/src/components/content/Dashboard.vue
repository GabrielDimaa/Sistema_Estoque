<template>
    <div class="dashboard">
        <PageTitle icon="fas fa-th-large" titulo="Dashboard" subtitulo="Resumo das operações" color="#41B883" />

        <div class="container-resume">
            <router-link to="/produtos">
                <Resume icon="fas fa-tag" titulo="Produtos" color="#39A9DB" :value="produtos.count" />
            </router-link>
            <router-link to="/clientes">
                <Resume icon="fas fa-user-tag" titulo="Clientes" color="#CE6C47" :value="clientes.count" />
            </router-link>
            <router-link to="/fornecedores">
                <Resume icon="fas fa-dolly" titulo="Fornecedores" color="#E56399" :value="fornecedores.count" />
            </router-link>
        </div>
    </div>
</template>

<script>
    import Resume from '../template/Resume'
    import PageTitle from '../template/PageTitle'
    import axios from 'axios'
    import { baseApiUrl } from '@/global'

    export default {
        name: 'Dashboard',
        components: { Resume, PageTitle },
        data: function() {
            return {
                fornecedores: {},
                clientes: {},
                produtos: {}
            }
        },
        methods: {
            fornecedoresTotal() {
                const url = `${baseApiUrl}/fornecedores-total`
                axios.get(url).then(res => {
                    let aux = res.data
                    this.fornecedores = aux[0]
                })
            },
            clientesTotal() {
                const url = `${baseApiUrl}/clientes-total`
                axios.get(url).then(res => {
                    let aux = res.data
                    this.clientes = aux[0]
                })
            },
            produtosTotal() {
                const url = `${baseApiUrl}/produtos-total`
                axios.get(url).then(res => {
                    let aux = res.data
                    this.produtos = aux[0]
                })
            }
        },
        mounted() {
            this.clientesTotal(),
            this.fornecedoresTotal(),
            this.produtosTotal()
        }
    }
</script>

<style>
    .dashboard {
        margin: 20px;
    }

    .container-resume {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 25px;
    }

    .container-resume > a:hover {
        text-decoration: none;
    }
</style>