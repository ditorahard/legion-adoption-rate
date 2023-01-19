import { ThemeProvider, theme } from '../../../legion-ui/dist/legion-ui.esm'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={{
    ...theme, fonts: {
      body: 'Nunito',
    }
  }}>
    <Component {...pageProps} />
  </ThemeProvider>
}
