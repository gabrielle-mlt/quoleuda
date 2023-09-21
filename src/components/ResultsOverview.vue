<template>
  <v-container>
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
          color="primary"
          variant="outlined"
        >
          <v-card-title>{{ titles[group?.type] || '' }}</v-card-title>
          <v-card-text class="my-5">
            <v-row
              class="justify-center align-center"
            >
              <v-col
                v-for="(char,j) in group.items"
                :key="`char-${j}-group-by`"
                cols="auto"
                sm="2"
              >
                <span class="font-weight-bold">{{ char.kr }}</span>
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
        plainConsonant: 'Single consonants',
        composedConsonant: 'Composed consonants'

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
