<template>
  <v-container class="justify-center">
    <v-card
      class="mx-auto"
      color="transparent"
      elevation="0"
      max-width="700"
    >
      <v-card-title>
        <h2>About</h2>
      </v-card-title>
      <v-card-text class="text-left">
        <v-row>
          <v-col>
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
                  >
                    Duolingo
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
              >
                GitHub</a>.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
</script>
