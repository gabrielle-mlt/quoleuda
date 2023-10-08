<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'"
    fill-height
  >
    <v-row class="mt-8">
      <v-col
        v-for="(set,setInd) in transliterationsSet"
        :key="`set-${setInd}`"
      >
        <v-btn
          :color="set.categories.map(i => i.id).every(m => selectedModes.includes(m))? 'primary-lighten-2' :
            'primary-darken-2'"
          :elevation="set.categories.map(i => i.id).every(m => selectedModes.includes(m))? '8' : '1'"
          class="mb-2"
          rounded="lg"
          size="x-large"
          @click="modifySelection(set.categories)"
        >
          <template #default>
            <div class="d-inline">
              <span>{{ set.title.ro }} - </span><span lang="ko">{{ set.title.kr }}</span><br>
              <span style="font-weight: normal; font-size: xx-small;">
                ({{ set.title.transliteration }})
              </span>
            </div>
          </template>
        </v-btn>
        <v-row class="justify-space-evenly">
          <v-col
            v-for="(cat,catInd) in set.categories"
            :key="`cat-${catInd}`"
            class="v-col-md-6"
          >
            <v-btn
              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'primary-darken-2'"
              :elevation="selectedModes.includes(cat.id)? '8' : '1'"
              rounded="lg"
              @click="modifySelection([cat])"
            >
              {{ cat.title }}
            </v-btn>
            <v-item-group
              v-if="hangeul.filter(a => a.type === cat.id).length"
              class="font-weight-bold mt-8"
            >
              <v-item
                v-for="(char,charInd ) in [...hangeul.filter(a => a.type === cat.id)]/*.splice(0, 15)*/"
                :key="`char-${cat.id}-${charInd}`"
              >
                <v-chip
                  :color="selectedModes.includes(cat.id)? 'primary-lighten-1' : 'primary-desaturate-1'"
                  class="ma-2"
                  elevation="0"
                  lang="ko"
                  size="small"
                  variant="elevated"
                >
                  {{ char.kr }}
                </v-chip>
              </v-item>
            </v-item-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <v-btn
          :color="selectedModes.includes('syllable')? 'primary-lighten-2' : 'primary-darken-2'"
          :elevation="selectedModes.includes('syllable')? '8' : '1'"
          rounded="lg"
          @click="modifySelection([{id:'syllable'}])"
        >
          Syllables
        </v-btn>
        <v-item-group
          v-if="syllables && syllables.length"
          class="font-weight-bold mt-8"
        >
          <v-item
            v-for="(syl,sylInd ) in [...syllables].splice(0, 20)"
            :key="`char-${syl.id}-${sylInd}`"
          >
            <v-chip
              :color="selectedModes.includes('syllable')? 'primary-lighten-1' : 'primary-desaturate-1'"
              class="ma-2"
              elevation="0"
              lang="ko"
              size="small"
              variant="elevated"
            >
              {{ syl.kr }}
            </v-chip>
          </v-item>
        </v-item-group>
      </v-col>
    </v-row>
    <v-btn
      v-if="selectedModes.length > 0"
      color="primary"
      @click="startQuiz()"
    >
      Start Quiz
    </v-btn>
  </v-container>
</template>

<script>
import hangeul from '../resources/hangeulToRoman.js'
import transliterationsSet from '../resources/transliterationsSet.js'
import chart from '../resources/koreanAlphabetChart.js'

export default {
  data () {
    return {
      selectedModes: [],
      categories: ['vowels', 'consonants'],
      subcategories: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant'],
      transliterationsSet,
      hangeul,
      syllables: chart
    }
  },
  methods: {
    modifySelection (items) {
      if (this.selectedModes.includes(...items.map(m => m.id))) {
        this.selectedModes = this.selectedModes.filter(m => !items.map(m => m.id).includes(m))
      } else {
        this.selectedModes.push(...items.map(m => m.id))
      }
    },
    startQuiz () {
      const all = this.selectedModes && this.selectedModes.length && this.selectedModes.slice().sort().toString() ===
          ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable'].slice().sort().toString()
      this.$router.push({ name: 'Quiz', query: { mode: all ? 'all' : this.selectedModes.join(',') } })
    }
  }
}

</script>
