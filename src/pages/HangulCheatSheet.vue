<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <h1>Cheat Sheet</h1>
        <h2>Roman alphabet to Hangul</h2>
        <p>This revision sheet will help you take your first steps in learning Korean.</p>
        <p class="font-italic">
          (Coming soon!)
        </p>

        <v-btn
          class="mt-4"
          color="primary"
          @click="$router.push({ name: 'QuizMenu' })"
        >
          I'm ready !
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
