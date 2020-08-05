<template>
    <div class="estoque">
        <div class="container-top">
            <PageTitle icon="fas fa-people-carry" titulo="Estoque" subtitulo="Consultar / Atualizar" color="#41B883"/>
            <b-button variant="primary" @click="alternar">Ver estoque mínimo <i class="fas fa-bars" id="icon-bar"></i></b-button>
        </div>

        <b-form class="forms" v-if="form == 'cadastrar'">
            <input type="hidden" id="produto-id" v-model="produto.id">

            <b-row>
                <b-col md="3" sm="12">
                    <b-form-group label="Código:">
                        <b-form-input type="text" 
                            placeholder="Informe o código do produto..." 
                            v-model="produto.codigo" />
                    </b-form-group>
                </b-col>
                <b-col md="9" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input type="text" 
                            placeholder="Informe o nome do produto..." 
                            v-model="produto.nome" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Preço de venda:">
                        <b-form-input type="text" 
                            placeholder="Informe o preço de venda..." 
                            v-model="produto.preco_venda" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Preço de custo:">
                        <b-form-input type="text" 
                            placeholder="Informe o preço de custo..." 
                            v-model="produto.preco_custo" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Categoria/Subcategoria:">
                        <b-form-select v-if="mode == 'save'" 
                            :options="categorias"
                            v-model="option" />
                        <b-form-input v-else type="text" 
                            readonly
                            v-model="option" />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="6">
                    <b-form-group label="Estoque:">
                        <b-form-input type="text" 
                            placeholder="Informe quantidade em estoque..." 
                            v-model="produto.estoque" />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="6">
                    <b-form-group label="Estoque mínimo:">
                        <b-form-input type="text" 
                            placeholder="Informe o estoque mínimo..." 
                            v-model="produto.estoque_minimo" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col xs="12">
                    <b-button variant="success" @click="save">Salvar</b-button>
                    <b-button variant="dark" class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table v-if="table == 'editar'"
            ref="selectableTable"
            selectable
            :select-mode="'single'"
            :items="estoqueMinimo"
            :fields="fields"
            @row-selected="linhaSelecionada"
            responsive="sm">
        </b-table>


        <div class="b-table">
            <div xs="12" class="title-estoque mb-4 mt-3">
                <i id="icon-b-table" class="fas fa-clipboard-list"></i>
                <h2>Estoque de Produtos</h2>
            </div>
            <b-table class="table-estoque" striped hover :fields="fields" :items="estoque"></b-table>
        </div>
    </div>
</template>

<script>
    import { baseApiUrl, showError } from '@/global'
    import axios from 'axios'
    import PageTitle from '../template/PageTitle.vue' 

    export default {
        name: 'Estoque',
        components: { PageTitle },
        data: function() {
            return {
                estoque: [],
                estoqueMinimo: [],
                produto: {},
                option: {},
                mode: 'save',
                form: 'ocultar',
                table: 'ocultar',
                fields: [
                    { key: 'codigo', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'preco_venda', label: 'Preço de Venda', sortable: true },
                    { key: 'preco_custo', label: 'Preço de Custo', sortable: true },
                    { key: 'estoque', label: 'Estoque', sortable: true },
                    { key: 'estoque_minimo', label: 'Estoque Mínimo', sortable: true },
                    { key: 'categoria', label: 'Categoria', sortable: true },
                    { key: 'subcategoria', label: 'Subcategoria', sortable: true }
                ],
            }
        },
        methods: {
            linhaSelecionada(item) {
                this.produto = item[0]
                let categoria = "Sem categoria"
                if (this.produto.categoria) categoria = `${this.produto.categoria}`
                if (this.produto.subcategoria) categoria = categoria + ` > ${this.produto.subcategoria}`
                this.option = categoria
                this.categorias = []
                this.categorias[0] = this.option
                this.mode = "put/del"
                this.form = 'cadastrar'
            },
            loadEstoque() {
                const url = `${baseApiUrl}/produtos`
                axios.get(url).then(res => {
                    this.estoque = res.data
                })
            }, 
            getEstoqueMinimo() {
                const url = `${baseApiUrl}/produtos-estoque`
                axios.get(url).then(res => {
                    this.estoqueMinimo = res.data
                })
            },
            save() {
                const Post_Put = this.produto.id ? 'put' : 'post'
                const id = this.produto.id ? `/${this.produto.id}` : ''
                if (this.option.id) {
                    if (this.option.id_pai || this.option.categoria_id) {
                        this.produto.subcategoria_id = this.option.id
                        this.produto.categoria_id = this.option.categoria_id
                    } else {
                        this.produto.categoria_id = this.option.id
                    }
                }
                if (this.produto.id) {
                    const produto = {
                        id: this.produto.id,
                        codigo: this.produto.codigo,
                        nome: this.produto.nome,
                        estoque: this.produto.estoque,
                        estoque_minimo: this.produto.estoque_minimo,
                        preco_custo: this.produto.preco_custo,
                        preco_venda: this.produto.preco_venda,
                        categoria_id: this.produto.categoria_id,
                        subcategoria_id: this.produto.subcategoria_id
                    }
                    axios[Post_Put](`${baseApiUrl}/produtos${id}`, produto)
                        .then(() => {
                            this.reset()
                            this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                } else {
                    axios[Post_Put](`${baseApiUrl}/produtos${id}`, this.produto)
                        .then(() => {
                            this.reset()
                            this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                }
            },
            reset() {
                this.loadEstoque()
                this.getEstoqueMinimo()
                this.produto = {},
                this.option = {},
                this.form = 'ocultar'
            },
            alternar() {
                if (this.table == 'editar') this.table = 'ocultar'
                else if (this.table == 'ocultar') this.table = 'editar'
            }
        },
        mounted() {
            this.loadEstoque(),
            this.getEstoqueMinimo()
        }
    }
</script>

<style>
    #icon-bar {
        margin-left: 10px;
    }

    .title-estoque {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
    }

    #icon-b-table {
        color: #55B984;
        font-size: 50px;
        margin-left: 40px;
    }

    .title-estoque > h2 {
        margin-left: 20px;
        font-size: 2.4rem;
        font-weight: 400;
        color: #55B984;
    }

    .b-table {
        background-color: #FFFF;
        padding: 10px 20px 10px 15px;
        border-radius: 20px;
        margin: 0 18px 20px 18px;
        box-shadow: 0px 5px 5px 5px rgba(209, 206, 206, 0.733);
    }

    .b-table .table-estoque {
        box-shadow: 0px 5px 5px 5px rgba(255, 255, 255, 0.733);
    }
</style>