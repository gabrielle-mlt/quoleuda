export default [
  {
    id: 'vowel',
    title: { ro: 'Vowels', transliteration: 'choseong', kr: '\ucd08\uc131' }, // 초성
    categories: [
      {
        id: 'plainVowel',
        title: 'Plain Vowels'
      },
      {
        id: 'doubleVowel',
        title: 'Double Vowels'
      }
    ]

  },
  {
    id: 'consonant',
    title: { ro: 'Consonants', transliteration: 'jungseong', kr: '중성' },
    categories: [
      {
        id: 'mainConsonant',
        title: 'Single Consonants'
      },
      {
        id: 'doubleConsonant',
        title: 'Double Consonants'
      }
    ]
  }/*,
  {
    id: 'syllable',
    title: { ro: 'Syllables' },
    categories: [
      {
        id: '2-syllable',
        title: 'Syllable'
      }
    ]
  } */
]
