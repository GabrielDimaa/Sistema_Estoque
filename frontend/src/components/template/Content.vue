<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios'
    import { baseApiUrl } from '../../global'

    export default {
        name: 'Content',
        data: function() {
            return {
                users: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'email', label: 'E-mail', sortable: true },
                ]
            }
        },
        methods: {
            loadUsers() {
                const url = `${baseApiUrl}/users`
                axios.get(url).then(res => {
                    this.users = res.data
                })
            }
        },
        mounted() {
            this.loadUsers()
        }
    }
</script>

<style>
    .content {
        grid-area: content;
        background-color: #EEEEEE;
        padding: 0 15px 0 15px;
    }
</style>