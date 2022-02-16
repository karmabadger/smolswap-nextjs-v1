import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "@utilities/createEmotionCache";
import darkTheme from "../styles/theme/darkTheme";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import { FC, ReactElement, ReactNode, useState } from "react";

import Layout from "../components/layout";
import { createApolloTMNextClient } from "@utilities/createApolloClient";

import { useAtom } from "jotai";
import themeModeAtom from "@atoms/themeModeAtom";

const clientSideEmotionCache = createEmotionCache();

const client = createApolloTMNextClient();

type AppPropsWithChildren = AppProps & {
  children?: ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CacheProvider value={clientSideEmotionCache}>
        <MyAppWithTheme
          router={pageProps.router}
          Component={Component}
          pageProps={pageProps}
        />
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
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);

  let theme = lightTheme;

  switch (themeMode) {
    case "dark":
      theme = darkTheme;
      break;
    case "light":
      theme = lightTheme;
      break;
    default:
      theme = lightTheme;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout themeMode={themeMode} setThemeMode={setThemeMode}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
