<template>
  <div class="score" :id="idDiv">
    <h1>{{ characterName }}</h1>
    <strong>HP</strong>
    <template v-if="characterName == 'Player'">
      <div class="life-bar">
        <div
          class="life"
          :class="{ danger: characterLife < 20 }"
          :style="{ width: characterLife + '%' }"
        ></div>
      </div>
      <div style="margin-bottom: 15px">{{ characterLife }}%</div>
    </template>
    <template v-else-if="characterName == 'Monster'">
      <div class="life-bar-monster">
        <div
          class="life"
          :class="{ danger: characterLife < 20 }"
          :style="{ width: characterLife + '%' }"
        ></div>
      </div>
      <div style="margin-bottom: 15px">{{ characterLife }}%</div>
    </template>
    <template v-if="characterName == 'Player'">
      <strong>SPECIAL ATTACK</strong>
      <div class="special-bar">
        <div class="special" :style="{ width: specialAttackPlayer + '%' }"></div>
      </div>
      <div>{{ specialAttackPlayer }}%</div>
    </template>
    <template v-else-if="characterName == 'Monster'">
      <strong>SPECIAL ATTACK</strong>
      <div class="special-bar">
        <div class="special" :style="{ width: specialAttackMonster + '%' }"></div>
      </div>
      <div>{{ specialAttackMonster }}%</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    characterName: {
      type: String,
      required: true,
    },
    characterLife: {
      type: Number,
      required: true,
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
      default: 0
    },
    idDiv: {
      type: String
    },
  },
};
</script>

<style scoped>
.score {
  flex: 1;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}

.score h1 {
  font-weight: 600;
  font-size: 1.6rem;
}

.life-bar {
  width: 80%;
  height: 20px;
  border: 1px solid #aaa;
}

.life-bar .life {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: green;
}

.life-bar .life.danger {
  background-color: red;
}

.life-bar-monster {
  width: 80%;
  height: 20px;
  border: 2px solid #aaa;
  /*border: 2px solid rgb(236, 171, 7);*/
}

.life-bar-monster .life {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: red;
}

/* .mana-bar {
  width: 80%;
  height: 20px;
  border: 1px solid #aaa;
}

.mana-bar .mana {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: rgb(11, 79, 226);
} */

.special-bar {
  width: 80%;
  height: 20px;
  border: 1px solid #aaa;
}

.special-bar .special {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: rgb(236, 118, 7);
}
</style>
