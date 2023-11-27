import { TinyColor } from '@ctrl/tinycolor'

const sakuraThemeColor = new TinyColor('#ff7081')
const successColor = new TinyColor('#a5daa5')
const incorrectColor = new TinyColor('#ff8f81')

const sakuraLight = {
  name: 'Sakura',
  // id: 'sakuraLight',
  dark: false,
  colors: {
    background: '#fff3f8',
    primary: sakuraThemeColor.toString(),
    secondary: sakuraThemeColor.clone().tetrad()[2].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

const sakuraDark = {
  name: 'Sakura',
  // id: 'sakuraDark',
  dark: true,
  colors: {
    background: '#151514',
    primary: sakuraThemeColor.toString(),
    secondary: sakuraThemeColor.clone().tetrad()[2].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

export { sakuraLight, sakuraDark }
