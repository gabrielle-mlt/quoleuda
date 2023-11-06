<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'"
    fill-height
  >
    <h1 class="mt-4">
      Quiz Menu
    </h1>
    <h2>Click to select the desired letter categories and start the quiz !</h2>
    <v-switch
      v-model="reverseMode"
      class="mx-auto"
      color="primary"
      hide-details
      label="Reverse Mode"
      style="width: fit-content;"
    >
      <template #append>
        <v-menu
          :close-on-content-click="false"
          location="end"
        >
          <template #activator="{ props }">
            <v-btn
              color="secondary"
              fab
              icon
              size="xx-small"
              v-bind="props"
            >
              <v-icon size="small">
                mdi-information-symbol
              </v-icon>
            </v-btn>
          </template>
          <v-card width="350">
            <v-card-text>
              <p>
                In <span class="font-weight-bold">normal mode</span>, you will be given the korean letter and you
                will have to find the
                <span
                  class="font-weight-bold"
                  style="color: rgb(var(--v-theme-primary));"
                >
                  corresponding roman letter
                </span>.
              </p>
              <p>
                {{ '\u314F' }}
                <v-icon size="x-small">
                  mdi-arrow-right
                </v-icon>
                ? (roman letter)
              </p>
              <v-divider class="my-4" />
              <p>
                In <span class="font-weight-bold">reverse mode</span>, you will be given the roman letter and you
                will have to find the
                <span
                  class="font-weight-bold"
                  style="color: rgb(var(--v-theme-primary));"
                >
                  corresponding korean letter
                </span>.
              </p>
              <p>
                a
                <v-icon size="x-small">
                  mdi-arrow-right
                </v-icon>
                ? (korean letter)
              </p>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
    </v-switch>
    <v-select
      v-model="fontMode"
      :disabled="reverseMode"
      :items="fontOptions"
      class="mx-auto"
      color="primary"
      hide-details
      style="width: 250px;"
      variant="outlined"
    >
      <template #selection="{item}">
        <span
          class="align-self-center"
          style="font-size: 0.9rem;"
        >{{ item.title }}</span>
        <span
          v-if="item.value !== 'normal'"
          :class="item.raw.class"
          class="ml-2 my-0"
          lang="ko"
        >
          {{ '\ud55c\uae00' }}
        </span>
      </template>
      <template #prepend-inner>
        <v-icon color="primary">
          mdi-format-font
        </v-icon>
      </template>
      <template #item="{ props, item }">
        <v-list-item
          :title="false"
          v-bind="props"
        >
          <v-list-item-content class="d-inline-flex">
            <v-list-item-subtitle>
              <span
                :class="item.raw.class"
                :style="item.value === 'nanum-pen-script' ? 'font-size: 1.6rem;' : ''"
                lang="ko"
              >
                {{ '\ud55c\uae00' }}
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>

    <v-row class="mt-8">
      <v-col
        v-for="(set,setInd) in transliterationsSet"
        :key="`set-${setInd}`"
      >
        <v-btn
          :color="set.categories.map(i => i.id).every(m => selectedModes.includes(m))? 'primary-lighten-2' :
            'primary-darken-4'"

          class="mb-2"
          elevation="0"
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
            class="col-md-6"
            @click="modifySelection([cat])"
          >
            <v-btn
              :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'primary-darken-4'"

              elevation="0"
              rounded="lg"
            >
              {{ cat.title }}
            </v-btn>
            <v-item-group
              v-if="hangeul.filter(a => a.type === cat.id).length"
              class="font-weight-bold mt-8"
            >
              <v-item
                v-for="(char,charInd ) in [...hangeul.filter(a => a.type === cat.id)].splice(0, deleteCount)"
                :key="`char-${cat.id}-${charInd}`"
              >
                <v-chip
                  :class="`${fontClass} ${selectedModes.includes(cat.id) ? 'fantom-border' : ''}`"
                  :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'primary-darken-4'"
                  :style="{ 'font-size': (!reverseMode && fontMode === 'nanum-pen-script' ? '1.6rem' : '') }"
                  :variant="selectedModes.includes(cat.id) ? 'flat' : 'outlined'"
                  class="ma-2"
                  elevation="0"
                  lang="ko"
                >
                  {{ reverseMode ? char.ro[0] : char.kr }}
                </v-chip>
              </v-item>
              <v-chip
                v-if="[...hangeul.filter(a => a.type === cat.id)].length - deleteCount === 1"
                :class="`${fontClass} ${selectedModes.includes(cat.id) ? 'fantom-border' : ''}`"
                :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'primary-darken-4'"
                :style="{ 'font-size': (!reverseMode && fontMode === 'nanum-pen-script' ? '1.6rem' : '') }"
                :variant="selectedModes.includes(cat.id) ? 'flat' : 'outlined'"
                class="ma-2"
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
                :class="selectedModes.includes(cat.id) ? 'fantom-border' : ''"
                :color="selectedModes.includes(cat.id)? 'primary-lighten-2' : 'primary-darken-4'"
                :variant="selectedModes.includes(cat.id) ? 'flat' : 'outlined'"
                class="ma-2"
                elevation="0"
              >
                + {{ [...hangeul.filter(a => a.type === cat.id)].length - deleteCount }} more
              </v-chip>
            </v-item-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="6"
        @click="modifySelection([{id:'syllable'}])"
      >
        <v-btn
          :color="selectedModes.includes('syllable')? 'primary-lighten-2' : 'primary-darken-4'"
          elevation="0"
          rounded="lg"
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
              :class="`${fontClass} ${selectedModes.includes('syllable') ? 'fantom-border' : ''}`"
              :color="selectedModes.includes('syllable')? 'primary-lighten-2' : 'primary-darken-4'"
              :style="{ 'font-size': (!reverseMode && fontMode === 'nanum-pen-script' ? '1.6rem' : '') }"
              :variant="selectedModes.includes('syllable') ? 'flat' : 'outlined'"
              class="ma-2"
              elevation="0"
              lang="ko"
            >
              {{ reverseMode ? syl.ro[0] : syl.kr }}
            </v-chip>
          </v-item>
          <v-chip
            v-if="syllables.length - 20 > 0"
            :class="selectedModes.includes('syllable') ? 'fantom-border' : ''"
            :color="selectedModes.includes('syllable')? 'primary-lighten-2' : 'primary-darken-4'"
            :variant="selectedModes.includes('syllable') ? 'flat' : 'outlined'"
            class="ma-2"
            elevation="0"
          >
            + {{ syllables.length - [...syllables].splice(0, 20).length }} more
          </v-chip>
        </v-item-group>
      </v-col>
    </v-row>
    <div class="mt-8">
      <v-tooltip :text="selectedModes.length <= 0 ? 'Select at least one mode' : 'Click to start the quiz'">
        <template #activator="{ props }">
          <div
            class="mx-auto"
            style="width: fit-content;"
            v-bind="props"
          >
            <v-btn
              :disabled="selectedModes.length <= 0"
              color="primary"
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
import hangeul from '../resources/hangeulToRoman.js'
import transliterationsSet from '../resources/transliterationsSet.js'
import chart from '../resources/koreanAlphabetChart.js'

export default {
  data () {
    return {
      reverseMode: false,
      fontMode: 'normal',
      selectedModes: [],
      categories: ['vowels', 'consonants'],
      subcategories: ['plainVowel', 'doubleVowel', 'mainConsonant', 'doubleConsonant'],
      transliterationsSet,
      hangeul,
      syllables: chart,
      fontOptions: [
        { value: 'normal', title: 'Normal', class: '' },
        { value: 'nanum-pen-script-font', title: 'Nanum Pen Script', class: 'nanum-pen-script-font' },
        { value: 'nanum-myeongjo-font', title: 'Nanum Myeongjo', class: 'nanum-myeongjo-font' },
        { value: 'black-han-sans-font', title: 'Black Han Sans', class: 'black-han-sans-font' }
      ],
      deleteCount: 9
    }
  },
  computed: {
    fontClass () {
      if (this.reverseMode) return ''
      return this.fontOptions.find(f => f.value === this.fontMode).class || ''
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
      const queryParams = { mode: all ? 'all' : this.selectedModes.join(',') }
      if (this.reverseMode) queryParams.reverseMode = true
      if (this.fontMode) queryParams.fontMode = this.fontMode
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
