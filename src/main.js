import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify/*, ThemeDefinition */ } from 'vuetify'
import { createPinia } from 'pinia'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { TinyColor } from '@ctrl/tinycolor'
import { customIcons } from '@iconsets/custom.ts'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightThemeColor = new TinyColor('#ff7081')
const darkThemeColor = new TinyColor('#ff7081')
// pastel success color
const successColor = new TinyColor('#a5daa5')
const incorrectColor = new TinyColor('#ff8f81')
// const incorrectColor = new TinyColor('#0000ff')

const lightTheme = {
  dark: false,
  colors: {
    background: '#fff3f8',
    primary: lightThemeColor.toString(),
    secondary: lightThemeColor.clone().complement(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#151514',
    primary: darkThemeColor.toString(),
    secondary: darkThemeColor.clone().complement(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()
  }
}

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      ci: customIcons
    }
  },
  theme: {
    defaultTheme: 'darkTheme',
    variations: {
      colors: ['primary', 'secondary', 'success', 'incorrect', 'background'],
      lighten: 5,
      darken: 5,
      accent: 5
    },
    themes: {
      lightTheme,
      darkTheme
    }
  },
  components,
  directives
})

const routes = [
  { path: '/', name: 'Home', component: () => import('./pages/HomePage.vue') },
  { path: '/quiz-menu', name: 'QuizMenu', component: () => import('./pages/QuizMenu.vue') },
  {
    path: '/quiz-menu/beginner',
    name: 'BeginnerMenu',
    component: () => import('./pages/quiz/menus/BeginnerMenu.vue')
  },
  {
    path: '/quiz-menu/advanced',
    name: 'AdvancedMenu',
    component: () => import('./pages/quiz/menus/AdvancedMenu.vue')
  },

  { path: '/quiz', name: 'Quiz', component: () => import('./pages/quiz/BeginnerQuiz.vue') },
  { path: '/hangeul', name: 'Hangeul', component: () => import('./pages/HangeulPage.vue') },
  { path: '/cheat-sheet', name: 'CheatSheet', component: () => import('./pages/CheatSheet.vue') },
  { path: '/about', name: 'About', component: () => import('./pages/AboutPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./pages/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const pinia = createPinia()

if (localStorage.getItem('quoleuda-quiz-settings')) {
  pinia.state.value = JSON.parse(localStorage.getItem('quoleuda-quiz-settings'))
}

watch(pinia.state, (state) => {
  localStorage.setItem('quoleuda-quiz-settings', JSON.stringify(state))
}, { deep: true })

app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
