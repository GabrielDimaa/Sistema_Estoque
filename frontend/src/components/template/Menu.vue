<template>
    <nav class="menu">
        <router-link to="/">
            <div class="img-logo">
                <div class="img">
                    <img src="https://demos.creative-tim.com/vue-black-dashboard-pro/img/icon-vue.png" alt="app-logo">
                </div>
                <div class="titulo">
                    <p>Gestão da Empresa</p>
                </div>
            </div>
        </router-link>

        <hr>

        <router-link to="/cadastros">
            <div class="menu-itens">
                <i class="fas fa-layer-group icon1"></i>
                <span>Dashboard</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/estoque">
            <div class="menu-itens">
                <i class="fas fa-cubes icon1"></i>
                <span>Estoque</span>
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
                <i class="fas fa-align-left icon1"></i>
                <span>Categorias</span>
                <i class="fas fa-angle-right icon2"></i>
            </div>
        </router-link>

        <router-link to="/produtos">
            <div class="menu-itens">
                <i class="fas fa-box-open icon1"></i>
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
        background-color: rgb(39, 39, 39);
    }

    .menu-itens {
        display: flex;
        padding: 20px;
        color: hsla(0, 0%, 100%, .9);
    }

    .menu-itens > span {
        margin: 0 20px 0 17px;
        flex-grow: 2;
        align-self: center;
        font-weight: 400;
    }

    .menu-itens .icon1 {
        font-size: 22px;
        flex-grow: 0;
        align-self: center;
    }

    .menu-itens .icon2 {
        flex-grow: 0;
        align-self: center;
        align-items: flex-end;
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

    .img-logo {
        margin: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
    }

    .img > img {
        width: 50px;
        height: 50px;
        background-color: hsla(0, 0%, 100%, .9);
        border-radius: 50%;
        flex-grow: 0;
        margin-bottom: 10px;
    }

    .titulo > p {
        flex-grow: 0;
        color: hsla(0, 0%, 100%, .9);
    }

    hr { 
        background-color: hsla(0, 0%, 100%, .9);
        margin: 0 10px;
    }
</style>