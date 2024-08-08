<template>
    <div v-if="logs.length" class="panel logs">
      <ul>
        <li
          v-for="(log, index) in logs"
          :key="index"
          :class="log.cls"
          class="log"
        >
          {{ log.text }}
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'PanelLogs',
        props: {
            logs: {
                type: Array,
                required: true,
            }
        },
    }
</script>