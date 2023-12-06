<template>
  <v-container class="justify-center">
    <h1>About</h1>
    <div
      class="my-8 mx-auto text-left"
      style="max-width: 700px;"
    >
      <p>
        This is a simple quiz app on different sources to help you learn the Korean alphabet.
      </p>
      <p>
        This is a non-exhaustive sources list:
        <v-list
          bg-color="transparent"
          density="compact"
        >
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-book-open-page-variant
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://www.korean.go.kr/front_eng/roman/roman_01.do"
              target="_blank"
            >
              National Institute of Korean Language
            </a>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-school
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://www.duolingo.com/"
              target="_blank"
            >
              Duolingo
            </a>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-icon color="primary">
                mdi-book-open-page-variant
              </v-icon>
            </template>
            <a
              class="custom-link"
              href="https://fr.wikipedia.org/wiki/Romanisation_r%C3%A9vis%C3%A9e_du_cor%C3%A9en"
              target="_blank"
            >
              <span lang="fr">Romanisation révisée du coréen</span> (Revised Romanization of Korean) - Wikipedia
              (FR)
            </a>
          </v-list-item>
        </v-list>
      </p>
      <p>
        The concept of the quiz is inspired by <a
          class="custom-link"
          href="https://kana-quiz.tofugu.com/"
        >Tofugu
          Quiz</a> which
        stands for the Japanese alphabet.
      </p>
      <p>
        Quoleuda is an open source project. The source code is available on <a
          class="custom-link"
          href="https://github.com/gabrielle-mlt/quoleuda"
          target="_blank"
        >
          GitHub</a>.
      </p>
    </div>

    <v-card
      class="mx-auto text-left mt-2"
      color="primary"
      max-width="700"
      rounded="lg"
      variant="tonal"
    >
      <v-card-title>
        <v-icon
          icon="mdi-cookie-off"
          size="small"
        />
      </v-card-title>
      <v-card-text>
        To respect your privacy, this app does not use cookies.<br>
        All the settings are saved in your browser. If you want to reset them, you can clear your browser data.
      </v-card-text>
    </v-card>

    <v-card
      class="mx-auto text-left mt-2"
      color="warning"
      max-width="700"
      rounded="lg"
      variant="tonal"
    >
      <v-card-title>
        <translate-korean-icon
          :color="$vuetify.theme.current.colors.warning"
          style="vertical-align: bottom;"
        />
      </v-card-title>
      <v-card-text>
        <p>
          {{ t('contactText', 1, {locale: 'en'}) }}
          <a
            :href="`mailto:${mail}`"
            class="custom-link"
          >
            {{ mail }}
          </a>

          <v-tooltip
            :text="t('copyToClipboard', 1, {locale: 'en'})"
            color="primary"
            open-on-hover
          >
            <template #activator="{ props : tooltipProps }">
              <v-icon
                class="ml-1"
                size="small"
                v-bind="tooltipProps"
                @click="copyToClipboard(mail);"
              >
                mdi-content-copy
              </v-icon>
            </template>
          </v-tooltip>
          <v-snackbar
            v-model="snackbar"
            :timeout="2000"
            color="blue-grey"
            max-width="fit-content"
            min-width="auto"
            rounded="pill"
            transition="fade-transition"
            width="fit-content"
          >
            {{ t('copied') }}{{ '\u2705' }}
          </v-snackbar>
        </p>
        <p
          class="mt-2"
          lang="ko"
        >
          {{ t('contactText', 1, {locale: 'ko'}) }}
          <a
            :href="`mailto:${mail}`"
            class="custom-link"
          >
            {{ mail }}</a>
          <v-tooltip
            :text="t('copyToClipboard', 1, {locale: 'ko'})"
            color="primary"
          >
            <template #activator="{ props }">
              <v-icon
                class="ml-1"
                size="small"
                v-bind="props"
                @click="copyToClipboard(mail);"
              >
                mdi-content-copy
              </v-icon>
            </template>
          </v-tooltip>
          {{ t('contactTextEnd', 1, {locale: 'ko'}) }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import TranslateKoreanIcon from '@components/icons/translate-korean-icon.vue'
import { ref } from 'vue'

const { t } = useI18n()

const mail = contactEmail
const snackbar = ref(false)

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)

  snackbar.value = true
}

</script>

<i18n lang="yaml">
en:
  contactText: "We are currently translating the app in Korean. If you want to help, please contact us at"
  contactTextEnd: ""
  copyToClipboard: "Copy to clipboard"
  copied: "Copied"
ko:
  contactText: "현재 앱을 한국어로 번역하고 있습니다. 도움을 주시려면"
  contactTextEnd: "에 문의하십시오"
  copyToClipboard: "클립 보드에 복사"
  copied: "복사됨"

</i18n>
