<template>
  <div
    ref="el"
    :style="style"
    style="position: fixed; z-index: 9999;"
  >
    <v-sheet
      ref="timer-chip"
      :color="$vuetify.theme.current.dark ? 'primary-darken-1' : 'primary-darken-3'"
      class="grabbable rounded-b-circle rounded-t-circle align-center justify-center align-content-center"
      elevation="6"
      height="90"
      style="z-index: 9999; display: grid;justify-items: center;"
      variant="tonal"
      width="90"
    >
      <v-icon
        left
        size="x-large"
      >
        mdi-timer-outline
      </v-icon>
      <span style="font-size: 20px">
        {{ timer }}
      </span>
    </v-sheet>
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
.grabbable {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */

}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbable:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */

}

.not-selectable {
  pointer-events: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
