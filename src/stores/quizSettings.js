import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useQuizSettingsStore = defineStore('quizSettings', () => {
  const reverseMode = ref(false)
  const fontMode = ref({ value: 'normal', title: 'Normal', class: '' })
  const fontOptions = [
    { value: 'normal', title: 'Normal', class: '' },
    { value: 'nanum-pen-script-font', title: 'Nanum Pen Script', class: 'nanum-pen-script-font' },
    { value: 'nanum-myeongjo-font', title: 'Nanum Myeongjo', class: 'nanum-myeongjo-font' },
    { value: 'black-han-sans-font', title: 'Black Han Sans', class: 'black-han-sans-font' }
  ]

  if (localStorage.getItem('quoleuda_reverse_mode')) {
    reverseMode.value = JSON.parse(localStorage.getItem('quoleuda_reverse_mode'))
  }

  if (localStorage.getItem('quoleuda_font_mode')) {
    fontMode.value = JSON.parse(localStorage.getItem('quoleuda_font_mode'))
  }

  watch(reverseMode, (value) => {
    localStorage.setItem('quoleuda_reverse_mode', value)
  })

  watch(fontMode, (value) => {
    localStorage.setItem('quoleuda_font_mode', JSON.stringify(value))
  })

  return {
    reverseMode,
    fontMode,
    fontOptions
  }
})
