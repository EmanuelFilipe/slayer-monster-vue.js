<template>
  <div id="app">
    <div
      id="selectionCharacter"
      class="citacoes"
      v-if="characterSelected.length == 0 && this.running"
    >
      <h2>Chose your player</h2>
      <span>
        <div style="text-align: center;">
          <button @click="idCharacter--">&lt;</button>
          <button @click="idCharacter++">&gt;</button>
        </div>
        <Character>
          <img
            slot="image"
            width="100%"
            height="100%"
            :src="
              require(`../src/assets/images/${characters[indice].name}.jpg`)
            "
          />
          <p slot="name">
            <strong>Name:</strong> {{ characters[indice].name }}
          </p>
          <p slot="attack">
            <strong>Attack:</strong> {{ characters[indice].attack }}
          </p>
          <p slot="specialAttack">
            <strong>Special Attack:</strong>
            {{ characters[indice].specialAttack }}
          </p>
          <p slot="defense">
            <strong>Defense:</strong> {{ characters[indice].defense }}
          </p>
        </Character>
      </span>
      <button
        style="background-color: firebrick"
        @click="funcPlayerSelected(characters[indice])"
      >
        SELECT CHARACTER
      </button>
    </div>
    <div v-else>
      <PanelScores
        :name="characterSelected.name"
        :playerLife="playerLife"
        :monsterLife="monsterLife"
        :specialAttackPlayer="specialAttackPlayer"
        :specialAttackMonster="specialAttackMonster"
      />
      <div style="margin-left: 50px" class="move-div"></div>
      <PanelResults :hasResult="hasResult" :monsterLife="monsterLife" />
      <PanelButtons
        :running="running"
        :startGameFunction="startGame"
        :healAndHurtFunction="healAndHurt"
        :updateRunningFunction="updateRunning"
        :defenseFunction="defense"
        :countOfHeals="countOfHeals"
        :specialAttackPlayer="specialAttackPlayer"
        @attackPanelButton="attack($event)"
      />
      <PanelLogs :logs="logs" />
    </div>
  </div>
</template>

