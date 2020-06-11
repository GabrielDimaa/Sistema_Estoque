<template>
    <div class="produto">
        <b-table hover striped :items="produtos" :fields="fields"></b-table>
    </div>
</template>

<script>
    import { baseApiUrl, showError } from '@/global'
    import axios from 'axios'

    export default {
        name: 'Produto',
        data: function() {
            return {
                produto: {},
                produtos: [],
                fields: [
                    { key: 'id', label: 'Id', sortable: true },
                    { key: 'codigo', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'estoque', label: 'Quant. Estoque', sortable: true },
                    { key: 'preco_custo', label: 'Preço de Custo', sortable: true },
                    { key: 'preco_venda', label: 'Preço de Venda', sortable: true },
                    { key: 'categoria', label: 'Categoria', sortable: true },
                    { key: 'subcategoria_id', label: 'Subcategoria', sortable: true }
                ]
            }
        },
        methods: {
            loadProdutos() {
                const url = `${baseApiUrl}/produtos`
                axios.get(url).then(res => {
                    this.produtos = res.data
                })
            }
        },
        mounted() {
            this.loadProdutos()
        }
    }
</script>

<style>

</style>