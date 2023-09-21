<template>
  <div>
    <v-app-bar
      color="transparent"
      elevation="0"
    >
      <template
        v-if=" $vuetify.display.mobile"
        #prepend
      >
        <v-app-bar-nav-icon @click.stop="$emit('handleDrawer')" />
      </template>
      <v-spacer v-if="!$vuetify.display.mobile" />
      <v-img
        alt="Quoleuda"
        contain
        max-width="60"
        src="/quoleuda.svg"
      />
      <v-app-bar-title
        style="color: #ff7081;font-weight: bold;"
      >
        Quoleuda
      </v-app-bar-title>
      <v-tabs
        v-if="!$vuetify.display.mobile"
        :mandatory="false"
        :model-value="$route.name || '/'"
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
              to="/"
            />
          </template>
        </v-tab>
        <v-tab
          to="/quiz-menu"
          value="QuizMenu"
        >
          Quiz
        </v-tab>
        <v-tab
          to="/hangul-cheat-sheet"
          value="HangulCheatSheet"
        >
          Hangul
        </v-tab>
        <v-tab
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
          @click="toggleTheme()"
        />
      </template>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

defineEmits(['handleDrawer'])
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
}

</script>
<style scoped>

</style>
