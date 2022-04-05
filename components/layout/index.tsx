import { FC, useState, useEffect } from "react";
import styles from "@styles/Home.module.css";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Navbar from "@components/navbar";
import Footer from "@components/footer";
import ClientOnly from "@components/client-only/ClientOnly";
import AlertComponent from "@components/alerts/AlertComponent";
import TimedAlertComponent from "@components/alerts/TimedAlertComponent";

import { useQueueState } from "rooks";

import {
  Collection,
  useGetCollectionsQuery,
} from "@graphql/generated/marketplace/react-apollo";

import {
  createCollectionsAtomObj,
  useCollections,
} from "@atoms/collectionsAtom";
import {
  AlertClass,
  // Snackbar,
  useAlertList,
  useAlertListObj,
  // useAlertView,
} from "@atoms/alertViewAtom";
import QuickCheckoutModal from "@components/modals/QuickCheckout/QuickCheckoutModal";
import SettingsModal from "@components/modals/Settings/SettingsModal";

interface LayoutProps {
  collectionsSSR: Collection[];
}

const Layout: FC<LayoutProps> = ({ children, collectionsSSR }) => {
  const [collections, setCollections] = useCollections();

  const { data, loading, error } = useGetCollectionsQuery();

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      if (data !== undefined && data.collections !== undefined) {
        setCollections(
          createCollectionsAtomObj(data.collections as Collection[])
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setCollections, loading, error]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  if (data === undefined) return <p>No data</p>;

  const collectionsData = data.collections;

  // useEffect(() => {
  //   if (collectionsSSR !== undefined) {
  //     setCollections(createCollectionsAtomObj(collectionsSSR));
  //   } else {
  //     console.log("collectionsSSR is undefined");
  //   }
  // }, [collectionsSSR, setCollections]);

  // const collectionsData = collectionsSSR;

  // console.log("collectionsData", collectionsData);

  return (
    <ClientOnly>
      <Navbar
        collections={collectionsData}
        openQuickCheckoutModal={openCheckoutModal}
        setOpenQuickCheckoutModal={setOpenCheckoutModal}
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
      <Toolbar />

      <QuickCheckoutModal
        open={openCheckoutModal}
        handleClose={() => {
          setOpenCheckoutModal(false);
        }}
      />

      <SettingsModal
        open={openSettingsModal}
        handleClose={() => {
          setOpenSettingsModal(false);
        }}
      />

      <Stack sx={{ width: "100%" }} spacing={0}></Stack>

      <Stack sx={{ width: "100%" }} spacing={2}></Stack>

      <main>{children}</main>

      <Footer />
    </ClientOnly>
  );
};

export default Layout;
