<template>
  <v-container>
    <v-row class="d-flex justify-center mx-2 my-3 mb-5">
      <v-col cols="auto">
        <quiz-card
          :character="char1"
          :current-card="currentCard"
          :i="0"
          @update:current-card="currentCard = $event"
        />
      </v-col>
      <v-col cols="auto">
        <quiz-card
          :character="char2"
          :current-card="currentCard"
          :i="1"
          @update:next-input="currentCard = $event"
          @update:current-card="currentCard = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuizCard from './QuizCard.vue'

const goToNextInput = (i) => {
  const nextInput = document.getElementById(`input-${i + 1}`)
  if (nextInput) {
    nextInput.focus()
  }
}

export default {
  components: {
    QuizCard
  },
  data () {
    return {
      currentCard: 0,
      char1: {
        kr: '\u314f', // ㅏ
        ro: ['a'],
        name: 'a',
        answer: '',
        id: 'input-0'
      },
      char2: {
        kr: '\u3151', // ㅑ
        ro: ['ya'],
        name: 'ya',
        answer: '',
        id: 'input-1'
      }
    }
  },
  methods: {
    goToNextInput
  }
}
</script>

<style scoped>

</style>
