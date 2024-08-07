<template>
  <div>
    <div style="text-align: center"><h1>Chose your player</h1></div> 
    <span>
      <div style="text-align: center">
        <button @click="alterValueIdCharacterMinus">&lt;</button>
        <button @click="alterValueIdCharacterMore">&gt;</button>
      </div>
      <Character>
        <img
          slot="image"
          width="100%"
          height="100%"
          :src="require(`../../src/assets/images/${characters[indice].name}.jpg`)"
        />
        <p slot="name"><strong>Name:</strong> {{ characters[indice].name }}</p>
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
        <p slot="agility">
          <strong>Agility:</strong> {{ characters[indice].agility }}
        </p>
      </Character>
    </span>
    <button
      style="background-color: firebrick"
      @click="playerSelected(characters[indice])"
    >
      SELECT CHARACTER
    </button>
  </div>
</template>

<script>
import Character from "./Character.vue"
export default {
    name: 'SelectionPlayer',
    props: {
        idCharacter: {
            type: Number,
            required: true
        },
        characters: {
          type: Array,
          required: true
        },
        indice: {
          type: Number,
          required: true 
        },
        alterValueIdCharacterMinus: Function,
        alterValueIdCharacterMore: Function
    },
    components: { 
      Character
    },
    methods: {
      playerSelected(character) {
         this.$emit('playerWasSelected', character)
      }
    }
};
</script>

<style scoped>
</style>