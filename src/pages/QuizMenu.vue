<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'"
    fill-height
  >
    <h1 class="mt-md-4 mt-lg-4 mt-xl-4 mt-sm-1">
      Quiz Menu
    </h1>
    <h2>Choose your quiz !</h2>
    <v-row class="mt-5">
      <template
        v-for="(level, levelIndex) in levels"
        :key="level.title"
      >
        <v-col>
          <quiz-level-card
            :button="level.button"
            :color="level.color"
            :description="level.description"
            :slogan="level.slogan"
            :stars="level.stars"
            :title="level.title"
          >
            <template #description>
              <v-list
                :class="$vuetify.theme.current.dark ? 'text-white' : 'text-black'"
                bg-color="transparent"
              >
                <v-list-item
                  v-for="(line, index) in level.description"
                  :key="`${level.title}-desc-line-${index}`"
                  :class="line.class || ''"
                >
                  <translate-korean-icon
                    v-if="line.prependIcon === 'translate-korean'"
                    :color="$vuetify.theme.current.colors.primary"
                  />
                  <v-icon
                    v-else-if="line.prependIcon"
                    :color="level.color"
                    :icon="line.prependIcon"
                    :size="$vuetify.display.mobile ? 'small' : 'default'"
                    :style="$vuetify.display.mobile ? 'margin-top: 0.2rem;' : ''"
                  />
                  {{ line.text }}
                </v-list-item>
              </v-list>
            </template>
            <template #action-button>
              <v-btn
                :disabled="!level.active"
                :to="level.button.to"
                class="mt-3"
                color="primary"
              >
                {{ level.button.text }}
              </v-btn>
            </template>
          </quiz-level-card>
        </v-col>
        <v-spacer v-if="!$vuetify.display.mobile && levelIndex < levels.length - 1" />
      </template>
    </v-row>
  </v-container>
</template>

<script>
import QuizLevelCard from '@components/QuizLevelCard.vue'
import TranslateKoreanIcon from '@components/icons/translate-korean-icon.vue'

export default {
  components: { TranslateKoreanIcon, QuizLevelCard },
  data () {
    return {
      levels: [
        {
          title: 'Hangeul',
          slogan: 'This mode is the best for beginners !',
          stars: 1,
          color: 'primary-darken-1',
          active: true,
          description: [
            { text: 'This quiz will test your knowledge of the Korean alphabet.' },
            { text: 'You will be shown a hangeul letter/syllable and you will have to guess the corresponding romanized letter/syllable.' },
            {
              prependIcon: 'translate-korean',
              text:
                  ' Try it in reverse mode so you learn the Korean keyboard layout !'
            },
            {
              prependIcon: 'mdi-timer-outline',
              text: 'Improve your score and try to get 100% in the minimum time possible !'
            },
            {
              text: 'Challenge your friends and see who can get the best score !',
              class: 'font-weight-bold text-primary'
            }

          ],
          button: {
            text: 'Start Hangeul',
            to: '/quiz-menu/beginner'
          }
        },
        {
          title: 'Korean words',
          slogan: 'This mode is the best for advanced learners !',
          stars: 2,
          color: 'grey',
          active: false,
          description: [
            { text: 'This quiz will test your knowledge of Korean words.' },
            { text: 'You will be shown a Korean word and you will have to guess the corresponding translation.' },
            {
              text: 'Arriving soon !',
              class: 'font-weight-bold'
            }
          ],
          button: {
            text: 'Start Words',
            to: ''
          }
        },
        {
          title: 'Expert Mode',
          slogan: 'This mode is the best for experts !',
          stars: 3,
          color: 'grey',
          active: false,
          description: [
            { text: 'This quiz will test your ability to read and understand basic Korean sentences.' },
            {
              text: 'Arriving, not that soon, but one day for sure !',
              class: 'font-weight-bold'
            }
          ],
          button: {
            text: 'Start Expert',
            to: ''
          }
        }
      ]

    }
  }
}

</script>
