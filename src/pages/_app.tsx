import { ThemeProvider, theme } from 'legion-ui'
import {ThemeProvider as Theme} from '@emotion/react';
import { legionTheme } from '@legion-ui/core';
import '@/styles/globals.css'
import '@/styles/new.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={{
      ...theme, fonts: {
        heading: 'Nunito Sans',
        body: 'Nunito Sans',
      }
    }}>
      <Theme theme={legionTheme}>
      <Component {...pageProps} />
      </Theme>
    </ThemeProvider>
 )
}
