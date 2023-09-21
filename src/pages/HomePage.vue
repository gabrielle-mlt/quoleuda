<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <h1>Welcome to Quoleuda</h1>
        <p class="mt-2">
          Quoleuda is a quiz app for learning the Korean alphabet, Hangul.
        </p>
        <p>Try it now and repeat as many times as you want !</p>
        <v-btn
          class="mt-4"
          color="primary"
          @click="$router.push({ name: 'QuizMenu' })"
        >
          Start Quiz
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

</script>

<style scoped>

</style>
