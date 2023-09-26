import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify/*, ThemeDefinition */ } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { TinyColor } from '@ctrl/tinycolor'

const lightThemeColor = new TinyColor('#ff7081')
const darkThemeColor = new TinyColor('#ff7081')
// pastel success color
const successColor = new TinyColor('#a5daa5')

const lightTheme = {
  dark: false,
  colors: {
    background: '#fff3f8',
    primary: lightThemeColor.toString(),
    'primary-lighten-1': lightThemeColor.clone().lighten(30).toString(),
    'primary-lighten-2': lightThemeColor.clone().lighten(60).toString(),
    'primary-lighten-3': lightThemeColor.clone().lighten(80).toString(),
    'primary-darken-1': lightThemeColor.clone().darken(30).toString(),
    'primary-darken-2': lightThemeColor.clone().darken(60).toString(),
    'primary-darken-3': lightThemeColor.clone().darken(65).toString(),
    'primary-desaturate-1': lightThemeColor.clone().darken(40).desaturate(55).toString(),
    secondary: lightThemeColor.clone().complement(),
    'secondary-lighten-1': lightThemeColor.clone().complement().lighten(30),
    'secondary-lighten-2': lightThemeColor.clone().complement().lighten(60),
    'secondary-lighten-3': lightThemeColor.clone().complement().lighten(80),
    'secondary-darken-1': lightThemeColor.clone().complement().darken(30),
    'secondary-darken-2': lightThemeColor.clone().complement().darken(60),
    'secondary-darken-3': lightThemeColor.clone().complement().darken(65),
    success: successColor.toString(),
    'success-lighten-1': successColor.clone().lighten(30).toString()

  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#151514',
    primary: darkThemeColor.toString(),
    'primary-lighten-1': darkThemeColor.clone().lighten(30).toString(),
    'primary-lighten-2': darkThemeColor.clone().lighten(60).toString(),
    'primary-lighten-3': darkThemeColor.clone().lighten(80).toString(),
    'primary-darken-1': darkThemeColor.clone().darken(30).toString(),
    'primary-darken-2': darkThemeColor.clone().darken(60).toString(),
    'primary-darken-3': darkThemeColor.clone().darken(65).toString(),
    'primary-desaturate-1': darkThemeColor.clone().darken(40).desaturate(55).toString(),
    secondary: darkThemeColor.clone().complement(),
    'secondary-lighten-1': darkThemeColor.clone().complement().lighten(30),
    'secondary-lighten-2': darkThemeColor.clone().complement().lighten(60),
    'secondary-lighten-3': darkThemeColor.clone().complement().lighten(90),
    'secondary-darken-1': darkThemeColor.clone().complement().darken(30),
    'secondary-darken-2': darkThemeColor.clone().complement().darken(60),
    'secondary-darken-3': darkThemeColor.clone().complement().darken(65),
    success: successColor.toString(),
    'success-lighten-1': successColor.clone().lighten(30).toString()
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme
    },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 5,
      darken: 2
    }
  },
  components,
  directives
})

const routes = [
  { path: '/', name: 'Home', component: () => import('./pages/HomePage.vue') },
  { path: '/quiz-menu', name: 'QuizMenu', component: () => import('./pages/QuizMenu.vue') },
  { path: '/quiz', name: 'Quiz', component: () => import('./pages/QuizPage.vue') },
  { path: '/hangeul', name: 'Hangeul', component: () => import('./pages/HangeulPage.vue') },
  { path: '/cheat-sheet', name: 'CheatSheet', component: () => import('./pages/CheatSheet.vue') },
  { path: '/about', name: 'About', component: () => import('./pages/AboutPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.mount('#app')
