<template>
    <div class="categoria">
        <PageTitle icon="fas fa-folder-open" titulo="Categorias" subtitulo="Categorias / Subcategorias" color="#2B4162" />
        
        <b-form>
            <input type="hidden" id="cliente-id" >

            <b-row>
                <b-col md="8" sm="12">
                    <b-form-group label="Nome:">
                        <b-form-input type="text" 
                            placeholder="Informe o nome da categoria/subcategoria..." 
                             />
                    </b-form-group>
                </b-col>
                <b-col md="8" sm="12">
                    <b-form-group label="Categoria/Subcategoria pai:">
                        <b-form-input type="text" 
                            placeholder="Selecione a categoria/subcategoria pai..." 
                             />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col xs="12">
                    <b-button variant="success" >Salvar</b-button>
                    <b-button variant="danger" class="ml-2">Excluir</b-button>
                    <b-button variant="secondary" class="ml-2">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        
        <b-table :fields="fields" :items="categorias"></b-table>
    </div>
</template>

<script>
    import { baseApiUrl } from '@/global'
    import axios from 'axios'
    import PageTitle from '../template/PageTitle'
    
    export default {
        name: 'Categoria',
        components: { PageTitle },
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
    .categoria {
        margin: 10px;
    }
</style>