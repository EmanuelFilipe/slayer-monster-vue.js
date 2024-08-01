<template>
  <div class="panel scores" id="blinkingDiv">
    <Score :characterName="'Player'" :characterLife="playerLife" :specialAttackPlayer="specialAttackPlayer" :idDiv="blinkingDiv_PLAYER" />
    <Score :characterName="'Monster'" :characterLife="monsterLife" :specialAttackMonster="specialAttackMonster" :idDiv="blinkingDiv_MONSTER"  />
  </div>
</template>

<script>
import Score from './Score.vue'
import eventBus from '../../eventBus';
export default {
  name: 'PanelScores',
  props: {
    playerLife: {
      type: Number,
      required: true,
      default: 0
    },
    monsterLife: {
      type: Number,
      required: true,
      default: 0
    },
    specialAttackPlayer: {
      type: Number,
      required: false,
      default: 0,
    },
    specialAttackMonster: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  components: {
    Score
  },
  updated() {
    eventBus.whenPlayerLifeHasChanged(updatedPlayerLife => {
      console.log('whenPlayerLifeHasChanged')
      // eslint-disable-next-line 
      this.playerLife = updatedPlayerLife
    })

    eventBus.whenMonsterLifeHasChanged(updatedMonsterLife => {
      console.log('whenMonsterLifeHasChanged')
      // eslint-disable-next-line 
      this.monsterLife = updatedMonsterLife
    })
  },
  data() {
    return {
      blinkingDiv_PLAYER: 'blinkingDiv_PLAYER',
      blinkingDiv_MONSTER: 'blinkingDiv_MONSTER'
    }
  }
};
</script>

<style scoped>
.scores {
    display: flex;
}

</style>