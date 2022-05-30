import Head from "next/head";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "@assets/css/index.css";
import { useApollo } from "@lib/apolloClient";
import Modal from "@components/modal";
import { ModalProvider } from "@components/modal/modal.context";
import Layout from "@components/layouts/layout";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import { NextPage } from "next";
import { CartProvider } from "@store/quick-cart/cart.context";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Labian Farms</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <ModalProvider>
          <CartProvider>
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            <Modal />
            <ToastContainer
              autoClose={2000}
              theme="light"
              position="bottom-center"
            />
          </CartProvider>
        </ModalProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
