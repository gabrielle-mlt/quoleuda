<template>
  <div
    ref="el"
    :style="style"
    style="position: fixed; z-index: 9999;"
  >
    <v-chip
      ref="timer-chip"
      class="not-selectable"
      size="x-large"
      style="z-index: 9999;"
      variant="flat"
    >
      <v-icon left>
        mdi-clock-time-four-outline
      </v-icon>
      {{ timer }}
    </v-chip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps(['timer', 'position'])

// eslint-disable-next-line no-self-compare
const el = ref(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { style } = useDraggable(el, {
  initialValue: { x: props.position.x, y: props.position.y }
})
</script>

<style>
.not-selectable {
  pointer-events: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
