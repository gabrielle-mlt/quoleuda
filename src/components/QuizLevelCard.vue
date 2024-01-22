<script setup>
import { computed, defineProps } from 'vue'
import { useTheme } from 'vuetify'

// theme
const theme = useTheme()

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Hangeul Quiz'
  },
  slogan: {
    type: String,
    required: true,
    default: 'Learn the Korean alphabet'
  },
  stars: {
    type: [Number, String],
    default: 0
  },
  color: {
    type: String,
    default: 'primary'
  },
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: Array,
    default: () => []
  }
})

// computed color
const computedCardColor = computed(() => {
  if (!props.active) return props.color
  return theme.current.value.dark ? props.color + '-lighten-3' : props.color + '-darken-1'
})

</script>

<template>
  <v-card
    :color="computedCardColor"
    max-width="400"
    rounded="lg"
    variant="tonal"
  >
    <v-card-title>
      <v-icon
        v-for="star in stars"
        :key="star"
        :color="$vuetify.theme.current.dark ? 'secondary-lighten-1':'secondary-darken-1'"
        icon="mdi-crown"
        size="x-large"
      />
      <h3>
        {{ title }}
      </h3>
      <h4
        class="mt-2"
        style="text-wrap: balance;"
      >
        {{ slogan }}
      </h4>
    </v-card-title>
    <v-card-text>
      <slot name="description" />
      <slot name="action-button" />
    </v-card-text>
  </v-card>
</template>
