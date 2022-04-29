import Head from "next/head";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import "@assets/css/index.css";
import { useApollo } from "@lib/apolloClient";
import PrivateRoute from "@utils/private-route";
import { ToastContainer } from "react-toastify";
import { UIProvider } from "../contexts/ui.context";
import { ModalProvider } from "@components/ui/modal/modal.context";

const Noop: React.FC = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;
  const apolloClient = useApollo(pageProps);
  const authProps = (Component as any).authenticate;

  return (
    <>
      <Head>
        <title>Dashboard | Labian Farms</title>
      </Head>
      <ApolloProvider client={apolloClient}>
        <UIProvider>
          <ModalProvider>
            {authProps ? (
                  <PrivateRoute authProps={authProps}>
                    <Layout {...pageProps}>
                      <Component {...pageProps} />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout {...pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                )}

            <ToastContainer autoClose={2000} theme="colored" />
          </ModalProvider>
        </UIProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
