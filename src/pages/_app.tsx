import React, { FunctionComponent, useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Container,
  NextUIProvider,
  Grid,
  Progress,
} from '@nextui-org/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import cookieCutter from 'cookie-cutter';
import Router, { useRouter } from 'next/router';
import reducer from '../reducer';
import NavBar from '../components/ui/NavBar';
import SideBar from '../components/ui/SideBar';
import '../styles/main.css';

const store = createStore(reducer);

store.subscribe(() => {
  const state = store.getState();
  const userToken = state?.user?.token || '';
  const userId = state?.user?._id || '';
  cookieCutter.set('userToken', userToken);
  cookieCutter.set('userId', userId);
  localStorage.setItem('persistedState', JSON.stringify(state));
});

const App: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isGuestRoute = React.useCallback((): boolean => ['/login', '/signup'].includes(router.pathname), [router]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/icon.png" />
        <title>Snapshare</title>
        <meta name="description" content="Share snaps!" />
      </Head>

      <Provider store={store}>
        <Toaster
          position="top-right"
        />
        <NextUIProvider>
          {isLoading && (
          <Progress
            color="gradient"
            squared="true"
            indeterminated
            size="xs"
            css={{ position: 'fixed', top: 0, zIndex: 9999 }}
          />
          )}

          <NavBar hasBounceOnScroll />

          <Grid.Container>
            {!isGuestRoute() && (
            <Grid xs={0} sm={2} css={{ position: 'relative' }}>
              <SideBar />
            </Grid>
            )}

            <Grid xs={12} sm={isGuestRoute() ? 12 : 10}>
              <main role="main" className="app">
                <Container>
                  <Component {...pageProps} />
                </Container>
              </main>
            </Grid>
          </Grid.Container>
        </NextUIProvider>
      </Provider>

    </>
  );
};

export default App;
