import React, { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Container } from '@nextui-org/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducer';
import NavBar from '../components/NavBar';
import '../styles/main.css';

const store = createStore(reducer);

const App: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/icon.png" />
      <title>Snapshare</title>
      <meta name="description" content="Share snaps!" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
    </Head>

    <Provider store={store}>
      <NavBar />

      <div className="app">
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </Provider>

  </>
);

export default App;
