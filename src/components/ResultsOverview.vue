<template>
  <v-container :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'">
    <div class="ma-auto">
      <v-switch
        v-model="groupBy"
        center-affix
        hide-details
        style="justify-items: center;"
      />
    </div>
    <v-row justify="center">
      <v-col
        v-if="!groupBy"
        cols="auto"
      >
        <v-card
          :color="$vuetify.theme.global.name === 'darkTheme' ? 'primary-lighten-2' : 'primary-lighten-3'"
          elevation="0"
          height="auto"
          rounded="lg"
          width="fit-content"
        >
          <v-card-title
            class="my-2"
            style="font-size: 30px; font-weight: bolder;"
          >
            Sorted by errors
          </v-card-title>
          <v-divider class="mx-6" />

          <v-card-text style="width: fit-content;">
            <v-sheet
              class="ma-auto"
              color="transparent"
              width="fit-content"
            >
              <v-table
                density="compact"
                style="background-color: unset;color: #242424 !important;"
                theme="darkTheme"
              >
                <thead style="font-size: 24px; font-weight: bolder;">
                  <tr>
                    <th class="text-center text-black">
                      Letter
                    </th>
                    <th class="text-center text-black">
                      Attemps
                    </th>
                    <th class="text-center text-black">
                      Answer(s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(res,i) in sortedResults"
                    :key="`char-${i}`"
                  >
                    <td
                      class="font-weight-bold"
                      style="font-size: 24px;"
                    >
                      {{ res.kr }}
                    </td>
                    <td>{{ res.tries || 0 }}</td>
                    <td>{{ (res.ro || []).join('\u0009|\u0009') }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-for="(group,i) in groupedResults"
        v-else
        :key="`char-group-${group.type}-${i}`"
        cols="auto"
        sm="6"
        xs="12"
      >
        <v-card
          :color="$vuetify.theme.global.name === 'darkTheme' ? 'primary-lighten-2' : 'primary-lighten-3'"
          elevation="0"
          height="auto"
          rounded="lg"
          width="auto"
        >
          <v-card-title
            class="my-2"
            style="font-size: 30px; font-weight: bolder;"
          >
            {{ titles[group?.type] || '' }}
          </v-card-title>
          <v-divider class="mx-6" />

          <v-card-text class="my-5">
            <v-row
              class="justify-center align-center"
            >
              <v-col
                v-for="(char,j) in group.items"
                :key="`char-${j}-group-by`"
                :cols="!$vuetify.display.mobile && group.items.length > 12 ? '1' :'auto' "
              >
                <span
                  class="font-weight-bold"
                  style="font-size: 24px;"
                >{{ char.kr }}</span>
                <v-spacer />
                {{ char.tries || 0 }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: {
    results: { type: Array, default: () => [] }
  },
  data () {
    return {
      groupBy: true,
      titles: {
        plainVowel: 'Single vowels',
        doubleVowel: 'Composed vowels',
        mainConsonant: 'Consontants'

      }
    }
  },
  computed: {
    groupedResults () {
      const res = []

      for (const char of [...this.results]) {
        const group = res.find(group => group.type === char.type)
        if (group) {
          group.items.push({ kr: char.kr, ro: char.ro, answer: char.answer, tries: char.tries, score: char.score })
        } else {
          res.push({
            type: char.type,
            items: [{ kr: char.kr, ro: char.ro, answer: char.answer, tries: char.tries, score: char.score }]
          })
        }
      }
      return res
    },
    sortedResults () {
      return [...this.results].sort((a, b) => a.score - b.score)
    }
  }
}
</script>