<script>
import Character from "./components/Character.vue";
import PanelScores from "./components/PanelScores.vue";
import PanelResults from "./components/PanelResults.vue";
import PanelButtons from "./components/PanelButtons.vue";
import PanelLogs from "./components/PanelLogs.vue";
import { PLAYER, MONSTER } from "../src/constants.js";
export default {
  components: {
    PanelScores,
    PanelResults,
    PanelButtons,
    PanelLogs,
    Character,
  },
  data() {
    return {
      running: false,
      playerLife: 100,
      countOfHeals: 0,
      specialAttackPlayer: 0,
      specialAttackMonster: 0,
      monsterLife: 100,
      logs: [],
      round: 0,
      divScorePlayer: "",
      divScoreMonster: "",
      idCharacter: 0,
      characterSelected: [],
      characters: [
        {
          id: 1,
          name: "Knight",
          image: "/assets/images/knight.jpg",
          attack: [7, 12],
          specialAttack: [12, 17],
          defense: [10, 15],
          heal: [6, 10],
        },
        {
          id: 2,
          name: "Warrior",
          image: "../assets/images/warrior.jpg",
          attack: [8, 14],
          specialAttack: [13, 18],
          defense: [8, 13],
          heal: [6, 10],
        },
        {
          id: 3,
          name: "Ranger",
          image: "../assets/images/ranger.jpg",
          attack: [6, 11],
          specialAttack: [11, 16],
          defense: [7, 12],
          heal: [6, 10],
        },
        {
          id: 4,
          name: "Mage",
          image: "../assets/images/mage.jpg",
          attack: [4, 8],
          specialAttack: [15, 20],
          defense: [4, 6],
          heal: [10, 15],
        },
      ],
    };
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    },
    characterRound() {
      return this.round;
    },
    indice() {
      let result = Math.abs(this.idCharacter % 4);
      return result;
    },
  },
  methods: {
    attackButton() {
      this.attack(false);
    },
    updateRunning() {
      this.running = false;
      this.logs = [];
    },
    startGame() {
      this.round = 0;
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.countOfHeals = 3;
      this.specialAttackPlayer = 0;
      this.specialAttackMonster = 0;
      this.logs = [];
      this.characterSelected = [];
      this.idCharacter = 0;
      this.divScorePlayer = document.getElementById("blinkingDiv_PLAYER");
      this.divScoreMonster = document.getElementById("blinkingDiv_MONSTER");
    },
    defense() {
      this.registerLog("Player used Defense this turn", "player");
      this.turnMonster(true);
      this.blinkingDiv("blinkingDiv_PLAYER");
      this.attackAnimation(this.divScoreMonster, "move-div-monster");
      this.logs.unshift([]);
    },
    turnPlayer(special) {
      let attack = this.characterSelected.attack;
      this.hurtMonster(
        "monsterLife",
        attack[0],
        attack[1],
        special,
        "Player",
        "Monster",
        "player"
      );
      this.increaseSpecialAttackBarPlayer(special);
    },
    turnMonster(playerDefended = false) {
      if (this.monsterLife > 0) {
        this.hurtPlayer(
          "playerLife",
          10,
          17,
          this.specialAttackMonster == 100 ? true : false,
          "Monster",
          "Player",
          "monster",
          playerDefended
        );

        if (this.specialAttackMonster == 100) this.specialAttackMonster = 0;
        else this.increaseSpecialAttackBarMonster();
      }
    },
    attack(special) {
      this.round++;
      if (this.getCharacterRound() === PLAYER) {
        this.turnPlayer(special);
        this.blinkingDiv("blinkingDiv_MONSTER");
        this.attackAnimation(this.divScorePlayer, "move-div-player");
        this.round++;
      }

      if (this.getCharacterRound() === MONSTER) {
        var divButtons = document.getElementsByClassName("panel buttons");
        setTimeout(() => {
          divButtons[0].style.display = "none";
          this.turnMonster();
          this.blinkingDiv("blinkingDiv_PLAYER");
          this.attackAnimation(this.divScoreMonster, "move-div-monster");
        }, 2000);
        setTimeout(() => {
          divButtons[0].style.display = "";
        }, 4000);
      }
      //insert a empy row on array logs
      //this.logs.unshift([]);
    },
    attackAnimation(divCharacter, className) {
      divCharacter.classList.add(className);
      setTimeout(() => {
        divCharacter.classList.remove(className);
      }, 2000);
    },
    increaseSpecialAttackBarPlayer(special) {
      if (special) this.specialAttackPlayer = 0;
      else if (!special && this.playerLife > 0) this.specialAttackPlayer += 10;
    },
    increaseSpecialAttackBarMonster() {
      if (this.specialAttackMonster === 100) this.specialAttackMonster = 0;
      if (this.monsterLife > 0) this.specialAttackMonster += 20;
    },
    blinkingDiv(divName) {
      const blinkingDiv = document.getElementById(divName);
      let blinkingCount = 0;
      let maxBlinking = 2;
      const interval = 250;

      const blinkingSetInterval = setInterval(() => {
        blinkingDiv.style.visibility =
          blinkingDiv.style.visibility === "hidden" ? "visible" : "hidden";
        blinkingCount++;

        if (blinkingCount === maxBlinking * 2) {
          clearInterval(blinkingSetInterval);
          blinkingDiv.style.visibility = "visible";
        }
      }, interval);
    },
    hurtPlayer(
      prop,
      min,
      max,
      special,
      source,
      target,
      cls,
      defenseActivated
    ) {
      const plus = special ? this.getRandom(20, 30) : 0;
      //const damage = this.getRandom(min + plus, max + plus);
      const damage = this.getDamage(min, max, plus, defenseActivated);
      // evita que o numero seja negativo, nesse caso, retornará 0
      this[prop] = Math.max(this[prop] - damage, 0);

      if (special) {
        this.registerLog(
          `${source} hit the ${target} with special attack damage: ${damage}`,
          cls
        );
      } else {
        this.registerLog(
          `${source} hit the ${target} with damage: ${damage}`,
          cls
        );
      }
    },
    hurtMonster(prop, min, max, special, source, target, cls) {
      let specialAttack = this.characterSelected.specialAttack;
      const plus = special
        ? this.getRandom(specialAttack[0], specialAttack[1])
        : 0;
      //const damage = this.getRandom(min + plus, max + plus);
      const damage = this.getDamage(min, max, plus, false);
      // evita que o numero seja negativo, nesse caso, retornará 0
      this[prop] = Math.max(this[prop] - damage, 0);

      if (special) {
        this.registerLog(
          `${source} hit the ${target} with special attack damage: ${damage}`,
          cls
        );
      } else {
        this.registerLog(
          `${source} hit the ${target} with damage: ${damage}`,
          cls
        );
      }
    },
    /**
     * Method that calculates the damage to be inflicted
     * @param {*} prop: quem irá receber o dano: jogador ou monstro
     * @param {*} source: a origem do ataque
     * @param {*} target: o alvo do ataque
     * @param {*} cls: qual a classe que será passada par quem se feriu
     */
    hurtEnemy(prop, min, max, special, source, target, cls, defenseActivated) {
      const plus = special ? this.getRandom(5, 10) : 0;
      //const damage = this.getRandom(min + plus, max + plus);
      const damage = this.getDamage(min, max, plus, defenseActivated);
      // evita que o numero seja negativo, nesse caso, retornará 0
      this[prop] = Math.max(this[prop] - damage, 0);

      if (special && prop === "monsterLife") {
        this.registerLog(
          `${source} hit the ${target} with special attack damage: ${damage}`,
          cls
        );
      } else {
        this.registerLog(
          `${source} hit the ${target} with damage: ${damage}`,
          cls
        );
      }
    },
    getDamage(min, max, plus, defenseActivated) {
      let damage = this.getRandom(min + plus, max + plus);

      if (defenseActivated) {
        const playerDefense = this.characterSelected.defense;
        let defense = this.getRandom(playerDefense[0], playerDefense[1]);
        damage -= defense;
      }

      return damage;
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    healAndHurt() {
      this.heal();
      this.countOfHeals -= 1;
      this.turnMonster();
      this.blinkingDiv("blinkingDiv_PLAYER");
      this.attackAnimation(this.divScoreMonster, "move-div-monster");
      //insert a empy row on array logs
      this.logs.unshift([]);
    },
    heal() {
      let healPlayer = this.characterSelected.heal;
      const heal = this.getRandom(healPlayer[0], healPlayer[1]);
      // se o resultado der maior que 100, irá pegar o valor 100
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(`Player received health: ${heal}`, "player");
    },
    registerLog(text, cls) {
      // o registro adicionado sempre será o primeiro da lista
      this.logs.unshift({ text, cls });
    },
    getCharacterRound() {
      let characterTurn = "";
      if (this.round % 2 !== 0) characterTurn = PLAYER;
      else if (this.round % 2 === 0) characterTurn = MONSTER;
      return characterTurn;
    },
    funcPlayerSelected(character) {
      this.characterSelected = character;
    },
  },
  watch: {
    // sempre que essa variavel for alterada, será monitorada
    hasResult(value) {
      if (value) this.running = false;
    },
  },
};
</script>

<style>
button {
  outline: none;
  padding: 5px 15px 10px;
  margin: 10px 5px;
  border-radius: 3px;
  font-size: 2rem;
  font-weight: 300;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}

.citacoes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>