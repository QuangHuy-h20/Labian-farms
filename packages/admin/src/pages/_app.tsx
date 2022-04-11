import Head from 'next/head'
import { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import '@assets/css/index.css'
import { useApollo } from '@lib/apolloClient';
import Layout from '@components/Layout';



function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>Admin | Labian Farms</title>
      </Head>
      <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp