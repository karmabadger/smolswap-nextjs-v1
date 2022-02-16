import { FC, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { useQuery } from "@apollo/client";

import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";

import Navbar from "@components/navbar";
import Footer from "@components/footer";
import ClientOnly from "@components/client-only/ClientOnly";
import {
  Collection,
  useGetCollectionsQuery,
} from "@graphql/generated/next/react-apollo";

import { useAtom } from "jotai";
import collectionsAtom from "@atoms/CollectionsAtom";

interface Props {
  themeMode: string;
  setThemeMode: (arg0: string) => void;
}

// const ClientOnlyLayout: FC<Props> = ({ children, themeMode, setThemeMode }) => {
//   return (
//     <ClientOnly>
//       <Layout themeMode={themeMode} setThemeMode={setThemeMode}>
//         {children}
//       </Layout>
//     </ClientOnly>
//   );
// };

const Layout: FC<Props> = ({ children, themeMode, setThemeMode }) => {
  const { data, loading, error } = useGetCollectionsQuery();
  const [collections, setCollections] = useAtom(collectionsAtom);

  useEffect(() => {
    if (!loading && !error) {
      if (data !== undefined && data.collections !== undefined) {
        setCollections(data.collections as Collection[]);
      }
    }
  }, [data, setCollections, loading, error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //   console.log(data);
  //   console.log(
  //     process.env.NEXT_PUBLIC_SUBGRAPH_URL,
  //     process.env.NEXT_PUBLIC_CHAIN_IDS
  //   );

  return (
    <ClientOnly>
      <Navbar collections={data?.collections} />
      <Toolbar />

      <main>{children}</main>

      <Footer themeMode={themeMode} setThemeMode={setThemeMode} />
    </ClientOnly>
  );
};

export default Layout;
