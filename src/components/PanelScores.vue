<template>
  <div class="panel scores" id="blinkingDiv">
    <Score :characterName="'Player'" :characterLife="playerLife" :specialAttackPlayer="specialAttackPlayer" :mana="mana" :round="round" />
    <Score :characterName="'Monster'" :characterLife="monsterLife" :specialAttackMonster="specialAttackMonster"  />
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
    mana: {
      type: Number,
      required: false,
      default: 0,
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
    },
    round: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  components: {
    Score
  },
  created() {
    eventBus.whenPlayerLifeHasChanged(updatedPlayerLife => {
      // eslint-disable-next-line 
      this.playerLife = updatedPlayerLife
    })

    eventBus.whenMonsterLifeHasChanged(updatedMonsterLife => {
      // eslint-disable-next-line 
      this.monsterLife = updatedMonsterLife
    })
  },
};
</script>

<style scoped>
.scores {
    display: flex;
}

</style>