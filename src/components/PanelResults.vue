<template>
  <div v-if="hasResult" class="panel result">
    <div v-if="monsterLife == 0" class="win">YOU WIN!!! :)</div>
    <div v-else class="lose">YOU LOSE! :(</div>
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