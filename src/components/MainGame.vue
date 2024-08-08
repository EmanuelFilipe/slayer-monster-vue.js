<template>
    <div>
      <div
        id="selectionCharacter"
        class="citacoes"
        v-if="!this.running && !this.newGame"
      >
        <SelectionPlayer
          :idCharacter="idCharacter"
          :characters="characters"
          :indice="indice"
          :alterValueIdCharacterMinus="reduceValueIdCharacter"
          :alterValueIdCharacterMore="increaseValueIdCharacter"
          @playerWasSelected="funcPlayerSelected($event)"
        />
      </div>
      <div v-else-if="this.running || this.newGame">
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
          :startGameFunction="startNewGame"
          :healAndHurtFunction="healAndHurt"
          :updateRunningFunction="updateRunning"
          :defenseFunction="defense"
          :countOfHeals="countOfHeals"
          :specialAttackPlayer="specialAttackPlayer"
          @attackPanelButton="attack($event)"
        />
        <!-- <div class="citacoes">
          <img :src="gifSrc" alt="my gif" class="my-gif-class" />
        </div> -->
        <PanelLogs :logs="logs" />
      </div>
    </div>
  </template>
  
  <script>
  import SelectionPlayer from './SelectionPlayer.vue'
  import PanelScores from "./PanelScores.vue";
  import PanelResults from "./PanelResults.vue";
  import PanelButtons from "./PanelButtons.vue";
  import PanelLogs from "./PanelLogs.vue";
  import { PLAYER, MONSTER } from "@/constants";
  import myGif from "@/assets/images/rolling-dice.gif";
  export default {
    components: {
      PanelScores,
      PanelResults,
      PanelButtons,
      PanelLogs,
      SelectionPlayer,
    },
    data() {
      return {
        gifSrc: myGif,
        running: false,
        newGame: false,
        playerLife: 100,
        countOfHeals: 0,
        specialAttackPlayer: 0,
        specialAttackMonster: 0,
        monsterLife: 100,
        agilityMonster: 15,
        logs: [],
        round: 0,
        idCharacter: 0,
        dificultDodgePlayer: 0,
        dificultDodgeMonster: 0,
        characterSelected: [],
        characters: [
          {
            id: 1,
            name: "Knight",
            image: "/assets/images/knight.jpg",
            attack: [7, 12],
            specialAttack: [12, 17],
            defense: [10, 15],
            agility: 12,
            heal: [6, 10],
          },
          {
            id: 2,
            name: "Warrior",
            image: "../assets/images/warrior.jpg",
            attack: [8, 14],
            specialAttack: [13, 18],
            defense: [8, 13],
            agility: 13,
            heal: [6, 10],
          },
          {
            id: 3,
            name: "Ranger",
            image: "../assets/images/ranger.jpg",
            attack: [6, 11],
            specialAttack: [11, 16],
            defense: [7, 12],
            agility: 16,
            heal: [6, 10],
          },
          {
            id: 4,
            name: "Mage",
            image: "../assets/images/mage.jpg",
            attack: [4, 8],
            specialAttack: [15, 20],
            defense: [4, 6],
            agility: 10,
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
      startNewGame() {
        this.newGame = false
        this.running = false
      },
      startGame() {
        this.round = 0;
        this.running = true;
        this.newGame = false;
        this.playerLife = 100;
        this.monsterLife = 100;
        this.countOfHeals = 3;
        this.specialAttackPlayer = 0;
        this.specialAttackMonster = 0;
        this.logs = [];
        this.characterSelected = [];
        console.log('personagem zerado', this.characterSelected.id !== undefined)
        this.idCharacter = 0;
        this.dificultDodgePlayer = 28;
        this.dificultDodgeMonster = 35;
      },
      defense() {
        this.registerLog("Player used Defense this turn", "player");
        this.turnMonster(true);
        this.blinkingDiv("blinkingDiv_PLAYER");
        this.attackAnimation(document.getElementById("blinkingDiv_MONSTER"), "move-div-monster");
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
      },
      attack(special) {
        this.round++;
        if (this.getCharacterRound() === PLAYER && (this.playerLife > 0 && this.monsterLife > 0)) {
          if (!this.dodgeAttemptMonster() || special) {
            console.log("monstro falou na esquiva");
            this.turnPlayer(special);
            this.blinkingDiv("blinkingDiv_MONSTER");
            this.attackAnimation(document.getElementById("blinkingDiv_PLAYER"), "move-div-player");
          } else {
            console.log("monstro conseguiu se esquivar");
            this.registerLog("Monster dodged the attack", "monster");
          }
          this.round++;
        }
  
        if (this.getCharacterRound() === MONSTER && (this.monsterLife > 0 && this.playerLife > 0 )) {
          if (!this.dodgeAttemptPlayer()) {
            console.log("player falhou na esquiva");
            var divButtons = document.getElementsByClassName("panel buttons");
            setTimeout(() => {
                if (divButtons[0]?.style?.display)
                divButtons[0].style.display = "none"
              this.turnMonster();
              this.blinkingDiv("blinkingDiv_PLAYER");
              this.attackAnimation(document.getElementById("blinkingDiv_MONSTER"), "move-div-monster");
            }, 2000);
            setTimeout(() => {
              if (divButtons[0]?.style?.display)
                divButtons[0].style.display = ""
            }, 4000);
          } else {
            console.log("player se esquivou");
            setTimeout(() => {
              this.registerLog(`Player dodged the attack`, "player");
            }, 2000);
          }
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
        else if (!special && this.playerLife > 0) {
          if (this.specialAttackPlayer < 100) this.specialAttackPlayer += 20;
        }
      },
      increaseSpecialAttackBarMonster() {
        if (this.specialAttackMonster === 100) this.specialAttackMonster = 0;
  
        if (this.monsterLife > 0) {
          if (this.specialAttackMonster + 13 > 100)
            this.specialAttackMonster = 100;
          else this.specialAttackMonster += 13;
        }
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
      hurtPlayer(prop, min, max, special, source, target, cls, defenseActivated) {
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
        this.attackAnimation(document.getElementById("blinkingDiv_MONSTER"), "move-div-monster");
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
          this.startGame()
          this.characterSelected = character;
      },
      reduceValueIdCharacter() {
        this.idCharacter--;
        console.log("reduceValueIdCharacter", this.idCharacter);
      },
      increaseValueIdCharacter() {
        this.idCharacter++;
        console.log("increaseValueIdCharacter", this.idCharacter);
      },
      dodgeAttemptPlayer() {
        const roll = this.rollDice();
        var result = this.testDiceRoll(
          roll,
          this.characterSelected.agility,
          this.dificultDodgePlayer
        );
        return result;
      },
      dodgeAttemptMonster() {
        const roll = this.rollDice();
        var result = this.testDiceRoll(
          roll,
          this.agilityMonster,
          this.dificultDodgeMonster
        );
        return result;
      },
      testDiceRoll(roll, agility, dificultDodge) {
        //critical hit
        if (roll === 20) return true;
        // critic fail
        else if (roll === 1) return false;
        else if (roll + agility >= dificultDodge) return true;
        else return false;
      },
      rollDice() {
        // generate aleatory number between 1 and 20
        const roll = Math.floor(Math.random() * 20) + 1;
        console.log("roll", roll);
        return roll;
      },
    },
    watch: {
      // sempre que essa variavel for alterada, será monitorada
      hasResult(value) {
        if (value && !this.newGame)  {
          this.running = false;
          this.newGame = true  
        }
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
  .my-gif-class {
    width: 100px;
    height: auto;
    text-align: center;
    align-content: center;
  }
  </style>