<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'"
  >
    <h1 class="mt-4">
      Cheat Sheet
    </h1>
    <h2>Roman alphabet to Hangeul</h2>
    <p>
      This revision sheet will help you take your first steps in learning Korean.
    </p>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      class="mt-12"
      hide-slider
      @update:model-value="$router.push({ name: 'CheatSheet', query: { tab: $event } });"
    >
      <v-tab
        :ripple="false"
        value="consonants"
        variant="plain"
      >
        <template #default>
          <v-btn
            :color="tab === 'consonants' ? 'primary' : ''"
            variant="tonal"
          >
            Consonants
          </v-btn>
        </template>
      </v-tab>
      <v-tab
        :ripple="false"
        value="vowels"
        variant="plain"
      >
        <v-btn
          :color="tab === 'vowels' ? 'primary' : ''"

          variant="tonal"
        >
          Vowels
        </v-btn>
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="consonants">
        <v-row class="text-left mb-12 mt-4 ">
          <v-col>
            <h3>Consonants</h3>
            <p>
              The Korean alphabet is made up of
              {{ mainConsonant.length + tenseConsonant.length + doubleConsonant.length }}
              ( {{ mainConsonant.length }} + {{ tenseConsonant.length }} + {{ doubleConsonant.length }}) consonants.
              The consonants are written in the form of a square or a circle.
            </p>
            <div
              v-for="(subtype, i) in consonantSubtype"
              :key="`subtype-${i}`"
              class="mt-12"
            >
              <h4 style="font-size: 1.6rem;">
                {{ subtype.title }}
              </h4>
              <v-list bg-color="transparent">
                <v-list-item
                  v-for="(char, j) in subtype.items"
                  :key="`subtype-char-${i}-${j}`"
                  class="text-center"
                  height="200"
                >
                  <v-list-item-title style="font-size: 3rem;line-height: 100%;">
                    <span
                      lang="ko"
                      style="font-size: 4.7rem!important; line-height: 100%;"
                    >
                      {{ char.kr }}
                    </span> &#8594;
                    <span style="line-height: 100%;">
                      "{{ char.ro[0].toUpperCase() }}"
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle
                    style="font-size: 1.5rem; overflow: unset; line-height: 2rem;"
                  >
                    {{ char.name }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
            <v-row justify="space-evenly">
              <v-col
                md="auto"
                sm="12"
              >
                <v-card
                  class="my-4 mx-auto text-center"
                  color="primary-lighten-3"
                  width="fit-content"
                >
                  <v-card-title>
                    Single final consonant
                  </v-card-title>
                  <v-divider class="mx-4" />
                  <v-card-text>
                    <v-table
                      density="compact"
                      style="background-color: unset;color: #242424 !important;"
                      theme="darkTheme"
                    >
                      <thead
                        style=" font-weight: bolder; font-size: 20px;"
                      >
                        <tr>
                          <th class="text-center text-black">
                            Hangeul
                          </th>
                          <th class="text-center text-black">
                            Romanized
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(res,i) in mainConsonant"
                          :key="`char-${i}`"
                        >
                          <td
                            class="font-weight-bold"
                            lang="ko"
                            style="font-size: 20px;"
                          >
                            {{ res.kr }}
                          </td>
                          <td>{{ (res.ro || []).join('\u0009|\u0009') }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                md="auto"
                sm="12"
              >
                <v-card
                  class="my-4 mx-auto text-center"
                  color="primary-lighten-3"
                  width="fit-content"
                >
                  <v-card-title>
                    Tense final consonant
                  </v-card-title>
                  <v-divider class="mx-4" />
                  <v-card-text>
                    <v-table
                      density="compact"
                      style="background-color: unset;color: #242424 !important;"
                      theme="darkTheme"
                    >
                      <thead
                        style=" font-weight: bolder; font-size: 20px;"
                      >
                        <tr>
                          <th class="text-center text-black">
                            Hangeul
                          </th>
                          <th class="text-center text-black">
                            Romanized
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(res,i) in tenseConsonant"
                          :key="`char-${i}`"
                        >
                          <td
                            class="font-weight-bold"
                            lang="ko"
                            style="font-size: 20px;"
                          >
                            {{ res.kr }}
                          </td>
                          <td>{{ (res.ro || []).join('\u0009|\u0009') }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                md="auto"
                sm="12"
              >
                <v-card
                  class="my-4 mx-auto text-center"
                  color="primary-lighten-3"
                  width="fit-content"
                >
                  <v-card-title>
                    Double final consonant
                  </v-card-title>
                  <v-divider class="mx-4" />
                  <v-card-text>
                    <v-table
                      density="compact"
                      style="background-color: unset;color: #242424 !important;"
                      theme="darkTheme"
                    >
                      <thead
                        style=" font-weight: bolder; font-size: 20px;"
                      >
                        <tr>
                          <th class="text-center text-black">
                            Hangeul
                          </th>
                          <th class="text-center text-black">
                            Romanized
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(res,i) in doubleConsonant"
                          :key="`char-${i}`"
                        >
                          <td
                            class="font-weight-bold"
                            lang="ko"
                            style="font-size: 20px;"
                          >
                            {{ res.kr }}
                          </td>
                          <td>{{ (res.ro || []).join('\u0009|\u0009') }}</td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="vowels">
        <v-row class="text-left mb-12 mt-4 ">
          <v-col>
            <h3>Vowels</h3>
            <p>
              The Korean alphabet is made up of
              {{ plainVowels.length + doubleVowels.length }}
              ( {{ plainVowels.length }} + {{ doubleVowels.length }} ) vowels.
              Vowels were created from the consideration of not only sounds but also philosophical principles.
              '<span lang="ko">{{ '\u318D' }}</span>',
              '<span lang="ko">{{ '\u3161' }}</span>' and
              '<span lang="ko">{{ '\u3163' }}</span>' as basic. The letter
              '<span lang="ko">{{ '\u318D' }}</span>' symbolizes the round shape of the sky, the letter
              '<span lang="ko">{{ '\u3161' }}</span>' means the plate shape of the land, and the letter
              '<span lang="ko">{{ '\u3163' }}</span>' indicates the upright shape of the human. These three, sky,
              land and human, are considered as the fundamental features of all things in Oriental philosophy.
            </p>
            <p>
              Other vowels were made by properly combining those three letters.
            </p>
            <div>
              <v-card
                class="my-4 mx-auto text-center"
                color="primary-lighten-3"
                width="fit-content"
              >
                <v-card-text>
                  <v-table
                    density="compact"
                    style="background-color: unset;color: #242424 !important;"
                    theme="darkTheme"
                  >
                    <tbody>
                      <tr
                        v-for="(line,i) in combinationVowels"
                        :key="`line-${i}`"
                      >
                        <td
                          lang="ko"
                          style="font-size: 20px;"
                        >
                          {{ line.components.join(' + ') }}
                        </td>
                        <td>&#8594;</td>
                        <td>{{ line.result }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </div>
            <div
              v-for="(subtype, i) in vowelSubtype"
              :key="`subtype-${i}`"
              class="mt-12"
            >
              <h4 style="font-size: 1.6rem;">
                {{ subtype.title }}
              </h4>
              <v-list bg-color="transparent">
                <v-list-item
                  v-for="(char, j) in subtype.items"
                  :key="`subtype-char-${i}-${j}`"
                  class="text-center"
                  height="200"
                >
                  <v-list-item-title style="font-size: 3rem;line-height: 100%;">
                    <span
                      lang="ko"
                      style="font-size: 4.7rem!important; line-height: 100%;"
                    >
                      {{ char.kr }}
                    </span> &#8594;
                    <span style="line-height: 100%;">
                      "{{ char.ro[0].toUpperCase() }}"
                    </span>
                  </v-list-item-title>
                  <!--                  <v-list-item-subtitle
                                      style="font-size: 1.5rem; overflow: unset; line-height: 2rem;"
                                    >
                                      {{ char.name }}
                                    </v-list-item-subtitle>-->
                  <!--                  <v-list-subheader>
                                      <v-chip class="mx-2">
                                        <span lang="ko">{{ char.kr }}</span>
                                      </v-chip>
                                      <span v-html="char.description" />
                                    </v-list-subheader>-->
                </v-list-item>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <v-btn
      class="mt-4"
      color="primary"
      @click="$router.push({ name: 'QuizMenu' })"
    >
      I'm ready !
    </v-btn>
  </v-container>
</template>
<script>
import hangeul from '../resources/hangeulToRoman.js'

export default {
  data () {
    return {
      tab: null,
      consonantSubtype: [
        {
          title: 'Single final consonant',
          type: 'mainConsonant',
          items: hangeul.filter(c => c.type === 'mainConsonant' && !c.tense)
        },
        {
          title: 'Tense final consonant',
          type: 'mainConsonant',
          items: hangeul.filter(c => c.type === 'mainConsonant' && c.tense)
        },
        {
          title: 'Double final consonant',
          type: 'doubleConsonant',
          items: hangeul.filter(c => c.type === 'doubleConsonant')
        }
      ],
      vowelSubtype: [
        {
          title: 'Plain vowel',
          type: 'plainVowel',
          items: hangeul.filter(c => c.type === 'plainVowel')
        },
        {
          title: 'Double vowel',
          type: 'doubleVowel',
          items: hangeul.filter(c => c.type === 'doubleVowel')
        }
      ],
      combinationVowels: [
        { components: ['\u318D', '\u3161'], result: '\u3157' },
        { components: ['\u3161', '\u318D'], result: '\u315C' },
        { components: ['\u318D', '\u3163'], result: '\u3153' },
        { components: ['\u3163', '\u318D'], result: '\u314F' }

      ]
    }
  },
  computed: {
    mainConsonant () {
      return hangeul.filter(c => c.type === 'mainConsonant' && !c.tense)
    },
    tenseConsonant () {
      return hangeul.filter(c => c.type === 'mainConsonant' && c.tense)
    },
    doubleConsonant () {
      return hangeul.filter(c => c.type === 'doubleConsonant')
    },
    plainVowels () {
      return hangeul.filter(c => c.type === 'plainVowel')
    },
    doubleVowels () {
      return hangeul.filter(c => c.type === 'doubleVowel')
    }
  },
  created () {
    this.tab = this.$route.query.tab || 'consonants'
  }
}
</script>
<style scoped>
.v-col > h3 {
  font-size: 32px;
  margin-bottom: 0.7rem;
}

@media (min-width: 600px) {
  .v-col > p {
    font-size: 20px;
    text-align: justify;
  }
}

.v-col > p > span {
  color: #ff7081;
  font-weight: bold;
}
</style>
