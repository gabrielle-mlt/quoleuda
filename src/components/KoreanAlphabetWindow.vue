<template>
  <v-row class="text-left mb-12 mt-4 ">
    <v-col>
      <h3>Korean Alphabet Overview</h3>
      <v-card
        class="my-4 mx-auto text-center"
        color="primary-lighten-3"
        width="fit-content"
      >
        <v-card-text>
          <v-table
            class="mb-4"
            density="compact"
            style="background-color: unset;color: #242424 !important;"
            theme="darkTheme"
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
                v-for="(group,gindex) in groupByConsonant"
                :key="`char-${gindex}`"
              >
                <td
                  lang="ko"
                  style="font-size: 20px;"
                >
                  <span>{{ groupByConsonant[gindex].id }}</span>
                  <span style="font-size: 0.9rem; opacity: 0.7;">
                    ({{ hangeul.find(h => h.kr === groupByConsonant[gindex].id).ro[0] }})
                  </span>
                </td>
                <td
                  v-for="(item, cindex) in group.items"
                  :key="`char-${cindex}`"
                  lang="ko"
                >
                  {{ item.kr }}
                </td>
              </tr>
            </tbody>
          </v-table>
          ©Modern Seoul Magazine (2012)
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import chart from '../resources/koreanAlphabetChart.js'
import hangeul from '../resources/hangeulToRoman.js'

export default {
  data () {
    return {
      hangeul,
      chart,
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
      ]
    }
  },
  computed: {
    groupByConsonant () {
      // return an array
      return this.chart.reduce((acc, char) => {
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
.v-col > h3 {
  font-size: 32px;
  margin-bottom: 0.7rem;
}
</style>
