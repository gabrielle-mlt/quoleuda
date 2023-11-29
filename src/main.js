import { createApp } from 'vue'
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
import { customIcons } from '@iconsets/custom.ts'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { sakuraDark, sakuraLight } from '@assets/themes/sakura.js'
import { deepOceanLight, deepOceanDark } from '@assets/themes/deepOcean.js'
import { pureForestDark, pureForestLight } from '@assets/themes/pureForest.js'

let defaultTheme = 'sakuraDark'
const localStorageTheme = localStorage.getItem('quoleuda_theme')

if (localStorageTheme != null && ['sakuraDark', 'sakuraLight', 'deepOceanLight', 'deepOceanDark', 'pureForestDark', 'pureForestLight'].includes(localStorageTheme)) {
  defaultTheme = localStorage.getItem('quoleuda_theme')
} else {
  localStorage.removeItem('quoleuda_theme')
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
    defaultTheme,
    variations: {
      colors: ['primary', 'secondary', 'success', 'incorrect', 'background'],
      lighten: 5,
      darken: 5,
      accent: 5
    },
    themes: {
      sakuraDark,
      sakuraLight,
      deepOceanLight,
      deepOceanDark,
      pureForestDark,
      pureForestLight
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
  { path: '/about-south-korea', name: 'AboutSouthKorea', component: () => import('./pages/SouthKoreaPageTS.vue') },
  { path: '/about', name: 'About', component: () => import('./pages/AboutPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./pages/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
