<template>
    <div class="footer">
        <span>Copyright <strong>Gabriel</strong> © 2020</span>
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style>
    .footer {
        grid-area: footer;
        background-color:  #454545;
    
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>