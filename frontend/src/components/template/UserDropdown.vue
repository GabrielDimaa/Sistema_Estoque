<template>
    <div class="user-dropdown">
        <div class="user-button">
            <div class="user-dropdown-icon">
               <i class="fas fa-user-circle"></i>
            </div>
            <span class="d-none s-sm-block">{{ user.name }}</span>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-options">
            <router-link to="/admin" >
                <i class="fa fa-cogs"></i>Administração
            </router-link>
            <a href @click.prevent="logout"><i class="fas fa-sign-out-alt"></i>Sair</a>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Gravatar from 'vue-gravatar'

    export default {
        name: 'UserDropdown',
        components: { Gravatar },
        computed: mapState(['user'])
    }
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #FFF;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover {
        background-color: #174b34;
    }

    .user-button span {
        margin-right: 10px;
    }

    .user-dropdown-icon {
        margin: 0 10px;
    }

    .user-dropdown-icon > i {
        max-height: 37px;
        border-radius: 5px;
        color: #EDEDED;
    }

    .user-dropdown-options {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-options {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-options a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-options a:hover {
        background-color: #EDEDED;
        text-decoration: none;
        color: #000;
    }
</style>