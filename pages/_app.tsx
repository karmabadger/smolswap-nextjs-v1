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
  const [themeMode, setThemeMode] = useState("dark");

  let theme = lightTheme;
  if (themeMode === "dark") {
    theme = darkTheme;
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
