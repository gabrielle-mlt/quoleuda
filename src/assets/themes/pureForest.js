import { TinyColor } from '@ctrl/tinycolor'

const pureForestThemeColor = new TinyColor('#61880b')
const successColor = new TinyColor('#a5daa5')
const incorrectColor = new TinyColor('#ff8f81')

const pureForestLight = {
  name: 'Pure Forest',
  // id: 'pureForestLight',
  dark: false,
  colors: {
    background: '#fbfef5',
    primary: pureForestThemeColor.toString(),
    secondary: pureForestThemeColor.clone().analogous()[2].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

const pureForestDark = {
  name: 'Pure Forest',
  // id: 'pureForestDark',
  dark: true,
  colors: {
    background: '#030400',
    primary: pureForestThemeColor.toString(),
    secondary: pureForestThemeColor.clone().analogous()[2].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

export { pureForestLight, pureForestDark }
