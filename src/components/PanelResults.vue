<template>
  <div v-if="hasResult" class="panel result">
    <div v-if="monsterLife == 0" class="win">Você ganhou!!! :)</div>
    <div v-else class="lose">Você perdeu! :(</div>
  </div>
</template>

<script>
export default {
  name: "PanelResults",
  props: {
    hasResult: {
        type: Boolean,
        required: true,
        default: false
    },
    monsterLife: {
      type: Number,
      required: true,
      default: 0
    },
  }
};
</script>

<style scoped>
</style>