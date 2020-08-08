<template>
    <div class="dashboard">
        <PageTitle icon="fas fa-th-large" titulo="Dashboard" subtitulo="Resumo das operações" color="#41B883" />

        <div class="container-resume">
            <router-link to="/produtos">
                <Resume icon="fas fa-tag" titulo="Produtos" color="#39A9DB" colorSombra="#39a8dba4" :value="produtos.count" />
            </router-link>
            <router-link to="/clientes">
                <Resume icon="fas fa-user-tag" titulo="Clientes" color="#CE6C47" colorSombra="#df3f058c" :value="clientes.count" />
            </router-link>
            <router-link to="/fornecedores">
                <Resume icon="fas fa-dolly" titulo="Fornecedores" color="#E56399" colorSombra="#db558da2" :value="fornecedores.count" />
            </router-link>
        </div>

        <div class="container-inferior">
            <div class="avisos">
                <div class="title-avisos">
                    <i class="fas fa-arrow-down" id="icon-abaixo"></i>
                    <aside>Produtos abaixo do estoque mínimo</aside>
                    <router-link to="/estoque">
                        <b-button class="style-button" variant="success">
                            Ver mais 
                            <i class="fas fa-arrow-right"></i>
                        </b-button>
                    </router-link>
                </div>
                <b-table striped hover :fields="fields" :items="estoqueMinimo"></b-table>
            </div>

            <div class="estoque-total">
                <div class="aside">
                    <aside>Total em Estoque</aside>
                </div>
                <div class="icon">
                    <i class="fas fa-people-carry" id="icon-total-vendas"></i>
                </div>
                <div class="p">
                    <p>{{ estoqueTotal }}</p>
                </div>
            </div>
        </div>

        <div class="container-chart">
            <div class="title-chart">
                <i class="far fa-chart-bar" id="icon-chart"></i>
                <aside>Cadastros Mensais de Produtos</aside>
            </div>
            <div id="chart"></div>
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
                produtos: {},
                estoqueMinimo: [],
                estoqueTotal: {},
                fields: [
                    { key: 'codigo', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'estoque', label: 'Quantidade em estoque' },
                    { key: 'estoque_minimo', label: 'Estoque Mínimo' }
                ]
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
            },
            getEstoqueMinimo() {
                const url = `${baseApiUrl}/produtos-estoque`
                axios.get(url).then(res => {
                    this.estoqueMinimo = res.data
                })
            },
            getEstoqueTotal() {
                const url = `${baseApiUrl}/produtos/estoque-total`
                axios.get(url).then(res => {
                    this.estoqueTotal = res.data
                })
            }
        },
        mounted() {
            this.clientesTotal(),
            this.fornecedoresTotal(),
            this.produtosTotal(),
            this.getEstoqueMinimo(),
            this.getEstoqueTotal()
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

    .container-inferior {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-left: 20px;
    }

    .avisos {
        flex-grow: 1;
        display: block;
        background-color: rgb(255, 255, 255);
        padding: 27px;
        margin: 0 25px 25px 0;
        border-radius: 18px;
        box-shadow: 0px 5px 5px 5px rgba(209, 206, 206, 0.733);
    }

    .avisos .title-avisos {
        display: flex;
        align-items:center;
        padding: 10px;
        color: #55B984;
    }

    #icon-abaixo {
        font-size: 25px;
        flex-grow: 0;
    }

    .avisos .title-avisos > aside {
        flex-grow: 1;
        font-weight: bold;
        font-size: 1.2rem;
        margin-left: 10px;
    }

    .avisos .title-avisos .style-button {
        flex-grow: 0;
        padding: 8px 18px 8px 18px;
        border-radius: 35px;
    }

    .estoque-total {
        display: flex;
        flex-grow: 0;
        flex-direction: column;
        justify-content: space-between;
        background-color: rgb(255, 255, 255);
        margin: 0 25px 20px 0;
        border-radius: 10px;
        box-shadow: 0px 5px 5px 5px rgba(209, 206, 206, 0.733);
    }

    .estoque-total .aside {
        border-radius: 10px 10px 0 0;
        background-color: rgb(4, 41, 109);
    }

    .estoque-total .aside > aside {
        padding: 20px;
        font-weight: 400;
        font-size: 1.2rem;
        margin-left: 10px;
        color: #FFFF;
    }

    .estoque-total .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #icon-total-vendas {
        background-color: rgb(4, 41, 109);
        width: 60px;
        height: 60px;
        border-radius: 100%;
        padding: 12px;
        color: #FFFF;
    }

    .estoque-total .p {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .estoque-total .p > p {
        font-weight: bold;
        font-size: 1.8rem;
        color: rgb(0, 0, 0);
    }

    .container-chart {
        display: block;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background-color: rgb(255, 255, 255);
        color: #228abb;
        border-radius: 10px;
        margin: 5px 25px 0 22px;
        padding: 20px 0 20px 0;
        box-shadow: 0px 5px 5px 5px rgba(209, 206, 206, 0.733);
    }

    #chart {
        margin: 0 20px 0 20px;
    }

    .title-chart {
        display: flex;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 10px 35px 35px;
    }

    .title-chart aside {
        margin-left: 10px;
    }

    #icon-chart {
        font-size: 25px;
    }
</style>