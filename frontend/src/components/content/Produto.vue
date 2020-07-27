<template>
    <div class="produto">
        <div class="container-top">
            <PageTitle icon="fas fa-dolly" titulo="Produtos" subtitulo="Consultar / Cadastrar" color="#41B883"/>
            <b-button variant="warning" @click="alternar">Cadastrar Produtos</b-button>
        </div>

        <b-form v-if="form == 'cadastrar'">
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
                <b-col md="4" sm="6">
                    <b-form-group label="Preço de venda:">
                        <b-form-input type="text" 
                            placeholder="Informe o preço de venda..." 
                            v-model="produto.preco_venda" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Preço de custo:">
                        <b-form-input type="text" 
                            placeholder="Informe o preço de custo..." 
                            v-model="produto.preco_custo" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Estoque:">
                        <b-form-input type="text" 
                            placeholder="Informe quantidade em estoque..." 
                            v-model="produto.estoque" />
                    </b-form-group>
                </b-col>
                <b-col md="8" sm="12">
                    <b-form-group label="Categoria/Subcategoria:">
                        <b-form-select v-if="mode == 'save'" 
                            :options="categorias"
                            v-model="option" />
                        <b-form-input v-else type="text" 
                            readonly
                            v-model="option" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col xs="12">
                    <b-button variant="success" @click="save">Salvar</b-button>
                    <b-button variant="danger" class="ml-2" @click="remove">Excluir</b-button>
                    <b-button variant="secondary" class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table ref="selectableTable"
            selectable
            :select-mode="'single'"
            :items="produtos"
            :fields="fields"
            @row-selected="linhaSelecionada"
            responsive="sm">
        </b-table>

    </div>
</template>

<script>
    import { baseApiUrl, showError } from '@/global'
    import axios from 'axios'
    import PageTitle from '../template/PageTitle'

    export default {
        name: 'Produto',
        components: { PageTitle },
        data: function() {
            return {
                produto: {},
                produtos: [],
                categorias: [],
                categoria: {},
                option: {},
                mode: 'save',
                form: 'ocultar',
                fields: [
                    { key: 'codigo', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'preco_venda', label: 'Preço de Venda', sortable: true },
                    { key: 'preco_custo', label: 'Preço de Custo', sortable: true },
                    { key: 'estoque', label: 'Quant. Estoque', sortable: true },
                    { key: 'categoria', label: 'Categoria', sortable: true },
                    { key: 'subcategoria', label: 'Subcategoria', sortable: true }
                ]
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
            },
            loadCategorias() {
                const url = `${baseApiUrl}/categorias`
                axios.get(url).then(res => {
                    this.categorias = res.data.map(item => {
                        return { ...item, value: item, text: item.nome }
                    })
                    this.categorias.push({value: {}, text: "Selecione uma categoria"})
                })
            },
            loadProdutos() {
                const url = `${baseApiUrl}/produtos`
                axios.get(url).then(res => {
                    this.produtos = res.data
                })
            },
            getById() {

            },
            reset() {
                this.loadProdutos()
                this.loadCategorias()
                this.produto = {}
                this.option = {}
                this.mode = 'save'
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
            remove() {
                const id = this.produto.id
                axios.delete(`${baseApiUrl}/produtos/${id}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            alternar() {
                if (this.form == 'cadastrar') this.form = 'ocultar'
                else if (this.form == 'ocultar') this.form = 'cadastrar'
            }
        },
        mounted() {
            this.loadProdutos(),
            this.loadCategorias()
        }
    }
</script>

<style>
    .produto {
        margin: 20px;
    }
</style>