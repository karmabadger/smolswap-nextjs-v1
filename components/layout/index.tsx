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

import {
  Collection,
  useGetCollectionsQuery,
} from "@graphql/generated/marketplace/react-apollo";

import {
  createCollectionsAtomObj,
  useCollections,
} from "@atoms/collectionsAtom";
import {
  Alert,
  Snackbar,
  useAlertList,
  // useAlertView,
} from "@atoms/alertViewAtom";

interface LayoutProps {
  collectionsSSR: Collection[];
}

const Layout: FC<LayoutProps> = ({ children, collectionsSSR }) => {
  const [collections, setCollections] = useCollections();

  const { data, loading, error } = useGetCollectionsQuery();

  const [alertList, setAlertList] = useAlertList();
  const addAlertItem = (alertItem: Alert) => {
    setAlertList((alertList) => [...alertList, alertItem]);
  };
  const removeAlertItem = (alertItem: Alert) => {
    setAlertList((alertList) => alertList.filter((item) => item !== alertItem));
  };

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

  useEffect(() => {
    const alert1 = new Alert("test", "success", "test");
    const alert2 = new Alert("test", "success", "test");
    setAlertList([alert1, alert2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Navbar collections={collectionsData} />
      <Toolbar />

      <Stack sx={{ width: "100%" }} spacing={0}>
        {alertList.map((alertEl, index) => (
          <TimedAlertComponent
            // severity="error"
            onClose={() => removeAlertItem(alertEl)}
            key={index}
            open={true}
            setOpen={() => {}}
            timeout={5000}
          >
            Timed
          </TimedAlertComponent>
        ))}
      </Stack>

      <Stack sx={{ width: "100%" }} spacing={2}>
        {/* <Snackbar
          open={open}
          // autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        /> */}
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar> */}
      </Stack>

      <main>{children}</main>

      <Footer />
    </ClientOnly>
  );
};

export default Layout;
