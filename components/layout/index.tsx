import { FC, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { useQuery } from "@apollo/client";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Navbar from "@components/navbar";
import Footer from "@components/footer";
import ClientOnly from "@components/client-only/ClientOnly";
import {
  Collection,
  useGetCollectionsQuery,
} from "@graphql/generated/marketplace/react-apollo";

import {
  createCollectionsAtomObj,
  useCollections,
} from "@atoms/collectionsAtom";
import { useAlertView } from "@atoms/alertViewAtom";

interface LayoutProps {
  collectionsSSR: Collection[];
}

const Layout: FC<LayoutProps> = ({ children, collectionsSSR }) => {
  const [collections, setCollections] = useCollections();

  const { data, loading, error } = useGetCollectionsQuery();

  const [alertView, setAlertView] = useAlertView();

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Box>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

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
      <Navbar collections={collectionsData} />
      <Toolbar />

      <Stack sx={{ width: "100%" }} spacing={0}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Stack>

      <Stack sx={{ width: "100%" }} spacing={2}>
        {/* <Snackbar
          open={open}
          // autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        /> */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>

      <main>{children}</main>

      <Footer />
    </ClientOnly>
  );
};

export default Layout;
