import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      vermelho_escuro: string
      nude: string
      quasebranco: string
      azul: string
      maronzinho: string
      yellow: string
    }
    fonts: {
      title: string
      body: string
    }
    shadows: {
      book: string
      glow: string
    }
    borders: Record<string, string>
    transitions: Record<string, string>
  }
}
