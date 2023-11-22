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
      <v-img
        alt="Quoleuda"
        contain
        max-width="60"
        src="/quoleuda.svg"
      />
    </router-link>
    <v-app-bar-title
      style="color: rgb(var(--v-theme-primary));font-weight: bold; font-size: 32px;"
    >
      Quoleuda
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
            class="mx-4"
            fab
            icon="mdi-home"
            size="x-large"
            to="/"
          />
        </template>
      </v-tab>
      <v-tab
        :class="{'text-primary':$route.name === 'Quiz' || $route.name === 'QuizMenu'}"
        size="x-large"
        to="/quiz-menu"
        value="QuizMenu"
      >
        Quiz
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
    </v-tabs>
    <v-spacer v-if="!$vuetify.display.mobile" />

    <template #append>
      <v-btn
        color="primary"
        hide-details
        icon="mdi-theme-light-dark"
        size="x-large"
        @click="toggleTheme()"
      />
    </template>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

defineEmits(['handleDrawer'])
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'

  // Save theme to localStorage
  localStorage.setItem('quoleuda_theme', theme.global.name.value)
}

</script>
