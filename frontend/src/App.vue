<template>
    <div id="app" :class="{'hide-menu': !visibilidadeMenu}">
        <Header titulo="Gestão da Empresa"/>
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
    import { mapState } from 'vuex' 

    export default {
        name: 'App',
        components: { Header, Menu, Content, Footer },
        computed: mapState(['visibilidadeMenu']),
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
        grid-template-columns: 210px 1fr;
        grid-template-areas: 
            "menu header"
            "menu content"
            "menu footer";
    }

    #app.hide-menu {
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>