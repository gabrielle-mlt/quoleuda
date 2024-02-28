<template>
  <v-container>
    <h1
      v-if="finished"
      class="mt-4"
    >
      Results
    </h1>
    <VLayoutItem
      v-if="$vuetify.display.mobile && !finished"
      class="mt-3 mx-12"
      position="right"
      size="55"
      style="position: fixed;right: 30px;"
    >
      <v-sheet
        :color="$vuetify.theme.current.dark ? 'primary-darken-1' : 'primary-darken-3'"
        class="not-selectable rounded-b-circle rounded-t-circle align-center justify-center align-content-center"
        elevation="6"
        height="55"
        style="display: grid;justify-items: center;"
        variant="tonal"
        width="55"
      >
        <v-icon
          left
          size="small"
        >
          mdi-timer-outline
        </v-icon>
        <span style="font-size: 14px">
          {{ timerDisplay }}
        </span>
      </v-sheet>
    </VLayoutItem>

    <v-row
      class="d-flex justify-center align-top"
    >
      <v-col
        cols="auto"
        order-xs="last"
        order="last"
        order-lg="first"
        order-md="first"
        order-sm="last"
        order-xl="first"
        order-xxl="first"
      >
        <v-expand-transition>
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
        </v-expand-transition>
      </v-col>
      <v-col
        v-if="!$vuetify.display.mobile && !finished"
        cols="auto"
        ordeer-xs="first"
        order="first"
        order-lg="last"
        order-md="last"
        order-sm="first"
        order-xl="last"
        order-xxl="last"
      >
        <timer-chip
          v-if="showTimer"
          :position="getFantomTimerXY()"
          :timer="timerDisplay"
        />
        <v-chip
          id="fantom-timer-chip"
          class="mt-6 not-selectable"
          color="transparent"
          size="x-large"
        >
          <v-icon
            color="transparent"
            left
          >
            mdi-timer-outline
          </v-icon>
          00:00
        </v-chip>
      </v-col>
    </v-row>

    <div v-if="preparing">
      <h2>Preparing</h2>
      <v-progress-linear
        color="primary"
        indeterminate
      />
    </div>

    <v-expand-transition>
      <v-row
        v-if="!finished"
        class="d-flex justify-center mb-5 mx-lg-12 mx-xl-12"
      >
        <v-col
          v-for="(character,i) in characterSet"
          :key="`character-${i}`"
          cols="3"
        >
          <QuizCard
            :character="character"
            :current-card="currentCard"
            :font-class="fontClass"
            :i="i"
            :reverse-mode="reverseMode"
            @update:current-card="currentCard = $event"
            @update:next-input="goToNextInput($event)"
          />
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
    <v-expand-transition>
      <v-row
        v-if="finished"
        align="center"
        justify="center"
      >
        <v-col cols="auto">
          <v-sheet
            class="pa-4 text-center mx-auto"
            color="primary-lighten-3"
            elevation="0"
            height="200"
            rounded="xl"
            width="250"
          >
            <h2 class="text-h4 mb-6 font-weight-bold text-primary-darken-1 mt-5">
              Score
            </h2>

            <p class="text-h3 font-weight-bold text-primary-darken-1">
              {{ score }} %
            </p>
          </v-sheet>
        </v-col>
        <v-col cols="auto">
          <v-sheet
            class="pa-4 text-center mx-auto"
            color="primary-lighten-3"
            elevation="0"
            height="200"
            rounded="xl"
            width="250"
          >
            <div class="d-inline-flex align-center justify-center">
              <v-icon
                class="mx-2 mb-1"
                color="primary-darken-1"
                icon="mdi-timer-outline"
                size="50"
              />
              <h2 class="text-h4 mb-6 font-weight-bold text-primary-darken-1 mt-5">
                Timer
              </h2>
            </div>

            <p class="text-h3 font-weight-bold text-primary-darken-1">
              {{ timerDisplay }}
            </p>
          </v-sheet>
        </v-col>
        <v-col
          class="justify-center"
          cols="12"
        >
          <v-btn
            class="mt-3 mx-2"
            color="primary"
            icon="mdi-replay"
            title="Play Again!"
            variant="tonal"
            @click="startQuiz()"
          />
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-expand-transition>
      <v-expand-transition>
        <results-overview
          v-if="printResults && score !=null"
          :results="characterSet"
        />
      </v-expand-transition>
    </v-expand-transition>
  </v-container>
