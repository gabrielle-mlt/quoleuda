import { TinyColor } from '@ctrl/tinycolor'

const deepOceanThemeColor = new TinyColor('#5eaad5')
const successColor = new TinyColor('#a5daa5')
const incorrectColor = new TinyColor('#ff8f81')

const deepOceanLight = {
  name: 'Deep Ocean',
  // id: 'deepOceanLight',
  dark: false,
  colors: {
    background: '#f8fbfd',
    primary: deepOceanThemeColor.toString(),
    secondary: deepOceanThemeColor.clone().analogous()[1].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}

const deepOceanDark = {
  name: 'Deep Ocean',
  // id: 'deepOceanDark',
  dark: true,
  colors: {
    background: '#010304',
    primary: deepOceanThemeColor.toString(),
    secondary: deepOceanThemeColor.clone().analogous()[1].toString(),
    success: successColor.toString(),
    incorrect: incorrectColor.toString()

  }
}
export { deepOceanLight, deepOceanDark }
