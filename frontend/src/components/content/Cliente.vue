<template>
    <div class="cliente">
        <PageTitle icon="fas fa-users" titulo="Clientes" subtitulo="Consultar / Cadastrar" color="rgb(42, 196, 132)" />
        <b-form>
            <input type="hidden" id="cliente-id" v-model="cliente.id">

            <b-row>
                <b-col md="8" sm="12">
                    <b-form-group label="Nome e sobrenome:">
                        <b-form-input type="text" 
                            placeholder="Informe o nome do cliente..." 
                            v-model="cliente.nome" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:">
                        <b-form-input type="text"
                            placeholder="Informe o endereço de e-mail..."
                            v-model="cliente.email" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Telefone:">
                        <b-form-input type="text"
                            placeholder="Informe o telefone para contato..."
                            v-model="cliente.telefone" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Telefone alternativo:">
                        <b-form-input type="text"
                            placeholder="Informe um telefone alternativo..."
                            v-model="cliente.telefoneAlt" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Endereço:">
                        <b-form-input type="text"
                            placeholder="Informe o endereço..."
                            v-model="cliente.endereco" />
                    </b-form-group>
                </b-col>
                <b-col md="2" sm="6">
                    <b-form-group label="Número:">
                        <b-form-input type="text"
                            placeholder="Número do endereço..."
                            v-model="cliente.numero" />
                    </b-form-group>
                </b-col>
                <b-col md="4" sm="6">
                    <b-form-group label="Cidade:">
                        <b-form-input type="text"
                            placeholder="Informe a cidade..."
                            v-model="cliente.cidade" />
                    </b-form-group>
                </b-col>
                <b-col md="2" sm="6">
                    <b-form-group label="CEP:">
                        <b-form-input type="text"
                            placeholder="Informe a CEP..."
                            v-model="cliente.cep" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col xs="12">
                    <b-button variant="success" @click="save">Salvar</b-button>
                    <b-button variant="danger" @click="remove" class="ml-2">Excluir</b-button>
                    <b-button variant="secondary" @click="reset" class="ml-2">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-table ref="selectableTable"
            selectable
            :select-mode="'single'"
            :items="clientes"
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
        name: 'Cliente',
        components: { PageTitle },
        data: function() {
            return {
                cliente: {},
                clientes: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'telefone', label: 'Telefone' },
                    { key: 'endereco', label: 'Endereço', sortable: true },
                    { key: 'numero', label: 'Número' },
                    { key: 'cidade', label: 'Cidade', sortable: true }
                ]
            }
        },
        methods: {
            linhaSelecionada(item) {
                this.cliente = item[0]
            },
            loadClientes() {
                const url = `${baseApiUrl}/clientes`
                axios.get(url).then(res => {
                    this.clientes = res.data
                })
            },
            reset() {
                this.cliente = {}
                this.loadClientes()
            },
            save() {
                const Post_Put = this.cliente.id ? 'put' : 'post'
                const id = this.cliente.id ? `/${this.cliente.id}` : ''
                axios[Post_Put](`${baseApiUrl}/clientes${id}`, this.cliente)
                    .then(() => {
                        this.reset()
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
            },
            remove() {
                const id = this.cliente.id
                axios.delete(`${baseApiUrl}/clientes/${id}`, this.cliente)
                    .then(() => {
                        this.reset()
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
            }
        },
        mounted() {
            this.loadClientes()
        }
    }
</script>

<style>
    .cliente {
        margin: 10px;
    }
</style>