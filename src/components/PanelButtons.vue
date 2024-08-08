<template>
  <div id="panel-button" class="panel buttons">
    <template v-if="running">
      <button @click="attack(false)" class="btn attack">Attack</button>
      <button @click="attack(true)" class="btn special-attack"
       :disabled="specialAttackPlayer < 100" :class="specialAttackPlayer < 100 ? 'button-disabled' : 'button-enabled, animate-border-special-attack'">
        Special Attack
      </button>
      <button @click="defenseFunction" class="btn" style="background-color: brown; color: white">Defense</button>
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
    defenseFunction: Function
  },
  methods: {
    attack(value) {
      this.$emit("attackPanelButton", value)
    },
  },
}
</script>

<style scoped>
.button-enabled {
  cursor: pointer; 
}

.button-disabled {
  cursor: not-allowed; 
  background-color: gray
}
#contador {
   height: 30px;
   border-radius: 15px;
   background-color: gold;
   color: black;
   outline: none;
   font-size: 15px;
   font-weight: 600;
}

.animate-border-special-attack {
    border: 1px solid white;
    animation: borderIncrease 2s ease-in-out;    
    animation-iteration-count: 20;
    font-weight: bold;
}

@keyframes borderIncrease {
    0%, 25% {
        border-width: 2px;
    }
    50%, 75% {
        border-width: 3px;
    }
    100% {
        border-width: 4px;
    }
}
</style>