</template>
<script setup>
import QuizCard from '@components/QuizCard.vue'
import ResultsOverview from '@components/ResultsOverview.vue'
import TimerChip from '@components/TimerChip.vue'
</script>

<script>
import hangeul from '@resources/hangeulToRoman.js'
import syllables from '@resources/koreanAlphabetChart.js'
import { mapState } from 'pinia'
import { useQuizSettingsStore } from '@stores/quizSettings.js'

export default {
  data () {
    return {
      printResults: false,
      finished: false,
      dialog: false,
      characterSet: [],
      currentCard: 0,
      score: 0,
      acceptedModes: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable-cv', 'syllable-vc', 'all'],
      modes: ['plainVowel', 'doubleVowel', 'mainConsonant'],
      chrono: null,
      time: 0,
      showTimer: false,
      preparing: true
    }
  },
  computed: {
    ...mapState(useQuizSettingsStore, ['reverseMode', 'fontMode', 'fontOptions']),
    timerDisplay () {
      if (this.time >= 3600) {
        this.stopChrono()
        return '+1 hour'
      }
      const minutes = Math.floor(this.time / 60)
      const seconds = this.time - minutes * 60
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    },
    fontClass () {
      if (this.reverseMode) return ''
      return this.fontMode.class || ''
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

    await this.resetGame()
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
        character.color = 'success'
        character.done = true
        character.score = character.tries > 1 ? 1 / (character.tries * 0.6) : 1
      } else {
        character.incorrect = true
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
      this.showTimer = false
      this.stopChrono()
      // calculate score
      this.calculateScore()
      if (this.score === 0) this.printResults = true
      this.finished = true
    },
    async resetGame () {
      this.stopChrono()
      this.preparing = true
      this.time = 0
      await this.prepareCharset()

      this.printResults = false
      this.finished = false
      this.score = undefined
      this.currentCard = 0

      this.$nextTick(() => {
        const firstInput = document.getElementById('input-0')
        if (firstInput) {
          this.setCaretPosition(firstInput, 10)
        }
        this.preparing = false
        this.startChrono()
      })
    },
    async prepareCharset () {
      const hang = []
      const syll = []
      for (const m of this.modes) {
        if (hangeul.vowel[m]) {
          hang.push(...hangeul.vowel[m])
        }
        if (hangeul.consonant[m]) {
          hang.push(...hangeul.consonant[m])
        }
        if (syllables[m]) {
          syll.push(...syllables[m])
        }
      }
      const shuffledArray = this.shuffle([...hang, ...syll])

      this.characterSet = await new Promise((resolve, reject) => {
        const res = [...shuffledArray].map((v, index) => {
          return { ...v, answer: '', id: `input-${index}` }
        })
        resolve(res)
      })
    },
    startChrono () {
      this.showTimer = true
      // time now
      this.time = 0
      // start the chrono
      this.chrono = setInterval(() => {
        this.time++
      }, 1000)
    },
    stopChrono () {
      clearInterval(this.chrono)
    },
    getFantomTimerXY () {
      const el = document.getElementById('fantom-timer-chip')
      if (!el) return { x: 0, y: 0 }
      const rect = el.getBoundingClientRect()
      return { x: rect.x, y: rect.y }
    }
  }
}
</script>

<style>
@media screen and (min-width: 600px) {
  .cards-container {
    max-width: 1400px;
  }
}

@media screen and (max-width: 600px) {
  .cards-container {
    max-width: 600px;
  }
}

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

#fantom-timer-chip {
  color: transparent;
  pointer-events: none;
}

.not-selectable {
  pointer-events: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
