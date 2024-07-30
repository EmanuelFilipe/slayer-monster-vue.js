<template>
    <div class="citacoes">
        <span>
            <button @click="numero--">&lt;</button>
            <button @click="numero++">&gt;</button>
        </span>
        
        <p>Chose your player</p>
        <!-- {{ citacoes[indice].texto }} -->
        <!-- <Citacao :citacao="citacoes[indice]" /> -->

        <!-- UTILIZANDO SLOT -->
        <!-- <Citacao>
            <h2>{{ citacoes[indice].autor }}</h2>
            <p>{{ citacoes[indice].texto }}</p>
            <h6>{{ citacoes[indice].fonte }}</h6>
        </Citacao> -->

        <!-- <Citacao>
            <h2 slot="autor">{{ citacoes[indice].autor }}</h2>
            <p slot="texto">{{ citacoes[indice].texto }}</p>
            <h6 slot="fonte">{{ citacoes[indice].fonte }}</h6>
        </Citacao> -->
    </div>
</template>

<script>
//mport Citacao from './Citacao.vue'

export default {
    //components: { Citacao },
    data() {
        return {
            numero: 0,
            citacoes: [{
                id: 1,
                fonte: 'Jornal do Empreendedor',
                texto: 'Lembre-se sempre que você é absolutamente único. Assim como todos os outros.',
                autor: 'Margaret Mead'
            }, { 
                id: 2,
                fonte: 'Frases de Mãe',
                texto: 'Isso não é um quarto, é um chiqueiro.',
                autor: 'Roberta'
            }, {
                id: 3,
                fonte: 'Frases de Pai',
                texto: 'Vou contar até 3! 1, 2, 2...',
                autor: 'Gustavo'
            }]
        }
    },
    computed: {
        indice() {
            return Math.abs(this.numero % 3)
        }
    }
}
</script>

<style scoped>
    .citacoes {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
