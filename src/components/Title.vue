<template>
  <div class="title">
    <div >
      <h1>MONSTER SLAYER</h1>
      <div class="button-title"><button style="text-align: center;" @click="callMainScreen" class="btn new-game">START GAME</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  methods: {
    callMainScreen() {
      this.$emit("redirecionarTela")
    }
  }
};
</script>

<style scoped>
.title {
    display: flex;
    justify-content: center;
    font-size: 60px;
    font-family: cursive;
    color: darkorange;
    font-weight: bold;
}

.button-title {
    display: grid;
    padding-top: 50px;
}

.new-game {
    font-size: 2.5rem;
}
</style>