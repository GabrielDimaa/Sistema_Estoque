<template>
    <nav class="menu">
        <hr>

        <router-link to="/estoque">
            <div class="menu-itens">
                <i class="fas fa-box icon1"></i>
                <span>Estoque</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/cadastros">
            <div class="menu-itens">
                <i class="fas fa-layer-group icon1"></i>
                <span>Cadastros</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/clientes">
            <div class="menu-itens">
                <i class="fas fa-users icon1"></i>
                <span>Clientes</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/fornecedores">
            <div class="menu-itens">
                <i class="fas fa-dolly icon1"></i>
                <span>Fornecedores</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/categorias">
            <div class="menu-itens">
                <i class="fas fa-folder-open"></i>
                <span>Categorias</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/produtos">
            <div class="menu-itens">
                <i class="fas fa-folder-open"></i>
                <span>Produtos</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>
        
    </nav>
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, rgb(2, 80, 116), rgb(74, 163, 201));
    }

    .menu-itens {
        display: flex;
        padding: 20px;
        color: #F7FFF7;
    }

    .menu-itens > span {
        margin: 0 20px 0 17px;
        flex-grow: 2;
        align-self: center;
    }

    .menu-itens .icon1 {
        flex-grow: 0;
        align-self: center;
    }

    .menu-itens .icon2 {
        flex-grow: 0;
        align-self: center;
    }

    .menu-itens:hover {
        background-color: #313131;
    }

    .menu a {
        text-decoration: none;
    }

    .menu a:hover {
        color: #F7FFF7;
        text-decoration: none;
    }
</style>