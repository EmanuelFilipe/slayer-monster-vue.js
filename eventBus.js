import Vue from 'vue'
export default new Vue({
    methods: {
        //PLAYER
        updatePlayerLife(value){
            console.log("this.$emit(''playerLifeChanged'', value)")
            this.$emit('playerLifeChanged', value)
        },
        whenPlayerLifeHasChanged(callback){
            console.log("this.$on('playerLifeChanged', callback)")
            this.$on('playerLifeChanged', callback)
        },

        //MONSTER
        updateMonsterLife(value){
            console.log("this.$emit('monsterLifeChanged', value)")
            this.$emit('monsterLifeChanged', value)
        },
        whenMonsterLifeHasChanged(callback){
            console.log("this.$on('monsterLifeChanged', callback)")
            this.$on('monsterLifeChanged', callback)
        },

        updateRunning(value){
            console.log("this.$emit('runningChanged', value)")
            this.$emit('runningChanged', value)
        },
        whenRunningHasChanged(callback){
            console.log("this.$on('runningChanged', callback)")
            this.$on('runningChanged', callback)
        },
    }
})