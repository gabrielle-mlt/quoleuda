<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'"
    fill-height
  >
    <h1 class="mt-md-4 mt-lg-4 mt-xl-4 mt-sm-1">
      Quiz Menu
    </h1>
    <h2>Click to select the desired letter categories and start the quiz !</h2>
    <v-row class="mt-md-6 mt-lg-6 mt-xl-6 mt-2 justify-lg-space-around">
      <v-col
        v-for="(set,setInd) in transliterationsSet"
        :key="`set-${setInd}`"
        cols="12"
        lg="6"
        md="6"
        sm="12"
        xl="6"
      >
        <v-btn
          :color="set.categories.map(i => i.id).every(m => selectedModes.includes(m))? 'primary-lighten-2' :'grey'"
          :size="$vuetify.display.mobile ? undefined : 'x-large'"
          class="mb-2"
          rounded="lg"
          @click="modifySelection(set.categories)"
        >
          <template #default>
            <div class="d-inline">
              <span>{{ set.title.ro }}</span><span
                v-if="set.title.kr"
                lang="ko"
              > - {{ set.title.kr }}</span><br>
              <span
                v-if="set.title.transliteration"
                style="font-weight: normal; font-size: xx-small;"
              >
                ({{ set.title.transliteration }})
              </span>
            </div>
          </template>
        </v-btn>
        <v-row class="justify-space-evenly">
          <v-col
            v-for="(cat,catInd) in set.categories"
            :key="`cat-${catInd}`"
            class="col-md-6"
            @click="modifySelection([cat])"
          >
            <v-btn
              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'grey'"
              :size="$vuetify.display.mobile ? 'small' : undefined"
              rounded="lg"
            >
              {{ cat.title }}
            </v-btn>
            <v-item-group
              v-if="hangeul[set.id] && hangeul[set.id][cat.id].length"
              class="font-weight-bold mt-2 mt-xl-6 mt-lg-6 mt-md-6"
            >
              <v-item
                v-for="(char,charInd ) in hangeul[set.id][cat.id]"
                :key="`char-${cat.id}-${charInd}`"
              >
                <v-chip
                  :class="fontClass"
                  :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                    ?'darkgrey' : 'lightgrey')"
                  :style="{ 'font-size': (!reverseMode && fontMode.value === 'nanum-pen-script' ? '1.6rem' : '') }"
                  :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                  class="fantom-border ma-2"
                  elevation="0"
                  lang="ko"
                >
                  {{ reverseMode ? char.ro[0] : char.kr }}
                </v-chip>
              </v-item>
              <!--              <v-chip
                              v-if="[...hangeul.filter(a => a.type === cat.id)].length - deleteCount === 1"
                              :class="fontClass"
                              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                                ?'darkgrey' : 'lightgrey')"
                              :style="{ 'font-size': (!reverseMode && fontMode.value === 'nanum-pen-script' ? '1.6rem' : '') }"
                              :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                              class="fantom-border ma-2"
                              elevation="0"
                              lang="ko"
                            >
                              {{
                                reverseMode ? [...hangeul.filter(a => a.type === cat.id)][deleteCount].ro[0] : [...hangeul.filter(a => a.type
                                  === cat.id)][deleteCount].kr
                              }}
                            </v-chip>
                            <v-chip
                              v-else-if="[...hangeul.filter(a => a.type === cat.id)].length - deleteCount > 1"
                              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                                ?'darkgrey' : 'lightgrey')"
                              :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                              class="fantom-border ma-2"
                              elevation="0"
                            >
                              + {{ [...hangeul.filter(a => a.type === cat.id)].length - deleteCount }} more
                            </v-chip>-->
            </v-item-group>
            <v-item-group
              v-else-if="syllables[cat.id].length"
              class="font-weight-bold mt-2 mt-xl-6 mt-lg-6 mt-md-6"
            >
              <v-item
                v-for="(char,charInd ) in syllables[cat.id]"
                :key="`syllable-${cat.id}-${charInd}`"
              >
                <v-chip
                  :class="fontClass"
                  :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                    ?'darkgrey' : 'lightgrey')"
                  :style="{ 'font-size': (!reverseMode && fontMode.value === 'nanum-pen-script' ? '1.6rem' : '') }"
                  :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                  class="fantom-border ma-2"
                  elevation="0"
                  lang="ko"
                >
                  {{ reverseMode ? char.ro[0] : char.kr }}
                </v-chip>
              </v-item>
              <!--              <v-chip
                              v-if="[...syllables.filter(a => a.type === cat.id)].length - deleteCount === 1"
                              :class="fontClass"
                              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                                ?'darkgrey' : 'lightgrey')"
                              :style="{ 'font-size': (!reverseMode && fontMode.value === 'nanum-pen-script' ? '1.6rem' : '') }"
                              :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                              class="fantom-border ma-2"
                              elevation="0"
                              lang="ko"
                            >
                              {{
                                reverseMode ? [...syllables.filter(a => a.type === cat.id)][deleteCount].ro[0] : [...syllables.filter(a =>
                                  a.type
                                  === cat.id)][deleteCount].kr
                              }}
                            </v-chip>
                            <v-chip
                              v-else-if="[...syllables.filter(a => a.type === cat.id)].length - deleteCount > 1"
                              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                                ?'darkgrey' : 'lightgrey')"
                              :variant="selectedModes.includes(cat.id) ? 'flat' : undefined"
                              class="fantom-border ma-2"
                              elevation="0"
                            >
                              + {{ [...syllables.filter(a => a.type === cat.id)].length - deleteCount }} more
                            </v-chip>-->
            </v-item-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--    <v-row justify="center">
          <v-col
            lg="4"
            md="4"
            sm="12"
            xl="4"
            @click="modifySelection([{id:'syllable'}])"
          >
            <v-btn
              :color="selectedModes.includes('syllable')? 'primary-lighten-2' : 'grey'"
              elevation="0"
              rounded="lg"
            >
              Syllables
            </v-btn>
            <v-item-group
              v-if="syllables && syllables.length"
              class="font-weight-bold mt-2 mt-xl-6 mt-lg-6 mt-md-6"
            >
              <v-item
                v-for="(syl,sylInd ) in [...syllables].splice(0, deleteCount)"
                :key="`char-${syl.id}-${sylInd}`"
              >
                <v-chip
                  :class="fontClass"
                  :color="selectedModes.includes('syllable')? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                    ?'darkgrey' : 'lightgrey')"
                  :style="{ 'font-size': (!reverseMode && fontMode.value === 'nanum-pen-script' ? '1.6rem' : '') }"
                  :variant="selectedModes.includes('syllable') ? 'flat' : undefined"
                  class="fantom-border ma-2"
                  elevation="0"
                  lang="ko"
                >
                  {{ reverseMode ? syl.ro[0] : syl.kr }}
                </v-chip>
              </v-item>
              <v-chip
                v-if="syllables.length - deleteCount > 0"
                :color="selectedModes.includes('syllable')? 'primary-lighten-2' : ($vuetify.theme.name === 'lightTheme'
                  ?'darkgrey' : 'lightgrey')"
                :variant="selectedModes.includes('syllable') ? 'flat' : undefined"
                class="fantom-border ma-2"
                elevation="0"
              >
                + {{ syllables.length - [...syllables].splice(0, deleteCount).length }} more
              </v-chip>
            </v-item-group>
          </v-col>
        </v-row>-->
    <div class="mt-8">
      <v-tooltip :text="selectedModes.length <= 0 ? 'Select at least one mode' : 'Click to start the quiz'">
        <template #activator="{ props }">
          <div
            class="mx-auto"
            style="width: fit-content;"
            v-bind="props"
          >
            <v-btn
              :color="selectedModes.length > 0 ? 'primary' : ''"
              :disabled="selectedModes.length <= 0"
              @click="startQuiz()"
            >
              Start Quiz
            </v-btn>
          </div>
        </template>
      </v-tooltip>
    </div>
  </v-container>
