import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Container, NextUIProvider } from '@nextui-org/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import reducer from '../reducer';
import NavBar from '../components/ui/NavBar';
import '../styles/main.css';

const store = createStore(reducer);

store.subscribe(() => {
  localStorage.setItem('persistedState', JSON.stringify(store.getState()));
});

const App: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => (
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
        <NavBar />

        <div className="app">
          <Container>
            <Component {...pageProps} />
          </Container>
        </div>
      </NextUIProvider>
    </Provider>

  </>
);

export default App;
