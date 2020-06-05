<template>
    <nav class="menu">
        <div class="menu-itens">
            <i class="fas fa-box icon1"></i>
            <span>Estoque</span>
            <i class="fas fa-angle-right icon2"></i>
        </div>
        <div class="menu-itens">
            <i class="fas fa-layer-group icon1"></i>
            <span>Cadastros</span>
            <i class="fas fa-angle-right icon2"></i>
        </div>
        <div class="menu-itens">
            <i class="fas fa-users icon1"></i>
            <span>Clientes</span>
            <i class="fas fa-angle-right icon2"></i>
        </div>
        <div class="menu-itens">
            <i class="fas fa-dolly icon1"></i>
            <span>Fornecedores</span>
            <i class="fas fa-angle-right icon2"></i>
        </div>
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
</style>