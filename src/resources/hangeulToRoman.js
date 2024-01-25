/* eslint-disable no-multi-spaces */
const plainVowels = [
  {
    kr: '\u314f', // ㅏ
    inSentence: '\u110b\u1161', // 아
    ro: ['a'],
    type: 'plainVowel',
    name: 'a',
    description: 'is pronounced like "ah!". It sounds like <u>a</u> in "Kore<u>a</u>" or "<u>A</u>meric<u>a</u>".'
  },
  {
    kr: '\u3151', // ㅑ
    inSentence: '\u110b\u1163', // 야
    ro: ['ya'],
    type: 'plainVowel',
    name: 'ya',
    description: 'is pronounced like "yah!". It sounds like <u>ya</u> in "<u>Ya</u>rd" or "<u>Ya</u>le"'
  },
  {
    kr: '\u3153', // ㅓ
    inSentence: '\u110b\u1165', // 어
    ro: ['eo'],
    type: 'plainVowel',
    name: 'eo',
    description: 'is pronounced like "...". It\'s exactly like the <u>o</u> in the word"g<u>o</u>ld"'
  },
  {
    kr: '\u3155', // ㅕ
    inSentence: '\u110b\u1167', // 여
    ro: ['yeo'],
    type: 'plainVowel',
    name: 'yeo'
  },
  {
    kr: '\u3157',       // ㅗ
    inSentence: '\u110b\u1169', // 오
    ro: ['o', 'ô', 'oo'],
    type: 'plainVowel',
    name: 'o',
    description: 'is pronounced like "oh!". It sounds like <u>o</u> in "<u>O</u>hio" or "<u>O</u>ctober"'
  },
  {
    kr: '\u315b', // ᅭ
    inSentence: '\u110b\u116d', // 요
    ro: ['yo', 'yô', 'yoo'],
    type: 'plainVowel',
    name: 'yo'
  },
  {
    kr: '\u315c', // ᅮ
    inSentence: '\u110b\u116e', // 우
    ro: ['ou', 'u'],
    type: 'plainVowel',
    name: 'u'
  },
  {
    kr: '\u3160', // ᅲ
    inSentence: '\uc720', // 유
    ro: ['you', 'yu'],
    type: 'plainVowel',
    name: 'yu'
  },
  {
    kr: '\u3161', // ᅳ
    inSentence: '\u110b\u1173', // 으
    ro: ['eu'],
    type: 'plainVowel',
    name: 'eu'
  },
  {
    kr: '\u3163', // ᅵ
    inSentence: '\u110b\u1175', // 이
    ro: ['i', 'e', 'ee'],
    type: 'plainVowel',
    name: 'i'
  }]

const doubleVowels = [
  {
    kr: '\u3150', // ㅐ
    inSentence: '\uc560', // 애
    ro: ['ae', 'è'],
    type: 'doubleVowel'
  },
  {
    kr: '\u3152', // ㅒ
    inSentence: '\uc598', // 얘
    ro: ['yae', 'yè'],
    type: 'doubleVowel'
  },
  {
    kr: '\u3154', // ㅔ
    inSentence: '\uc5d0', // 에
    ro: ['e', 'è']
  },
  {
    kr: '\u3156', // ㅖ
    inSentence: '\uc608', // 예
    ro: ['ye', 'yé']
  },
  {
    kr: '\u3158', // ㅘ
    inSentence: '\uc640', // 와
    ro: ['wa']
  },
  {
    kr: '\u3159', // ㅙ
    inSentence: '\uc65c', // 왜
    ro: ['wae', 'wè']
  },
  {
    kr: '\u315a', // ㅚ
    inSentence: '\uc678', // 외
    ro: ['oe', 'wé']
  },
  {
    kr: '\u315d', // ㅝ
    inSentence: '\uc6cc', // 워
    ro: ['wo', 'weo']
  },
  {
    kr: '\u315e', // ㅞ
    inSentence: '\uc6e8', // 웨
    ro: ['we', 'wé']
  },
  {
    kr: '\u315f', // ㅟ
    inSentence: '\uc704', // 위
    ro: ['wi']
  },
  {
    kr: '\u3162', // ㅢ
    inSentence: '\uc758', // 의
    ro: ['ui', 'yi']
  }
]

const mainConsonants = [
  { kr: '\u3131', ro: ['g', 'k'], name: 'giyeok' },          // ㄱ
  { kr: '\u3134', ro: ['n'], name: 'nieun' },               // ㄴ
  { kr: '\u3137', ro: ['d', 't'], name: 'digeut' },          // ㄷ
  { kr: '\u3139', ro: ['r', 'l'], name: 'rieul' },          // ㄹ
  { kr: '\u3141', ro: ['m'], name: 'mieum' },               // ㅁ
  { kr: '\u3142', ro: ['b', 'p'], name: 'bieup' },          // ㅂ
  { kr: '\u3145', ro: ['s'], name: 'siot' },               // ㅅ
  { kr: '\u3147', ro: ['ng'], name: 'ieung' },              // ㅇ
  { kr: '\u3148', ro: ['j', 'ch'], name: 'jieut' },         // ㅈ
  { kr: '\u314a', ro: ['ch'], name: 'chieut' },              // ㅊ
  { kr: '\u314b', ro: ['k'], name: 'kieuk' },               // ㅋ
  { kr: '\u314c', ro: ['t'], name: 'tieut' },               // ㅌ
  { kr: '\u314d', ro: ['p'], name: 'pieup' },               // ㅍ
  { kr: '\u314e', ro: ['h'], name: 'hieut' },               // ㅎ
  { kr: '\u3132', ro: ['kk'], name: 'ssang-giyeok', tense: true },              // ㄲ
  { kr: '\u3138', ro: ['tt'], name: 'ssang-digeut', tense: true },              // ㄸ
  { kr: '\u3149', ro: ['jj'], name: 'ssang-jieut', tense: true },              // ㅉ
  { kr: '\u3143', ro: ['bb', 'pp'], name: 'ssang-bieup', tense: true },        // ㅃ
  { kr: '\u3146', ro: ['ss'], name: 'ssang-siot', tense: true }               // ㅆ
]

const doubleConsonants = [
  { kr: '\u3133', ro: ['gs', 'ks'], name: 'giyeok-sios' },      // ㄳ
  { kr: '\u3135', ro: ['nj'], name: 'nieun-cieuc' },            // ㄵ
  { kr: '\u3136', ro: ['nh'], name: 'nieun-hieuh' },           // ㄶ
  { kr: '\u313a', ro: ['lg', 'lk'], name: 'rieul-kiyeok' },      // ㄺ
  { kr: '\u313b', ro: ['lm'], name: ' rieul-mieum' },            // ㄻ
  { kr: '\u313c', ro: ['lb', 'lp'], name: 'rieul-pieup' },      // ㄼ
  { kr: '\u313d', ro: ['ls'], name: ' rieul-sios' },            // ㄽ
  { kr: '\u313e', ro: ['lt'], name: 'rieul-thieuth' },            // ㄾ
  { kr: '\u313f', ro: ['lp'], name: 'rieul-phieuph' },            // ㄿ
  { kr: '\u3140', ro: ['lh'], name: 'rieul-hieuh' },            // ㅀ
  { kr: '\u3144', ro: ['bs', 'ps'], name: 'pieup-sios' }      // ㅄ
]

export default {
  vowel: {
    plainVowel: plainVowels,
    doubleVowel: doubleVowels
  },
  consonant: {
    mainConsonant: mainConsonants,
    doubleConsonant: doubleConsonants
  }
}
/* eslint-enable */
