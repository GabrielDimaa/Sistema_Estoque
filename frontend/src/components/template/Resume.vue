<template>
    <div class="resume">
        <div class="icon" :style="style">
            <div class="icon_">
                <i :class="icon" id="icone"></i>
            </div>
        </div>

        <div class="titulo-valor">
            <p>{{ titulo }}</p>
            <h2>{{ value }}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Resume',
        props: ['icon', 'titulo', 'color', 'value'],
        // computed: {
        //     style() {
        //         return "color: " + (this.color || "#0000"), "font-size: 55px"
        //     }
        // }
        computed: {
            style() {
                return {
                    backgroundColor: this.color,
                    width: '110px',
                    height: '113px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '5px 5px 5px 5px rgba(172, 170, 170, 0.6)',
                    marginTop: '-37px',
                    borderRadius: '4px'
                }
            }
        }
    }
</script>

<style>
    .resume {
        display: flex;
        background-color: rgb(255, 255, 255);
        box-shadow: 5px 5px 5px 5px rgba(199, 198, 198, 0.5);
        border-radius: 7px;
        padding: 13px 13px 20px 13px;
        margin-bottom: 35px;
    }

    .resume:hover {
        background-color: #f3efef;
    }

    #icone {
        font-size: 37px;
        color: rgb(255, 255, 255);
    }

    .resume .titulo-valor {
        width: 150px;
        padding-right: 10px;
    }

    .resume .titulo-valor > p {
        font-size: 1.1rem;
        align-self: center;
        text-align: end;
        color: #757070;
    }

    .resume .titulo-valor > h2 {
        text-align: end;
        color: #000000;
    }
</style>