<template>
    <div class="categoria">
        <PageTitle icon="fas fa-folder-open" titulo="Categorias" subtitulo="Categorias / Subcategorias" color="#2B4162" />
        
        <b-form>
            <input type="hidden" id="categoria-id" v-model="categoria.id">

            <b-row>
                <b-col md="8" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input type="text" 
                            placeholder="Informe o nome da categoria/subcategoria..." 
                            v-model="categoria.nome" />
                    </b-form-group>
                </b-col>
                <b-col md="8" sm="12">
                    <b-form-group label="Categoria/Subcategoria pai:">
                        <b-form-select :options="categorias" v-model="option"/>
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
            :items="categorias"
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
        name: 'Categoria',
        components: { PageTitle },
        data: function() {
            return {
                categoria: {},
                categorias: [],
                option: {},
                id: null,
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                ]
            }
        },
        methods: {
            linhaSelecionada(item) {
                const selected = item[0]
                if (selected.id_pai || selected.categoria_id) {
                    this.id = selected.id
                    this.getById()
                } else {
                    this.categoria = selected
                }
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
            getById() {
                const url = `${baseApiUrl}/subcategorias/${this.id}`
                axios.get(url).then(res => {
                    this.categoria = res.data
                    this.id = null
                })
            },
            reset() {
                this.loadCategorias()
                this.categoria = {}
                this.option = {}
                this.id = null
            },
            save() {
                const categoria_ = {
                    id: this.categoria.id,
                    nome: this.categoria.nome,
                    id_pai: this.categoria.id_pai,
                    categoria_id: this.categoria.categoria_id
                }
                const Post_Put = categoria_.id ? 'put' : 'post'
                const id = categoria_.id ? `/${categoria_.id}` : ''

                if (!this.option.id && !categoria_.id_pai && !categoria_.categoria_id) {
                    axios[Post_Put](`${baseApiUrl}/categorias${id}`, categoria_) 
                        .then(() => {
                            this.reset()
                            this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                } else {
                    if (this.option.id) {
                        if (!this.option.categoria_id) {
                            this.categoria.categoria_id = this.option.id
                        } else {
                            this.categoria.id_pai = this.option.id
                            this.categoria.categoria_id = this.option.categoria_id
                        }
                    }
                    
                    axios[Post_Put](`${baseApiUrl}/subcategorias${id}`, this.categoria) 
                        .then(() => {
                            this.reset()
                            this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                }
            },
            remove() {
                const id = this.categoria.id
                const selected = this.categoria

                if (!selected.id_pai && !selected.categoria_id) {
                    axios.delete(`${baseApiUrl}/categorias/${id}`, this.categoria)
                    .then(() => {
                        this.reset()
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
                } else {
                    this.id = selected.id
                    this.getById()
                    axios.delete(`${baseApiUrl}/subcategorias/${this.categoria.id}`, this.categoria)
                        .then(() => {
                            this.reset()
                            this.$toasted.global.defaultSuccess()
                        })
                        .catch(showError)
                }
            }
        },
        mounted() {
            this.loadCategorias()
        }
    }
</script>

<style>
    .categoria {
        margin: 10px;
    }
</style>