<template>
  <v-app-bar
    :scroll-threshold="63"
    class="pt-1"
    color="background"
    scroll-behavior="elevate"
    style="position: fixed;"
  >
    <template
      v-if="$vuetify.display.mobile"
      #prepend
    >
      <v-app-bar-nav-icon @click.stop="$emit('handleDrawer')" />
    </template>
    <v-spacer v-if="!$vuetify.display.mobile" />
    <router-link to="/">
      <!--      <v-img
              alt="Quoleuda"
              contain
              max-width="60"
              src="/quoleuda.svg"
            />-->
      <quoleuda-logo-icon :size="50" />
    </router-link>
    <v-app-bar-title
      style="color: rgb(var(--v-theme-primary));font-weight: bold; font-size: 32px;"
    >
      <router-link
        style="text-decoration: none; color: inherit;"
        to="/"
      >
        Quoleuda
      </router-link>
    </v-app-bar-title>
    <v-tabs
      v-if="!$vuetify.display.mobile"
      :mandatory="false"
      :model-value="$route.name ? ($route.name === 'Quiz' ? 'QuizMenu' : $route.name): '/'"
      align-tabs="center"
      bg-color="transparent"
      color="primary"
    >
      <v-tab
        :ripple="false"
        hide-slider
        to="/"
        value="/"
        variant="plain"
      >
        <template #default>
          <v-btn
            v-if="!$vuetify.display.mobile"
            :color="$route.name ? '' : 'primary' "
            class="ml-4"
            fab
            icon="mdi-home"
            size="x-large"
            to="/"
          />
        </template>
      </v-tab>
      <v-tab
        :ripple="false"
        hide-slider
        to="/won-converter"
        value="/"
        variant="plain"
      >
        <template #default>
          <v-btn
            v-if="!$vuetify.display.mobile"
            :color="$route.name ? '' : 'primary' "
            icon="mdi-currency-krw"
            to="/won-converter"
            variant="flat"
          />
        </template>
      </v-tab>
      <v-tab
        :class="{'text-primary':$route.name === 'Quiz' || $route.name === 'QuizMenu' || $route.name === 'BeginnerMenu'}"
        size="x-large"
        to="/quiz-menu"
        value="QuizMenu"
      >
        <template #default>
          <span
            class="mr-2"
          >
            Quiz
          </span>
          <v-menu open-on-hover>
            <template #activator="{ props }">
              <v-icon
                color="primary"
                size="large"
                v-bind="props"
                @click.prevent=""
              >
                mdi-arrow-down-drop-circle
              </v-icon>
            </template>
            <v-list>
              <v-list-item
                to="/quiz-menu/beginner"
                value="beginner"
              >
                <v-list-item-title>Beginner</v-list-item-title>
              </v-list-item>
              <!--              <v-list-item
                              to="/quiz-menu/advanced"
                              value="advanced"
                            >
                              <v-list-item-title>Advanced</v-list-item-title>
                            </v-list-item>-->
            </v-list>
          </v-menu>
        </template>
      </v-tab>
      <v-tab
        size="x-large"
        to="/hangeul"
        value="Hangeul"
      >
        Hangeul
      </v-tab>
      <v-tab
        size="x-large"
        to="/cheat-sheet"
        value="CheatSheet"
      >
        Cheat Sheet
      </v-tab>
      <v-tab
        size="x-large"
        to="/about"
        value="About"
      >
        About
      </v-tab>
      <v-tab
        size="x-large"
        to="/about-south-korea"
        value="AboutSouthKorea"
      >
        South Korea
      </v-tab>
    </v-tabs>
    <v-spacer v-if="!$vuetify.display.mobile" />

    <template #append>
      <v-menu
        v-if="!$vuetify.display.mobile"
        transition="slide-y-transition"
      >
        <template #activator="{ props }">
          <v-btn
            color="primary"
            hide-details
            icon="mdi-palette"
            size="x-large"
            v-bind="props"
          />
        </template>
        <div
          v-for="themeItem in themeStore.computedThemes"
          :key="`theme_${themeItem.id}`"
          class="ml-3 my-1"
          @click="toggleTheme(themeItem.id)"
        >
          <v-btn
            :color="themeItem.colors.primary"
            icon
            size="small"
          />
        </div>
      </v-menu>
      <v-btn
        v-if="!$vuetify.display.mobile"
        color="primary"
        hide-details
        icon="mdi-theme-light-dark"
        size="x-large"
        @click="toggleDarkMode()"
      />
      <v-menu
        v-model="settingsMenu"
        :close-on-content-click="false"
        location="bottom left"
      >
        <template #activator="{ props }">
          <v-btn
            color="primary"
            hide-details
            icon="mdi-cog"
            size="x-large"
            v-bind="props"
          />
        </template>
        <settings-card-form class="mt-2" />
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import SettingsCardForm from './SettingsCardForm.vue'
import { useThemeStore } from '@stores/themes.js'
import QuoleudaLogoIcon from '@components/icons/quoleuda-logo-icon.vue'

const theme = useTheme()

const settingsMenu = ref(false)

const themeStore = useThemeStore()
defineEmits(['handleDrawer'])

const toggleTheme = (value) => {
  themeStore.toggleTheme(value)
}

const toggleDarkMode = () => {
  themeStore.toggleDarkMode(!theme.global.current.value.dark)
}
</script>
