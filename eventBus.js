import Vue from 'vue'
export default new Vue({
    methods: {
        //PLAYER
        updatePlayerLife(value){
            this.$emit('playerLifeChanged', value)
        },
        whenPlayerLifeHasChanged(callback){
            this.$on('playerLifeChanged', callback)
        },

        //MONSTER
        updateMonsterLife(value){
            this.$emit('monsterLifeChanged', value)
        },
        whenMonsterLifeHasChanged(callback){
            this.$on('monsterLifeChanged', callback)
        },

        updateRunning(value){
            console.log('eventbus:updateRunning:', value)
            this.$emit('runningChanged', value)
        },
        whenRunningHasChanged(callback){
            this.$on('runningChanged', callback)
        },
    }
})