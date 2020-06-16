import ReactGA from 'react-ga';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('UA-169611539-1', {
      debug: true
    });
  });

  return <Component {...pageProps} />
}