<template>
  <div id="app">
    <PanelScores
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
      :deffenseFunction="deffense"
      :countOfHeals="countOfHeals"
      :specialAttackPlayer="specialAttackPlayer"
      @attackPanelButton="attack($event)"
    />
    <PanelLogs :logs="logs" />
  </div>
</template>

<script>
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
  },
  data() {
    return {
      running: false,
      playerLife: 100,
      deffensePlayer: 8,
      countOfHeals: 0,
      specialAttackPlayer: 0,
      specialAttackMonster: 0,
      monsterLife: 100,
      logs: [],
      round: 0,
      divScorePlayer: "",
      divScoreMonster: "",
    };
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    },
    characterRound() {
      return this.round;
    },
  },
  methods: {
    attackButton() {
      this.attack(false);
    },
    updateRunning() {
      this.running = false;
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
      this.divScorePlayer = document.getElementById("blinkingDiv_PLAYER");
      this.divScoreMonster = document.getElementById("blinkingDiv_MONSTER");
    },
    deffense() {
      this.registerLog("Player used Defense this turn", "player");
      this.turnMonster();
      this.blinkingDiv("blinkingDiv_PLAYER");
      this.attackAnimation(this.divScoreMonster, "move-div-monster");
      this.logs.unshift([]);
    },
    turnPlayer(special) {
      this.hurtMonster(
        "monsterLife",
        5,
        10,
        special,
        "Player",
        "Monster",
        "player"
      );
      this.increaseSpecialAttackBarPlayer(special);
    },
    turnMonster() {
      if (this.monsterLife > 0) {
        this.hurtPlayer(
          "playerLife",
          8,
          15,
          this.specialAttackMonster == 100 ? true : false,
          "Monster",
          "Player",
          "monster"
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
      deffenseActivated
    ) {
      const plus = special ? this.getRandom(20, 30) : 0;
      //const damage = this.getRandom(min + plus, max + plus);
      const damage = this.getDamage(min, max, plus, deffenseActivated);
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
      const plus = special ? this.getRandom(15, 25) : 0;
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
    hurtEnemy(prop, min, max, special, source, target, cls, deffenseActivated) {
      const plus = special ? this.getRandom(5, 10) : 0;
      //const damage = this.getRandom(min + plus, max + plus);
      const damage = this.getDamage(min, max, plus, deffenseActivated);
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
    getDamage(min, max, plus, deffenseActivated) {
      let damage = this.getRandom(min + plus, max + plus);

      if (deffenseActivated) damage -= this.deffensePlayer;

      return damage;
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    healAndHurt() {
      this.heal(10, 15);
      this.countOfHeals -= 1;
      this.turnMonster();
      this.blinkingDiv("blinkingDiv_PLAYER");
      this.attackAnimation(this.divScoreMonster, "move-div-monster");
      //insert a empy row on array logs
      this.logs.unshift([]);
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
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
  },
  watch: {
    // sempre que essa variavel for alterada, será monitorada
    hasResult(value) {
      if (value) this.running = false;
    },
  },
};
</script>