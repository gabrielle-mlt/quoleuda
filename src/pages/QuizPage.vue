<template>
  <v-container>
    <v-card
      v-if="!finished"
      class="ma-auto"
      color="secondary-darken-1"
      elevation="0"
      max-width="450"
      rounded="xl"
    >
      <v-card-title>
        How to play ?
      </v-card-title>
      <v-card-text class="text-left">
        Type your answer in roman alphabet in the card's text field<br>
        Press ENTER to submit<br>
        Repeat for as many cards as you can<br>
        You can try as many times as you want<br>
        When you're done press the "Finish Quiz" button at the bottom<br>
      </v-card-text>
    </v-card>
    <v-expand-transition>
      <v-row
        v-if="!finished"
        class="d-flex justify-lg-space-evenly justify-center mx-2 my-3 mb-5"
      >
        <v-col
          v-for="(character,i) in characterSet"
          :key="`character-${i}`"
          cols="auto"
        >
          <v-card
            :class="i === currentCard ? 'growing-card':''"
            :color="character.done ? 'success' : 'primary-lighten-2'"
            class="transition-card"
            elevation="0"
            rounded="xl"
          >
            <v-spacer />
            <v-card-title
              class="font-weight-bold mt-3"
              lang="ko"
              style="font-size: 2.5rem"
            >
              {{ reverseMode ? character.ro[0] : character.kr }}
            </v-card-title>
            <v-card-text>
              <v-text-field
                :id="`input-${i}`"
                :ref="`input-${i}`"
                v-model.trim="character.answer"
                :bg-color="character.color || 'primary-lighten-3'"
                :placeholder="character.placeholder"
                :readonly="character.done"
                class="mt-6 mx-3 elevation-0 font-weight-bold centered-input"
                hide-details
                inputmode="search"
                oninput="this.value?.length > 4 ? this.value = this.value.slice(0,4) : this.value"
                rounded="circle"
                variant="solo"
                @keydown.enter.prevent="checkCorrespondence($event, character, i)"
                @keydown.tab.prevent="$vuetify.display.mobile && $event.target.value !== undefined && $event.target.value !== ''?
                  checkCorrespondence($event, character, i):goToNextInput(i);"
                @update:focused="currentCard = i"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-btn
      v-if="!finished"
      color="secondary"
      @click="finishQuiz()"
    >
      Finish Quiz
    </v-btn>
    <v-card
      v-if="finished"
      color="transparent"
      elevation="0"
    >
      <v-card-title>
        <h2>Score</h2>
      </v-card-title>
      <v-card-text
        class="mt-4"
        style="font-weight: bold; font-size: 42px;"
      >
        {{ score }} %
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          class="mt-3 mx-2"
          color="primary"
          fab
          icon="mdi-replay"
          title="Play Again!"
          variant="tonal"
          @click="startQuiz()"
        />
        <v-btn
          class="mt-3 mx-2"
          color="info"
          fab
          icon="mdi-eye"
          title="Show Results"
          variant="tonal"
          @click="printResults = !printResults"
        />
      </v-card-actions>
    </v-card>
    <results-overview
      v-if="printResults && score !=null"
      :results="characterSet"
    />
  </v-container>
</template>
<script setup>
import ResultsOverview from '../components/ResultsOverview.vue'
</script>

<script>
import hangeul from '../resources/hangeulToRoman.js'
import syllables from '../resources/koreanAlphabetChart.js'

export default {
  data () {
    return {
      reverseMode: false,
      printResults: false,
      finished: false,
      dialog: false,
      characterSet: [],
      currentCard: 0,
      score: 0,
      results: [],
      acceptedModes: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable', 'all'],
      modes: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable']
    }
  },
  async created () {
    // if route query has mode and mode.split(',') are included by acceptedModes
    if (this.$route.query.mode && this.$route.query.mode.split(',').filter((v) => !this.acceptedModes.includes(v)).length) {
      this.$router.push({ query: {} })
    }

    if (this.$route.query.mode && this.$route.query.mode !== 'all') {
      this.modes = this.$route.query.mode.split(',')
    }

    if (this.$route.query.reverseMode && this.$route.query.reverseMode === 'true') {
      this.reverseMode = true
    }

    await this.resetGame()
  },
  unmounted () {
    this.resetGame()
  },
  methods: {
    startQuiz (ev) {
      if (ev) this.modes = ev
      this.resetGame()
    },
    checkCorrespondence (event, character, i) {
      if (this.score) return
      character.placeholder = event.target.value.length > 0 ? event.target.value.trim() : character.placeholder
      character.tries = character.tries + 1 || 1

      // reset event target value
      const guess = this.reverseMode
        ? character.kr === event.target.value.toLowerCase()
        : character.ro.includes(event.target.value.toLowerCase())
      if (guess) {
        character.placeholder = event.target.value.length ? event.target.value : character.placeholder
        character.color = 'success-lighten-1'
        character.done = true
        character.score = character.tries > 1 ? 1 / (character.tries * 0.6) : 1

        this.results.push(character)
      }

      this.goToNextInput(i)
      // character.placeholder = character.answer
      character.answer = ''
    },
    goToNextInput (i) {
      this.$nextTick(() => {
        const nextItem = this.characterSet.find((v, index) => !v.done && index > i)
        const nextId = nextItem?.id || this.characterSet.find((v) => !v.done)?.id

        if (!nextId) {
          this.calculateScore()
          return
        }
        const nextInput = document.getElementById(nextId)
        this.currentCard = nextId
        this.setCaretPosition(nextInput, 5)
      })
    },
    setCaretPosition (ctrl, pos) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    },
    shuffle (array) {
      let currentIndex = array.length
      let randomIndex

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]]
      }

      return array
    },
    calculateScore () {
      const scores = this.characterSet.reduce((acc, curr) => {
        return acc + (curr.score || 0)
      }, 0)

      this.score = Math.round((scores / this.characterSet.length) * 100) || 0
    },
    finishQuiz () {
      // calculate score
      this.calculateScore()
      if (this.score === 0) this.printResults = true
      this.finished = true
    },
    async resetGame () {
      await this.prepareCharset()

      this.printResults = false
      this.finished = false
      this.results = []
      this.score = undefined
      this.currentCard = 0

      this.$nextTick(() => {
        const firstInput = document.getElementById('input-0')
        if (firstInput) {
          this.setCaretPosition(firstInput, 10)
        }
      })
    },
    async prepareCharset () {
      const shuffledArray = this.shuffle([...hangeul, ...syllables])

      this.characterSet = await new Promise((resolve, reject) => {
        const res = ([...shuffledArray].filter((v) => this.modes.includes(v.type)) || []).map((v, index) => {
          return { ...v, answer: '', id: `input-${index}` }
        })
        resolve(res)
      })
    }
  }
}
</script>

<style>
.transition-card {
  transition: all .4s ease-in-out;
}

.growing-card {
  transform: scale(1.1);
}

.v-field--variant-solo {
  box-shadow: none;
}

.centered-input input {
  text-align: center
}
</style>
