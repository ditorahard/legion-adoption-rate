import { ThemeProvider, theme } from 'legion-ui'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={{
    ...theme, fonts: {
      heading: 'Nunito Sans',
      body: 'Nunito Sans',
    }
  }}>
    <Component {...pageProps} />
  </ThemeProvider>
}
