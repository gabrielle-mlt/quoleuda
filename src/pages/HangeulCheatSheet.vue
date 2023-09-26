<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <h1>Cheat Sheet</h1>
        <h2>Roman alphabet to hangeul</h2>
        <p>This revision sheet will help you take your first steps in learning Korean.</p>

        <p class="font-italic">
          (Coming soon!)
        </p>
      </v-col>
    </v-row>
    <!--    <p>
          At the origin, Hangeul was created following 2 principles:
          <ul>
            <li>
              The <strong>shape</strong> of the letter is inspired by the shape of the mouth when pronouncing the
              sound
            </li>
            <li>The <strong>sound</strong> of the letter is inspired by the sound of the letter</li>
          </ul>
        </p>-->

    <v-btn
      class="mt-4"
      color="primary"
      @click="$router.push({ name: 'QuizMenu' })"
    >
      I'm ready !
    </v-btn>
  </v-container>
</template>
