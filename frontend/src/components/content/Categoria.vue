<template>
    <div class="categoria">
        <b-table :fields="fields" :items="categorias"></b-table>
    </div>
</template>

<script>
    import { baseApiUrl } from '@/global'
    import axios from 'axios'
    
    export default {
        name: 'Categoria',
        data: function() {
            return {
                categoria: {},
                categorias: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                ]
            }
        },
        methods: {
            loadCategorias() {
                const url = `${baseApiUrl}/categorias`
                axios.get(url).then(res => {
                    this.categorias = res.data
                })
            }
        },
        mounted() {
            this.loadCategorias()
        }
    }
</script>

<style>

</style>