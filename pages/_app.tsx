import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "@utilities/createEmotionCache";
import darkTheme from "../styles/theme/darkTheme";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";

import { FC, ReactElement, ReactNode, useState, useEffect } from "react";
import { NextPage } from "next";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Signer } from "ethers";

import Layout from "../components/layout";

import { Provider } from "jotai";
import { useTheme } from "@atoms/themeModeAtom";
import { useThemeMode } from "@atoms/themeModeAtom";
import { useWallet } from "@atoms/walletAtom";

import { connectWallet, Wallet } from "@utilities/wallet";
import { useSigner } from "@atoms/signerAtom";

const clientSideEmotionCache = createEmotionCache();

import {
  apolloClientTMAtom,
  useApolloClientTM,
  apolloClientTMNextAtom,
  useApolloClientTMNext,
  apolloClientMarketplaceAtom,
  useApolloClientMarketplace,
  apolloClientBridgeworldAtom,
  useApolloClientBridgeworld,
} from "atoms/apolloClientAtom";

type AppPropsWithChildren = AppProps & {
  children?: ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useApolloClientMarketplace();
  return (
    <ApolloProvider client={client}>
      <CacheProvider value={clientSideEmotionCache}>
        <Provider>
          <MyAppWithTheme
            router={pageProps.router}
            Component={Component}
            pageProps={pageProps}
          />
        </Provider>
      </CacheProvider>
    </ApolloProvider>
  );
}

const MyAppWithTheme: FC<AppPropsWithChildren> = ({
  children,
  router,
  Component,
  pageProps,
}) => {
  const [themeMode, setThemeMode] = useThemeMode();
  const [theme, setTheme] = useTheme();
  const [wallet, setWallet] = useWallet();
  const [signer, setSigner] = useSigner();

  useEffect(() => {
    const wallet: Wallet = new Wallet(themeMode);
    setWallet(wallet);

    if (wallet.web3Modal.cachedProvider) {
      connectWallet(wallet.web3Modal, signer, setSigner);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWallet, themeMode]);

  // if (pageProps.error) {
  //   console.error(pageProps.error);
  //   return (
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <h1>Error!</h1>
  //     </ThemeProvider>
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout collectionsSSR={pageProps.collectionsSSR}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
