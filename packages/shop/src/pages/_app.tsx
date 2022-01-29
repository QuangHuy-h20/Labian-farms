import Head from 'next/head'
import { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import '@assets/css/index.css'
import { useApollo } from '@lib/apolloClient';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import { ModalProvider } from '@components/Modal/modal.context';


function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>Labian Farms</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Modal />
        </ModalProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp