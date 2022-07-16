import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ThemeProvider, ThemeOptions, createTheme } from '@mui/material/styles';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#9d4ad4',
    },
    secondary: {
      main: '#e41c73',
    },
  },
};

const theme = createTheme(themeOptions);
const emotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp
