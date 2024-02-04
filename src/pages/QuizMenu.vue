<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1400px;'"
    fill-height
  >
    <h1 class="mt-md-4 mt-lg-4 mt-xl-4 mt-sm-1">
      Quiz Menu
    </h1>
    <h2>Choose your quiz !</h2>
    <v-row class="mt-5 justify-space-evenly">
      <v-col
        v-for="(level, levelIndex) in levels"
        :key="level.title"
        cols="auto"
      >
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
              :color="$vuetify.theme.current.dark ? level.color +'-lighten-1' : level.color +'-darken-1'"
              :disabled="!level.active"
              :to="level.button.to"
              class="mt-3"
            >
              {{ level.button.text }}
            </v-btn>
          </template>
        </quiz-level-card>
      </v-col>
    </v-row>

    <!--    <div class="custom-container">
          <div
            class="custom-card"
            style="&#45;&#45;clr:#ff0;"
          />
          <div
            class="custom-card"
            style="&#45;&#45;clr:#f00;"
          />
        </div>-->
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
          color: 'primary',
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
  },
  mounted () {
    const cards = document.querySelectorAll('.custom-card')
    for (const card of (cards)) {
      card.onmousemove = (e) => {
        const x = e.pageX - card.offsetLeft
        const y = e.pageY - card.offsetTop
        card.style.setProperty('--x', `${x}px`)
        card.style.setProperty('--y', `${y}px`)
      }
    }
  }
}

</script>

<style>
.custom-card {
  position: relative;
  width: 320px;
  height: 400px;
  background: rgb(var(--v-theme-primary-lighten-2));
  opacity: 1;
  border-radius: 8px;
  overflow: hidden;
}

.custom-card:before {
  content: '';
  position: absolute;
  background: radial-gradient(rgb(var(--v-theme-primary-lighten-5)), transparent, transparent);
  width: 800px;
  height: 800px;
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.5s, top 0s, left 0s
}

.custom-card:hover::before {
  opacity: 1;
}

.custom-card:after {
  content: '';
  position: absolute;
  inset: 5px;
  border-radius: 8px;
  background: rgb(var(--v-theme-primary-lighten-2));
  opacity: 0.75;

}

.custom-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex: wrap;
  gap: 50px;
}

</style>
