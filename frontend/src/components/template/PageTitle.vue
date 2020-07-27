<template>
    <div class="page-title">
        <h1><i :class="icon" :style="style"></i> {{ titulo }}</h1>
        <h2>{{ subtitulo }}</h2>
        <hr>
    </div>
</template>

<script>
    export default {
        name: 'PageTitle',
        props: [ 'icon', 'titulo', 'subtitulo', 'color' ],
        computed: {
            style() {
                return "color: " + (this.color || "#0000")
            }
        }
    }
</script>

<style>
    .page-title > h2 {
        font-size: 1rem;
        padding-left: 5px;
        color: #5f5f5f;
    }
</style>