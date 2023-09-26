<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <h1>Welcome to Quoleuda</h1>
        <h2>Learn Hangeul / <span lang="ko">{{ '\ud55c\uae00' }}</span></h2>
        <p class="mt-2">
          Quoleuda is a quiz app for learning the Korean alphabet, Hangeul <small>(also written Hangul).</small>
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
