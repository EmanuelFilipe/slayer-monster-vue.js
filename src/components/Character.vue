<template>
    <div class="character">
        <slot name="image"></slot>
        <slot name="name"></slot>
        <slot name="attack"></slot>
        <slot name="specialAttack"></slot>
        <slot name="defense"></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .character {
        border: 1px solid #DDD;
        background-color: rgba(0, 0, 0, .1);
        padding: 25px;
        max-width: 450px;
        margin-top: 10px;
    }
</style>