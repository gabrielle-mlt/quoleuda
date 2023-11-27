import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { computed, ref } from 'vue'

export const useThemeStore = defineStore('themes', () => {
  const theme = ref('sakuraTheme')

  const currentTheme = useTheme()

  const computedThemes = computed(() => {
    const transformedArray = Object.entries(currentTheme.themes.value).map(([id, data]) => ({
      id,
      colors: data.colors,
      name: data.name,
      dark: data.dark
    }))

    return transformedArray.filter((item) => item.id !== 'light' && item.id !== 'dark' && item.dark === currentTheme.global.current.value.dark)
  })

  const toggleTheme = (value = 'sakuraLight') => {
    if (!currentTheme) return false
    if (value === currentTheme.global.name.value) return true

    currentTheme.global.name.value = value
    localStorage.setItem('quoleuda_theme', currentTheme.global.name.value)
  }

  const toggleDarkMode = (dark = false) => {
    if (!currentTheme) return false
    if (dark) {
      currentTheme.global.name.value = currentTheme.global.name.value.replace('Light', 'Dark')
      currentTheme.global.current.value.dark = true
    } else {
      currentTheme.global.name.value = currentTheme.global.name.value.replace('Dark', 'Light')
      currentTheme.global.current.value.dark = false
    }

    localStorage.setItem('quoleuda_theme', currentTheme.global.name.value)
  }

  return {
    theme,
    computedThemes,
    toggleTheme,
    toggleDarkMode
  }
})