</template>

<script>
import hangeulToRoman from '@resources/hangeulToRoman.js'
import transliterationsSet from '@resources/transliterationsSet.js'
import koreanAlphabetChart from '@resources/koreanAlphabetChart.js'
import { mapState } from 'pinia'
import { useQuizSettingsStore } from '@stores/quizSettings.js'

export default {
  data () {
    return {
      selectedModes: [],
      categories: ['vowels', 'consonants'],
      subcategories: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable-cv', 'syllable-cvc'],
      transliterationsSet,
      hangeul: { vowel: { plainVowel: [], doubleVowel: [] }, consonant: { mainConsonant: [], doubleConsonant: [] } },
      syllables: { 'syllable-cv': [], 'syllable-vc': [] },
      deleteCount: 9
    }
  },
  computed: {
    ...mapState(useQuizSettingsStore, ['reverseMode', 'fontMode', 'fontOptions']),
    fontClass () {
      if (this.reverseMode) return ''
      return this.fontMode.class || ''
    }
  },
  created () {
    if (this.$vuetify.display.mobile) this.deleteCount = 4

    // slice each hangeul group to deleteCount
    this.hangeul.vowel.plainVowel = [...hangeulToRoman.vowel.plainVowel].slice(0, this.deleteCount)
    this.hangeul.vowel.doubleVowel = [...hangeulToRoman.vowel.doubleVowel].slice(0, this.deleteCount)
    this.hangeul.consonant.mainConsonant = [...hangeulToRoman.consonant.mainConsonant].slice(0, this.deleteCount)
    this.hangeul.consonant.doubleConsonant = [...hangeulToRoman.consonant.doubleConsonant].slice(0, this.deleteCount)

    this.completeChipsGroup(this.hangeul.vowel.plainVowel, hangeulToRoman.vowel.plainVowel)
    this.completeChipsGroup(this.hangeul.vowel.doubleVowel, hangeulToRoman.vowel.doubleVowel)
    this.completeChipsGroup(this.hangeul.consonant.mainConsonant, hangeulToRoman.consonant.mainConsonant)
    this.completeChipsGroup(this.hangeul.consonant.doubleConsonant, hangeulToRoman.consonant.doubleConsonant)

    // slice each syllable group to deleteCount
    this.syllables['syllable-cv'] = koreanAlphabetChart['syllable-cv'].slice(0, this.deleteCount)
    this.syllables['syllable-vc'] = koreanAlphabetChart['syllable-vc'].slice(0, this.deleteCount)

    this.completeChipsGroup(this.syllables['syllable-cv'], koreanAlphabetChart['syllable-cv'])
    this.completeChipsGroup(this.syllables['syllable-vc'], koreanAlphabetChart['syllable-vc'])
  },
  methods: {
    completeChipsGroup (group, initialGroup) {
      if (initialGroup.length - this.deleteCount > 1) {
        group.push({
          kr: `+ ${initialGroup.length - this.deleteCount} more`,
          ro: `+ ${initialGroup.length - this.deleteCount} more`
        })
      } else if (initialGroup.length - this.deleteCount === 1) {
        group.push({ kr: initialGroup[this.deleteCount].kr })
      }
    },
    modifySelection (items) {
      if (this.selectedModes.includes(...items.map(m => m.id))) {
        this.selectedModes = this.selectedModes.filter(m => !items.map(m => m.id).includes(m))
      } else {
        this.selectedModes.push(...items.map(m => m.id))
      }
    },
    startQuiz () {
      console.log(this.selectedModes && this.selectedModes.length && this.selectedModes.slice().sort().toString())
      console.log(['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable-cv', 'syllable-vc'].slice().sort().toString())
      const all = this.selectedModes && this.selectedModes.length && this.selectedModes.slice().sort().toString() ===
          ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant', 'syllable-cv', 'syllable-vc'].slice().sort().toString()
      const queryParams = { mode: all ? 'all' : this.selectedModes.join(',') }
      // if (this.reverseMode) queryParams.reverseMode = true
      // if (this.fontMode) queryParams.fontMode.value = this.fontMode.value
      this.$router.push({ name: 'Quiz', query: queryParams })
    }
  }
}

</script>

<style scoped>
.fantom-border {
  border: thin solid transparent;
}
</style>
