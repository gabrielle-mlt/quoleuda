<script setup>
import syllables from '@resources/koreanAlphabetChart.js'
import { ref, watch } from 'vue'

const mode = ref('roman2korean')
const romanInput = ref('an nyeong ha se yo')
const koreanOutput = ref('안 녕 하 세 요')

const syllableDataSet = Object.values(syllables)
  .map(combinationType => Object.values(combinationType))
  .reduce((acc, val) => acc.concat(...val), [])

const processString = (str) => {
  if (!str || str.trim() === '') return []
  return str.trim().split(/\s+/)
}

const transliterateWord = (word) => {
  const syl = syllableDataSet.find(syllable => syllable.ro.includes(word.toLowerCase()))
  return syl?.kr || word
}

// Watch the romanInput for changes
watch(romanInput, (newVal, oldVal) => {
  const newInputArray = processString(newVal)
  const oldInputArray = processString(oldVal)
  const outputArray = processString(koreanOutput.value)

  console.log(newInputArray)
  if (newInputArray.length === 0) {
    koreanOutput.value = ''
    return
  }

  // Determine changes
  const maxLength = Math.max(newInputArray.length, oldInputArray.length)
  for (let i = 0; i < maxLength; i++) {
    if (newInputArray[i] !== oldInputArray[i]) {
      if (i >= newInputArray.length) {
        // Element removed
        outputArray.splice(i, 1)
      } else if (i >= oldInputArray.length) {
        // Element added
        outputArray.splice(i, 0, transliterateWord(newInputArray[i]))
      } else {
        // Element modified
        outputArray[i] = transliterateWord(newInputArray[i])
      }
    }
  }

  // Reassemble the output string
  koreanOutput.value = outputArray.join(' ')
})
</script>

<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'"
  >
    <h1 class="mt-4">
      Korean Transliterate
    </h1>
    <h2>
      한글
    </h2>
    <h3 class="mt-4">
      Write what you want to say here!
    </h3>
    <p>
      <v-icon
        color="primary"
        icon="mdi-alert"
      />
      Syllables have to be separated by a space, otherwise I won't be able to convert.
      <v-icon
        color="primary"
        icon="mdi-alert"
      />
    </p>
    <p>
      <v-icon
        color="secondary"
        icon="mdi-information-slab-circle"
      />
      My transliteration database is not complete yet, so some words might not be converted. I'm working on it!
      <v-icon
        color="secondary"
        icon="mdi-information-slab-circle"
      />
    </p>
    <div class="d-flex justify-center">
      <v-card
        class="my-5"
        color="secondary"
        variant="tonal"
        width="fit-content"
      >
        <v-card-title>
          Examples
        </v-card-title>
        <v-card-text>
          "an nye ong ha se yo"
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
          "안 녕 하 세 요"
          <br>
          "jeo neun han guk sa ram ib ni da"
          <v-icon color="primary">
            mdi-arrow-right
          </v-icon>
          "저 는 한 국 사 람 입 니 다"
        </v-card-text>
      </v-card>
    </div>
    <v-row
      class="justify-center align-center mt-5"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="romanInput"
          outlined
          row-height="15"
          rows="4"
          variant="solo-filled"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-textarea
          v-model="koreanOutput"
          outlined
          readonly
          row-height="15"
          rows="4"
          variant="solo-filled"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
