<template>
  <v-card
    :class="`${i === currentCard ? 'growing-card':''} ${!character.done && i !== currentCard &&
      character.incorrect ?
        'incorrect':''}`"
    :color="character.done ? 'success' : (character.incorrect ? 'incorrect':'primary-lighten-2')"
    class="transition-card"
    elevation="0"
    max-width="150px"
    rounded="xl"
  >
    <v-card-title
      :class="fontClass"
      :style="{ 'font-size': (fontClass === 'nanum-pen-script' ? '3.2rem' : '') }"
      class="font-weight-bold mt-3 quiz-card-title"
      lang="ko"
    >
      {{ reverseMode ? character.ro[0] : character.kr }}
    </v-card-title>
    <v-spacer />
    <v-card-text>
      <v-text-field
        :id="`input-${i}`"
        :ref="`input-${i}`"
        v-model.trim="answer"
        :bg-color="(character.color || 'primary') + '-lighten-3'"
        :class="$vuetify.display.mobile ? '':'mx-3'"
        :placeholder="character.placeholder"
        :readonly="character.done"
        class="elevation-0 font-weight-bold centered-input quiz-card-text"
        hide-details
        inputmode="search"
        oninput="this.value?.length > 4 ? this.value = this.value.slice(0,4) : this.value"
        rounded="circle"
        variant="solo"
        @keydown.enter.prevent="handleEnter($event)"
        @keydown.tab.prevent="handleTab($event)"
        @update:focused="$emit('update:currentCard', i)"
      />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    character: {
      type: Object,
      required: true
    },
    i: {
      type: Number,
      required: true
    },
    currentCard: {
      type: Number,
      required: true
    },
    reverseMode: {
      type: Boolean,
      default: false
    },
    fontClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:currentCard', 'update:nextInput'],
  data () {
    return {
      answer: ''
    }
  },
  methods: {
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
        character.color = 'incorrect'
        this.answer = ''
      }

      this.$emit('update:nextInput', i)

      character.answer = ''
    },
    handleEnter (event) {
      if (event.target.value === undefined || event.target.value === '') {
        this.$emit('update:nextInput', this.i)
      } else {
        this.checkCorrespondence(event, this.character, this.i)
      }
    },
    handleTab (event) {
      if (event.target.value === undefined || event.target.value === '') {
        this.$emit('update:nextInput', this.i)
      } else if (this.$vuetify.display.mobile) {
        this.checkCorrespondence(event, this.character, this.i)
      } else {
        this.$emit('update:currentCard', this.i + 1)
      }
    }
  }
}

</script>

<style scoped>
@media (min-width: 600px) {
  .quiz-card-title {
    font-size: 2.8rem;
  }

  .quiz-card-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .quiz-card-title {
    font-size: 1.5rem;
  }

  .quiz-card-text {
    font-size: 0.8rem;
  }
}
</style>
