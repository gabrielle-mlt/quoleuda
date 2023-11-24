<script setup>
defineProps({
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

</script>

<template>
  <v-card
    :color="color"
    rounded="lg"
    variant="tonal"
    width="400"
  >
    <v-card-title>
      <v-icon
        v-for="star in stars"
        :key="star"
        color="secondary-darken-1"
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

<style scoped>

</style>
