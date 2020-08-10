<template>
    <div class="fornecedor">
        <div class="container-top">
            <PageTitle icon="fas fa-dolly" titulo="Fornecedores" subtitulo="Consultar / Cadastrar" color="#41B883"/>
            <b-button variant="primary" @click="alternar">Cadastrar <i class="fas fa-bars" id="icon-bar"></i></b-button>
        </div>
        
        <b-form class="forms" v-if="form == 'cadastrar'">
            <input type="hidden" id="fornecedor-id" v-model="fornecedor.id">

            <b-row>
                <b-col md="8" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input type="text" 
                            placeholder="Informe o nome do fornecedor..." 
                            v-model="fornecedor.nome" />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="6">
                    <b-form-group label="E-mail:">
                        <b-form-input type="text"
                            placeholder="Informe o endereço de e-mail..."
                            v-model="fornecedor.email" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Telefone:">
                        <b-form-input type="text"
                            placeholder="Informe o telefone para contato..."
                            v-model="fornecedor.telefone" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="CNPJ:">
                        <b-form-input type="text"
                            placeholder="Informe o CNPJ..."
                            v-model="fornecedor.cnpj" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Endereço:">
                        <b-form-input type="text"
                            placeholder="Informe o endereço..."
                            v-model="fornecedor.endereco" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Cidade:">
                        <b-form-input type="text"
                            placeholder="Informe a Cidade..."
                            v-model="fornecedor.cidade" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col xs="12">
                    <b-button variant="success" @click="save">Salvar</b-button>
                    <b-button variant="danger" @click="remove" class="ml-2">Excluir</b-button>
                    <b-button variant="dark" @click="reset" class="ml-2">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table ref="selectableTable"
            selectable
            :select-mode="'single'"
            :items="fornecedores"
            :fields="fields"
            @row-selected="linhaSelecionada"
            responsive="sm">
        </b-table>
    </div>
</template>

<script>
    import { baseApiUrl, showError } from '@/global'
    import axios from 'axios'
    import PageTitle from '../template/PageTitle.vue'

    export default {
        name: 'Fornecedor',
        components: { PageTitle },
        data: function() {
            return {
                fornecedor: {},
                fornecedores: [],
                form: 'ocultar',
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'email', label: 'E-mail' },
                    { key: 'telefone', label: 'Telefone' },
                    { key: 'cnpj', label: 'CNPJ' },
                    { key: 'endereco', label: 'Endereço', sortable: true },
                    { key: 'cidade', label: 'Cidade', sortable: true }
                ]
            }
        },
        methods: {
            linhaSelecionada(item) {
                this.fornecedor = item[0]
                this.form = 'cadastrar'
            },
            loadFornecedores() {
                const url = `${baseApiUrl}/fornecedores`
                axios.get(url).then(res => {
                    this.fornecedores = res.data
                })
            },
            reset() {
                this.fornecedor = {}
                this.loadFornecedores()
            },
            save() {
                const Post_Put = this.fornecedor.id ? 'put' : 'post'
                const id = this.fornecedor.id ? `/${this.fornecedor.id}` : ''
                axios[Post_Put](`${baseApiUrl}/fornecedores${id}`, this.fornecedor)
                    .then(() => {
                        this.reset()
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
            },
            remove() {
                const id = this.fornecedor.id
                axios.delete(`${baseApiUrl}/fornecedores/${id}`, this.fornecedor)
                    .then(() => {
                        this.reset()
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
            },
            alternar() {
                if (this.form == 'cadastrar') this.form = 'ocultar'
                else if (this.form == 'ocultar') this.form = 'cadastrar'
            }
        },
        mounted() {
            this.loadFornecedores()
        }
    }
</script>

<style>
    .container-top {
        display: flex;
        flex-wrap: nowrap;
        margin: 20px;
        justify-content: space-between;
        align-items: center;
    }

    .container-top > PageTitle {
        flex: 1;
    }

    .container-top > b-button {
        flex: 1;
    }
</style>