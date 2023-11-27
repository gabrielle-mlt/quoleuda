<template>
  <v-container class="justify-center">
    <h1>About</h1>
    <div
      class="my-8 mx-auto text-left"
      style="max-width: 700px;"
    >
      <p>
        This is a simple quiz app on different sources to help you learn the Korean alphabet.
      </p>
      <p>
        This is a non-exhaustive sources list:
        <v-list
          bg-color="transparent"
          density="compact"
        >
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-book-open-page-variant
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://www.korean.go.kr/front_eng/roman/roman_01.do"
              target="_blank"
            >
              National Institute of Korean Language
            </a>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-school
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://www.duolingo.com/"
              target="_blank"
            >
              Duolingo
            </a>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-book-open-page-variant
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://fr.wikipedia.org/wiki/Romanisation_r%C3%A9vis%C3%A9e_du_cor%C3%A9en"
              target="_blank"
            >
              <span lang="fr">Romanisation révisée du coréen</span> (Revised Romanization of Korean) - Wikipedia
              (FR)
            </a>
          </v-list-item>
        </v-list>
      </p>
      <p>
        The concept of the quiz is inspired by <a
          class="custom-link"
          href="https://kana-quiz.tofugu.com/"
        >Tofugu
          Quiz</a> which
        stands for the Japanese alphabet.
      </p>
      <p>
        The source code is available on <a
          class="custom-link"
          href="https://github.com/gabrielle-mlt/quoleuda"
          target="_blank"
        >
          GitHub</a>.
      </p>
    </div>

    <v-card
      class="mx-auto text-left mt-2"
      color="primary"
      max-width="700"
      rounded="lg"
      variant="tonal"
    >
      <v-card-title>
        <v-icon
          icon="mdi-cookie-off"
          size="small"
        />
      </v-card-title>
      <v-card-text>
        To respect your privacy, this app does not use cookies.<br>
        All the settings are saved in your browser. If you want to reset them, you can clear your browser data.
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
</script>
