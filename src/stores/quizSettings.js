import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuizSettingsStore = defineStore('quizSettings', () => {
  const reverseMode = ref(false)
  const fontMode = ref({ value: 'normal', title: 'Normal', class: '' })
  const fontOptions = [
    { value: 'normal', title: 'Normal', class: '' },
    { value: 'nanum-pen-script-font', title: 'Nanum Pen Script', class: 'nanum-pen-script-font' },
    { value: 'nanum-myeongjo-font', title: 'Nanum Myeongjo', class: 'nanum-myeongjo-font' },
    { value: 'black-han-sans-font', title: 'Black Han Sans', class: 'black-han-sans-font' }
  ]

  return {
    reverseMode,
    fontMode,
    fontOptions
  }
})
