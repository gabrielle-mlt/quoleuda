<template>
  <v-row class="text-left mb-12 mt-4 ">
    <v-col>
      <h3>Korean Alphabet Overview</h3>
      <h4 class="mt-6">
        Consonant - Vowel
      </h4>
      <p>
        Korean writing is composed of complex syllables.
        A syllable contains at least one consonant and one vowel.
        Here is a first list of syllables composed of a consonant and a vowel.
      </p>
      <p class="mt-4">
        <v-icon
          color="primary"
          icon="mdi-alert-outline"
        />

        The sounds
        <span lang="ko">{{ '\u3131' }}</span>
        ,
        <span lang="ko">{{ '\u3137' }}</span>
        , and
        <span lang="ko">{{ '\u3142' }}</span>
        are transcribed respectively as g, d, and b before a vowel; they are transcribed
        as k, t, and p when they appear before another consonant or as the last sound of a word.
      </p>
      <p>
        <v-icon
          color="primary"
          icon="mdi-alert-outline"
        />
        <span lang="ko">{{ '\u3139' }}</span>
        is transcribed as r before a vowel, and as l before a consonant or at the end of a word:
        <span lang="ko">{{ '\u3139\u3139' }}</span>
        is transcribed as ll.
      </p>
      <v-card
        class="my-4 mx-auto text-center"
        color="primary-lighten-3"
        width="100%"
      >
        <v-card-text>
          <v-table
            class="mb-4"
            density="compact"
            style="background-color: unset;"
            theme="light"
          >
            <thead
              :style="$vuetify.display.mobile ?
                'font-size: 14px;':'font-size: 24px;'"
              style=" font-weight: bolder;"
            >
              <tr>
                <th />
                <th
                  v-for="(vowel, vindex) in vowels"
                  :key="`vowel-${vindex}`"
                  class="text-center text-black"
                >
                  <span lang="ko">{{ vowel.kr }}</span>
                  <br>
                  <span style="font-size: 0.9rem; opacity: 0.6;">
                    ({{ vowel.ro }})
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group,gindex) in groupByConsonant('syllable-cv')"
                :key="`char-${gindex}`"
              >
                <td
                  lang="ko"
                  style="font-size: 20px;"
                >
                  <span class="font-weight-bold">{{ groupByConsonant('syllable-cv')[gindex].id }}</span>
                  <span
                    v-if="consonant[gindex] && consonant[gindex].kr === groupByConsonant('syllable-cv')[gindex].id"
                    style="font-size:0.9rem; opacity: 0.7;"
                  >
                    ({{ consonant[gindex].ro[0] }})
                  </span>
                </td>
                <td
                  v-for="(item, cindex) in group.items"
                  :key="`char-${cindex}`"
                  lang="ko"
                >
                  <span
                    v-if="!chartRo"
                    lang="ko"
                  >
                    {{ item.kr }}
                  </span>
                  <span v-else>
                    {{ item.ro[0] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-row no-gutters>
            <v-col cols="12">
              <v-switch
                v-model="chartRo"
                :flat="false"
                :ripple="false"
                class="float-right"
                density="compact"
                hide-details
              >
                <template #prepend>
                  <span>Hangeul</span>
                </template>
                <template #append>
                  <span>Romanized</span>
                </template>
              </v-switch>
            </v-col>
            <v-col>
              ©Modern Seoul Magazine (2012)
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <h4 class="mt-6">
        Vowel - Consonant
      </h4>
      <p>
        Here is a second list of syllables composed of a vowel and a consonant.
      </p>

      <p>
        <v-icon
          color="primary"
          icon="mdi-alert-outline"
        />
        As vowels never start a syllable, the silent consonant <span lang="ko">{{ '\u3147' }}</span> is added to the
        vowel to
        form a syllable.
      </p>
      <v-card
        class="my-4 mx-auto text-center"
        color="primary-lighten-3"
        width="100%"
      >
        <v-card-text>
          <v-table
            class="mb-4"
            density="compact"
            style="background-color: unset;"
            theme="light"
          >
            <thead
              :style="$vuetify.display.mobile ?
                'font-size: 14px;':'font-size: 24px;'"
              style=" font-weight: bolder;"
            >
              <tr>
                <th />
                <th
                  v-for="(vowel, vindex) in vowels"
                  :key="`vowel-${vindex}`"
                  class="text-center text-black"
                >
                  <span lang="ko">{{ vowel.kr }}</span>
                  <br>
                  <span style="font-size: 0.9rem; opacity: 0.6;">
                    ({{ vowel.ro }})
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group,gindex) in groupByConsonant('syllable-vc')"
                :key="`char-${gindex}`"
              >
                <td
                  lang="ko"
                  style="font-size: 20px;"
                >
                  <span class="font-weight-bold">{{ groupByConsonant('syllable-vc')[gindex].id }}</span>
                  <span
                    v-if="consonant[gindex] && consonant[gindex].kr === groupByConsonant('syllable-vc')[gindex].id"
                    style="font-size: 0.9rem; opacity: 0.7;"
                  >
                    ({{ consonant[gindex].ro.length > 1 ? consonant[gindex].ro[1] : consonant[gindex].ro[0] }})
                  </span>
                </td>
                <td
                  v-for="(item, cindex) in group.items"
                  :key="`char-${cindex}`"
                  lang="ko"
                >
                  <span
                    v-if="!chartRo"
                    lang="ko"
                  >
                    {{ item.kr }}
                  </span>
                  <span v-else>
                    {{ item.ro[0] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-row no-gutters>
            <v-col cols="12">
              <v-switch
                v-model="chartRo"
                :flat="false"
                :ripple="false"
                class="float-right"
                density="compact"
                hide-details
              >
                <template #prepend>
                  <span>Hangeul</span>
                </template>
                <template #append>
                  <span>Romanized</span>
                </template>
              </v-switch>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import koreanAlphabetChart from '../resources/koreanAlphabetChart.js'
import hangeul from '../resources/hangeulToRoman.js'

export default {
  data () {
    return {
      hangeul,
      koreanAlphabetChart,
      vowels: [
        { kr: '\u314f', ro: 'a' },
        { kr: '\u3151', ro: 'ya' },
        { kr: '\u3153', ro: 'eo' },
        { kr: '\u3155', ro: 'yeo' },
        { kr: '\u3157', ro: 'o' },
        { kr: '\u315b', ro: 'yo' },
        { kr: '\u315c', ro: 'u' },
        { kr: '\u3160', ro: 'yu' },
        { kr: '\u3161', ro: 'eu' },
        { kr: '\u3163', ro: 'i' }
      ],
      consonant: [
        { kr: '\u3131', ro: ['g'] },
        { kr: '\u3134', ro: ['n'] },
        { kr: '\u3137', ro: ['d'] },
        { kr: '\u3139', ro: ['r'] },
        { kr: '\u3141', ro: ['m'] },
        { kr: '\u3142', ro: ['b'] },
        { kr: '\u3145', ro: ['s'] },
        { kr: '\u3147', ro: ['silent', 'ng'] },
        { kr: '\u3148', ro: ['j'] },
        { kr: '\u314a', ro: ['ch'] },
        { kr: '\u314b', ro: ['k'] },
        { kr: '\u314c', ro: ['t'] },
        { kr: '\u314d', ro: ['p'] },
        { kr: '\u314e', ro: ['h'] }
      ],
      chartRo: false
    }
  },
  methods: {
    groupByConsonant (id) {
      // return an array
      return this.koreanAlphabetChart[id].reduce((acc, char) => {
        const consonant = char.components.consonant
        if (!acc.find((c) => c.id === consonant)) {
          acc.push({ id: consonant, items: [] })
        }
        acc.find((c) => c.id === consonant).items.push(char)
        return acc
      }, [])
    }
  }
}
</script>

<style scoped>
h3 {
  font-size: 32px;
  margin-bottom: 0.7rem;
}

h4 {
  font-size: 24px;
  margin-bottom: 0.7rem;
}

@media (min-width: 600px) {
  .v-col > p {
    font-size: 20px;
    text-align: justify;
  }
}

.v-col > p > span[lang="ko"] {
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

</style>
