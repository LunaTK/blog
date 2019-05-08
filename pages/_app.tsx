import App, { Container } from 'next/app';
import React from 'react';
import withApolloClient from '../lib/with-apollo-client';
import { ApolloProvider } from 'react-apollo';
import Head from 'next/head';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

// TODO : Apollo Client is not always required. Use it individually.
class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <Head>
          <title>LunaTK's Blog</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            key="viewport"
          />
          <meta
            name="google-site-verification"
            content="7hQbtHrsfZArCdE8Vealbr7etVW2RL93-dPKI5Kcygg"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
