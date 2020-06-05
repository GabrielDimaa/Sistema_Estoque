<template>
    <div class="cliente">
        <b-table hover striped :items="clientes" :fields="fields"></b-table>
    </div>
</template>

<script>
    import { baseApiUrl } from '@/global'
    import axios from 'axios'

    export default {
        name: 'Cliente',
        data: function() {
            return {
                cliente: {},
                clientes: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'telefone', label: 'Telefone' },
                    { key: 'email', label: 'E-mail', sortable: true },
                    { key: 'endereco', label: 'Endereço', sortable: true },
                    { key: 'cidade', label: 'Cidade', sortable: true }
                ]
            }
        },
        methods: {
            loadClientes() {
                const url = `${baseApiUrl}/clientes`
                axios.get(url).then(res => {
                    this.clientes = res.data
                })
            }
        },
        mounted() {
            this.loadClientes()
        }
    }
</script>

<style>

</style>