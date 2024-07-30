<template>
  <div class="panel buttons">
    <template v-if="running">
      <button @click="attack(false)" class="btn attack">Attack</button>
      <button @click="attack(true)" class="btn special-attack"
       :disabled="specialAttackPlayer < 50" :class="specialAttackPlayer < 50 ? 'button-disabled' : 'button-enabled'">
        Special Attack
      </button>
      <button @click="deffenseFunction" class="btn" style="background-color: brown; color: white">Deffense</button>
      <button :disabled="countOfHeals == 0" @click="healAndHurtFunction" class="btn heal" :class="countOfHeals > 0 ? 'button-enabled' : 'button-disabled'">
        Heal <button id="contador" @click.prevent> {{ countOfHeals }}</button>
      </button>
      <button @click="updateRunningFunction" class="btn give-up">
        Give Up
      </button>
    </template>
    <button v-else @click="startGameFunction" class="btn new-game">
      New Game
    </button>
  </div>
</template>

<script>
export default {
  name: "PanelButtons",
  props: {
    running: {
      type: Boolean,
      required: true,
      default: false,
    },
    countOfHeals: {
      type: Number,
      required: true,
      default: 0
    },
    specialAttackPlayer: {
      type: Number,
      required: true,
      default: 0,
    },
    startGameFunction: Function,
    healAndHurtFunction: Function,
    updateRunningFunction: Function,
    deffenseFunction: Function
  },
  methods: {
    attack(value) {
      this.$emit("attackPanelButton", value)
    },
  }
  
}
</script>

<style scoped>
/* .contador span {
   border-bottom: 1px solid #ccc;
   height: 30px;
   padding: 5px 25px;
} */

.button-enabled {
  cursor: pointer; 
}

.button-disabled {
  cursor: not-allowed; 
  background-color: gray
}
#contador {
   height: 30px;
   width: 30px;
   border-radius: 15px;
   background-color: gold;
   color: black;
   margin-left: 10px;
   outline: none;
   font-size: 15px;
   font-weight: 600;
}
</style>