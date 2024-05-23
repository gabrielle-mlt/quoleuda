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
    <div v-if="groupBy">
      <div
        v-for="(set,i) in filteredSets"
        :key="i"
        class="mt-6"
      >
        <v-hover>
          <template #default="{ isHovering, props }">
            <h2
              class="my-2 position-relative"
              style="font-size: 30px; font-weight: bolder;"
              v-bind="props"
            >
              {{ set.title.ro }}

              <v-slide-x-transition>
                <v-btn
                  v-show="isHovering"
                  :to="{ name: 'Quiz', query:{mode : ''} }"
                  class="mx-3 mt-2"
                  color="primary-darken-2"
                  icon="mdi-replay"
                  position="absolute"
                  size="x-small"
                  variant="flat"
                />
              </v-slide-x-transition>
            </h2>
          </template>
        </v-hover>

        <v-row
          class="mt-2 justify-center mx-auto"
        >
          <v-col
            v-for="(cat,j) in set.categories"
            :key="`char-${j}`"
            cols="auto"
          >
            <v-card
              :variant="$vuetify.theme.current.dark ? 'tonal' : undefined "
              class="mx-auto"
              color="primary-lighten-3"
              elevation="0"
              height="auto"
              max-width="500px"
              rounded="lg"
              width="fit-content"
            >
              <v-hover>
                <template #default="{ isHovering, props }">
                  <v-card-title
                    class="my-2 position-relative"
                    style="font-size: 30px; font-weight: bolder;"
                    v-bind="props"
                  >
                    {{ cat.title }}
                    <v-slide-x-transition>
                      <v-btn
                        v-show="isHovering"
                        class="mx-3"
                        color="primary-darken-2"
                        icon="mdi-replay"
                        position="absolute"
                        size="x-small"
                        variant="flat"
                      />
                    </v-slide-x-transition>
                  </v-card-title>
                </template>
              </v-hover>
              <v-divider class="mx-6" />
              <v-card-text>
                <v-row
                  v-if="hangeul[set.id]"
                  class="justify-center align-center"
                >
                  <v-col
                    v-for="(item,i) in hangeul[set.id][cat.id]"
                    :key="i"
                  >
                    <span
                      class="font-weight-bold"
                      lang="ko"
                      style="font-size: 24px;"
                    >{{ item.kr }}</span>
                    <v-spacer />
                    <!-- find item stats in results-->
                    {{ results.find(r => r.kr === item.kr)?.tries || 0 }}
                  </v-col>
                </v-row>
                <v-row
                  v-else-if="syllables[cat.id]"
                  class="justify-center align-center"
                >
                  <v-col
                    v-for="(item,i) in [...syllables[cat.id]].slice(0, 12)"
                    :key="i"
                  >
                    <span
                      class="font-weight-bold"
                      lang="ko"
                      style="font-size: 24px;"
                    >{{ item.kr }}</span>
                    <v-spacer />
                    <!-- find item stats in results-->
                    {{ results.find(r => r.kr === item.kr)?.tries || 0 }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions
                v-if="syllables[cat.id] && syllables[cat.id].length > 12"
                class="justify-center"
              >
                <v-dialog width="500">
                  <template #activator="{props}">
                    <v-btn
                      color="primary-darken-2"
                      rounded="pill"
                      v-bind="props"
                      variant="flat"
                    >
                      Show more ({{ syllables[cat.id].length - 12 }})
                    </v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <v-card
                      color="primary-lighten-3"
                      elevation="0"
                      height="auto"
                      rounded="lg"
                      width="fit-content"
                    >
                      <v-card-title
                        class="my-2"
                        style="font-size: 30px; font-weight: bolder;"
                      >
                        {{ cat.title }}
                      </v-card-title>
                      <v-divider class="mx-6" />
                      <v-card-text>
                        <v-row class="justify-center align-center">
                          <v-col
                            v-for="(item,i) in syllables[cat.id]"
                            :key="i"
                          >
                            <span
                              class="font-weight-bold"
                              lang="ko"
                              style="font-size: 24px;"
                            >{{ item.kr }}</span>
                            <v-spacer />
                            <!-- find item stats in results-->
                            {{ results.find(r => r.kr === item.kr)?.tries || 0 }}
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          text="Close"
                          @click="isActive.value = false"
                        />
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-row justify="center">
      <v-col
        v-if="!groupBy"
        cols="auto"
      >
        <v-card
          :variant=" $vuetify.theme.current.dark ? 'tonal' : undefined "
          color="primary-lighten-3"
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
                style="background-color: unset;"
              >
                <thead
                  :style="$vuetify.display.mobile ?
                    'font-size: 14px;':'font-size: 24px;'"
                  style=" font-weight: bolder;"
                >
                  <tr>
                    <th class="text-center">
                      Letter
                    </th>
                    <th class="text-center">
                      Attempt(s)
                    </th>
                    <th class="text-center">
                      Answer(s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(res,i) in [...sortedResults].slice(0, toPrint)"
                    :key="`char-${i}`"
                  >
                    <td
                      class="font-weight-bold"
                      lang="ko"
                      style="font-size: 24px;"
                    >
                      {{ res.kr }}
                    </td>
                    <td>{{ res.tries || 0 }}</td>
                    <td>{{ (res.ro || []).join('\u0009|\u0009') }}</td>
                  </tr>
                </tbody>
              </v-table>
              <div
                v-if="toPrint < sortedResults.length"
                class="mt-3"
              >
                <v-btn
                  color="primary-darken-2"
                  rounded="pill"
                  @click="toPrint = toPrint+ 10"
                >
                  Show more
                </v-btn>
              </div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <!--      <v-col
              v-for="(group,i) in groupedResults"
              v-else
              :key="`char-group-${group.type}-${i}`"
              cols="auto"
              sm="6"
              xs="12"
            >
              <v-card
                color="primary-lighten-3"
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
                        lang="ko"
                        style="font-size: 24px;"
                      >{{ char.kr }}</span>
                      <v-spacer />
                      {{ char.tries || 0 }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import hangeulToRoman from '@resources/hangeulToRoman.js'
import syllables from '@resources/koreanAlphabetChart.js'
import transliterationsSet from '@resources/transliterationsSet.js'

export default {
  props: {
    results: { type: Array, default: () => [] },
    modes: { type: Array, default: () => [] }
  },
  data () {
    return {
      hangeul: [],
      syllables: [],
      sets: [],
      groupBy: true,
      titles: {
        plainVowel: 'Single vowels',
        doubleVowel: 'Composed vowels',
        mainConsonant: 'Single Consontants',
        doubleConsonant: 'Double consonants',
        syllable: 'Syllables'
      },
      toPrint: 6
    }
  },
  computed: {
    groupedResults () {
      const res = []
      for (const mode of this.modes) {
        const items = this.results.filter(r => hangeulToRoman[r.kr]?.type === mode)
        const type = items[0]?.type
        res.push({ type, items })
      }
      return res
    },
    sortedResults () {
      return [...this.results].sort((a, b) => a.score - b.score)
    },
    filteredSets () {
      console.log('filteredSets', this.modes)
      console.log(this.modes[0])
      if (this.modes[0] === 'all') return this.sets
      const ret = []
      for (const set of this.sets) {
        const filteredCat = set.categories.filter(cat => this.modes.includes(cat.id))
        console.log('ret', { ...set, categories: filteredCat })
        if (filteredCat && filteredCat.length) ret.push({ ...set, categories: filteredCat })
      }
      console.log(ret)
      return ret
    }
  },
  created () {
    // filter hangeul to roman by modes
    this.hangeul = hangeulToRoman
    this.syllables = syllables
    this.sets = transliterationsSet
  }
}
</script>
