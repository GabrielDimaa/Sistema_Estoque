<template>
    <div class="dashboard">
        <PageTitle icon="fas fa-th-large" titulo="Dashboard" subtitulo="Resumo das operações" color="#41B883" />

        <div class="container-resume">
            <Resume icon="fas fa-tag" titulo="Produtos" color="#39A9DB" value="+ 38"/>
            <Resume icon="fas fa-user-tag" titulo="Clientes" color="#CE6C47" value="+ 118"/>
            <Resume icon="fas fa-dolly" titulo="Fornecedores" color="#E56399" value="+ 6"/>
        </div>
    </div>
</template>

<script>
    import Resume from '../template/Resume'
    import PageTitle from '../template/PageTitle'

    export default {
        name: 'Dashboard',
        components: { Resume, PageTitle }
    }
</script>

<style>
    .dashboard {
        margin: 20px;
    }

    .container-resume {
        display: flex;
        justify-content: space-between;
        padding: 25px;
    }
</style>