/* eslint-disable no-multi-spaces */
export default [
  // TODO - add a description and a name to each character
  {
    kr: '\u314f', // ㅏ
    ro: ['a'],
    type: 'plainVowel',
    name: 'a',
    description: 'is pronounced like "ah!". It sounds like <u>a</u> in "Kore<u>a</u>" or "<u>A</u>meric<u>a</u>".'
  },
  {
    kr: '\u3151', // ㅑ
    ro: ['ya'],
    type: 'plainVowel',
    name: 'ya',
    description: 'is pronounced like "yah!". It sounds like <u>ya</u> in "<u>Ya</u>rd" or "<u>Ya</u>le"'
  },
  {
    kr: '\u3153',
    ro: ['eo'],
    type: 'plainVowel',
    name: 'eo',
    description: 'is pronounced like "...". It\'s exactly like the <u>o</u> in the word"g<u>o</u>ld"'
  },                 // ㅓ
  { kr: '\u3155', ro: ['yeo'], type: 'plainVowel', name: 'yeo' },                // ㅕ
  {
    kr: '\u3157',
    ro: ['o', 'ô', 'oo'],
    type: 'plainVowel',
    name: 'o',
    description: 'is pronounced like "oh!". It sounds like <u>o</u> in "<u>O</u>hio" or "<u>O</u>ctober"'
  },       // ㅗ
  { kr: '\u315b', ro: ['yo', 'yô', 'yoo'], type: 'plainVowel', name: 'yo' },    // ᅭ
  { kr: '\u315c', ro: ['ou', 'u'], type: 'plainVowel', name: 'u' },            // ᅮ
  { kr: '\u3160', ro: ['you', 'yu'], type: 'plainVowel', name: 'yu' },          // ᅲ
  { kr: '\u3161', ro: ['eu'], type: 'plainVowel', name: 'eu' },                 // ᅳ
  { kr: '\u3163', ro: ['i', 'e', 'ee'], type: 'plainVowel', name: 'i' },                  // ᅵ
  { kr: '\u3150', ro: ['ae', 'è'], type: 'doubleVowel' },           // ㅐ
  { kr: '\u3152', ro: ['yae', 'yè'], type: 'doubleVowel' },         // ㅒ
  { kr: '\u3154', ro: ['e', 'è'], type: 'doubleVowel' },           // ㅔ
  { kr: '\u3156', ro: ['ye', 'yé'], type: 'doubleVowel' },          // ㅖ
  { kr: '\u3158', ro: ['wa'], type: 'doubleVowel' },                // ㅘ
  { kr: '\u3159', ro: ['wae', 'wè'], type: 'doubleVowel' },         // ㅙ
  { kr: '\u315a', ro: ['oe', 'wé'], type: 'doubleVowel' },          // ㅚ
  { kr: '\u315d', ro: ['wo', 'weo'], type: 'doubleVowel' },         // ㅝ
  { kr: '\u315e', ro: ['we', 'wé'], type: 'doubleVowel' },          // ㅞ
  { kr: '\u315f', ro: ['wi'], type: 'doubleVowel' },                // ㅟ
  { kr: '\u3162', ro: ['ui', 'yi'], type: 'doubleVowel' },          // ㅢ
  { kr: '\u3131', ro: ['g', 'k'], type: 'mainConsonant', name: 'giyeok' },          // ㄱ
  { kr: '\u3134', ro: ['n'], type: 'mainConsonant', name: 'nieun' },               // ㄴ
  { kr: '\u3137', ro: ['d', 't'], type: 'mainConsonant', name: 'digeut' },          // ㄷ
  { kr: '\u3139', ro: ['r', 'l'], type: 'mainConsonant', name: 'rieul' },          // ㄹ
  { kr: '\u3141', ro: ['m'], type: 'mainConsonant', name: 'mieum' },               // ㅁ
  { kr: '\u3142', ro: ['b', 'p'], type: 'mainConsonant', name: 'bieup' },          // ㅂ
  { kr: '\u3145', ro: ['s'], type: 'mainConsonant', name: 'siot' },               // ㅅ
  { kr: '\u3147', ro: ['ng'], type: 'mainConsonant', name: 'ieung' },              // ㅇ
  { kr: '\u3148', ro: ['j', 'ch'], type: 'mainConsonant', name: 'jieut' },         // ㅈ
  { kr: '\u314a', ro: ['ch'], type: 'mainConsonant', name: 'chieut' },              // ㅊ
  { kr: '\u314b', ro: ['k'], type: 'mainConsonant', name: 'kieuk' },               // ㅋ
  { kr: '\u314c', ro: ['t'], type: 'mainConsonant', name: 'tieut' },               // ㅌ
  { kr: '\u314d', ro: ['p'], type: 'mainConsonant', name: 'pieup' },               // ㅍ
  { kr: '\u314e', ro: ['h'], type: 'mainConsonant', name: 'hieut' },               // ㅎ
  { kr: '\u3132', ro: ['kk'], type: 'mainConsonant', name: 'ssang-giyeok', tense: true },              // ㄲ
  { kr: '\u3138', ro: ['tt'], type: 'mainConsonant', name: 'ssang-digeut', tense: true },              // ㄸ
  { kr: '\u3149', ro: ['jj'], type: 'mainConsonant', name: 'ssang-jieut', tense: true },              // ㅉ
  { kr: '\u3143', ro: ['bb', 'pp'], type: 'mainConsonant', name: 'ssang-bieup', tense: true },        // ㅃ
  { kr: '\u3146', ro: ['ss'], type: 'mainConsonant', name: 'ssang-siot', tense: true },               // ㅆ
  { kr: '\u3133', ro: ['gs', 'ks'], type: 'doubleConsonant' },      // ㄳ
  { kr: '\u3135', ro: ['nj'], type: 'doubleConsonant' },            // ㄵ
  { kr: '\u3136', ro: ['nh'], type: 'doubleConsonant' },           // ㄶ
  { kr: '\u313a', ro: ['lg', 'lk'], type: 'doubleConsonant' },      // ㄺ
  { kr: '\u313b', ro: ['lm'], type: 'doubleConsonant' },            // ㄻ
  { kr: '\u313c', ro: ['lb', 'lp'], type: 'doubleConsonant' },      // ㄼ
  { kr: '\u313d', ro: ['ls'], type: 'doubleConsonant' },            // ㄽ
  { kr: '\u313e', ro: ['lt'], type: 'doubleConsonant' },            // ㄾ
  { kr: '\u313f', ro: ['lp'], type: 'doubleConsonant' },            // ㄿ
  { kr: '\u3140', ro: ['lh'], type: 'doubleConsonant' },            // ㅀ
  { kr: '\u3144', ro: ['bs', 'ps'], type: 'doubleConsonant' }      // ㅄ

]
/* eslint-enable */
