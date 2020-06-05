<template>
    <div class="fornecedor">
        <b-table :items="fornecedores" :fields="fields"></b-table>
    </div>
</template>

<script>
    import { baseApiUrl } from '@/global'
    import axios from 'axios'

    export default {
        name: 'Fornecedor',
        data: function() {
            return {
                fornecedor: {},
                fornecedores: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'email', label: 'E-mail', sortable: true },
                    { key: 'telefone', label: 'Telefone' },
                    { key: 'cnpj', label: 'CNPJ' },
                    { key: 'endereco', label: 'Endereço', sortable: true },
                    { key: 'cidade', label: 'Cidade', sortable: true }
                ]
            }
        },
        methods: {
            loadFornecedores() {
                const url = `${baseApiUrl}/fornecedores`
                axios.get(url).then(res => {
                    this.fornecedores = res.data
                })
            }
        },
        mounted() {
            this.loadFornecedores()
        }
    }
</script>

<style>

</style>