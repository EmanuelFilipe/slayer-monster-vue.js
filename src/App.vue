<template>
  <div id="app">
    <keep-alive>
			<component :is="componente" @redirecionarTela="redirectComponent"/>
		</keep-alive>
  </div>
</template>

<script>
import Title from './components/Title.vue'
import MainGame from './components/MainGame.vue'
  export default {
    name: 'App',
    components: {
      Title,
      MainGame
    },
    data() {
      return {
        componente: 'Title'
      }
    },
    methods: {
      redirectComponent() {
        this.componente = 'MainGame'
      }
    }
  }
</script>

<style scoped>

</style>