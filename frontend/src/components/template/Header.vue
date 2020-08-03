<template>
    <header class="header">
        <a href="#" class="toggle" @click="toggleMenu">
            <i class="fas fa-ellipsis-v" id="icon-header"></i>
        </a>
        
        <h1 class="titulo">
            <router-link to="/">{{ titulo }}</router-link>
        </h1>

        <UserDropdown />
    </header>
</template>

<script>
    import UserDropdown from '../template/UserDropdown'

    export default {
        name: 'Header',
        components: { UserDropdown },
        props: {
            titulo: String,
            UserDropdown: Boolean
        },
        methods: {
            toggleMenu() {
                this.$store.commit('toggleMenu')
            }
        }
    }
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #41B883, #41B883, #157248);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header .toggle {
        background-color: #EAEAEA;
        border-radius: 100%;
        width: 35px;
        height: 35px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header .toggle:hover {
        background-color: #e2d9d9e5;
    }

    #icon-header {
        color: #269764;
    }

    .titulo {
        font-size:1.2rem;
        color: hsla(0, 0%, 100%, .9);
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .titulo a {
        color: hsla(0, 0%, 100%, .9);
        text-decoration: none;
    }

    .titulo a:hover {
        color: hsla(0, 0%, 100%, .9);
        text-decoration: none;
    }
</style>