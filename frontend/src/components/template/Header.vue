<template>
    <header class="header">
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
        }
    }
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to left, rgb(86, 86, 87), rgb(34, 34, 36));

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .titulo {
        font-size:1.2rem;
        color: #ffffff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }
</style>