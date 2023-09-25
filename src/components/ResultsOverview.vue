<template>
  <v-container :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'">
    <v-row justify="center">
      <v-col v-if="!groupBy">
        <v-card>
          <v-list
            density="compact"
            lines
          >
            <v-list-item
              v-for="(res,i) in sortedResults"
              :key="`char-${i}`"
            >
              {{ res.kr }} : {{ res.tries }}
            </v-list-item>
          </v-list>
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
          group.items.push({ kr: char.kr, ro: char.ro, answer: char.answer, tries: char.tries })
        } else {
          res.push({ type: char.type, items: [{ kr: char.kr, ro: char.ro, answer: char.answer, tries: char.tries }] })
        }
      }
      return res
    },
    sortedResults () {
      return [...this.results].sort((a, b) => b.tries - a.tries)
    }
  }
}
</script>
