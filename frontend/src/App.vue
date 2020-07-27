<template>
    <div id="app">
        <Header titulo="Gerenciamento de Estoque"/>
        <Menu />
        <Content />
        <Footer />
    </div>
</template>

<script>
    import Header from './components/template/Header'
    import Menu from './components/template/Menu'
    import Content from './components/template/Content'
    import Footer from './components/template/Footer'

    export default {
        name: 'App',
        components: { Header, Menu, Content, Footer }
    }
</script>

<style>
    * { 
        margin: 0;
        font-family: 'Mulish', sans-serif;
    }

    #app {
        -webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 70px 1fr 40px;
        grid-template-columns: 200px 1fr;
        grid-template-areas: 
            "menu header"
            "menu content"
            "menu footer";
    }
</style>