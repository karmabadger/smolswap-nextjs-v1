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
  Snackbar,
  useAlertList,
  useAlertListObj,
  // useAlertView,
} from "@atoms/alertViewAtom";

interface LayoutProps {
  collectionsSSR: Collection[];
}

const Layout: FC<LayoutProps> = ({ children, collectionsSSR }) => {
  const [collections, setCollections] = useCollections();

  const { data, loading, error } = useGetCollectionsQuery();

  const [alertQueue, controls] = useQueueState<AlertClass>([
    new AlertClass("test1", "", "success"),
    new AlertClass("test2", "", "success"),
    // new AlertClass("test3", "", "success"),
    // new AlertClass("test4", "", "success"),
    // new AlertClass("test5", "", "success"),
  ]);
  const { enqueue, peek, dequeue, length } = controls;
  // const [alertList, setAlertList] = useAlertList();
  // const [alertListObj, setAlertListObj] = useAlertListObj();
  // const [alertList2, setAlertList2] = useState<AlertClass[]>([]);
  // const alertList = alertListObj.alertList;

  const addAlertItem = (alertItem: AlertClass) => {
    // setAlertList([...alertList, alertItem]);
    // alertListObj.alertList.push(alertItem);
    // setAlertList2(alertListObj.alertList);
    enqueue(alertItem);
  };
  const removeAlertItem = (id: number) => {
    // setAlertList(alertList.filter((alert) => alert.id !== id));
    // alertListObj.alertList.splice(
    //   alertListObj.alertList.findIndex((alert) => alert.id === id),
    //   1
    // );
    // setAlertList2(alertListObj.alertList);
    dequeue();
    console.log("removing alert item", id, alertQueue);
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
    // const alert1 = new AlertClass("test1", "", "success");
    // const alert2 = new AlertClass("test2", "", "success");
    // const alert3 = new AlertClass("test3", "", "success");
    // const alert4 = new AlertClass("test4", "", "success");
    // const alert5 = new AlertClass("test5", "", "success");
    // // setAlertList([alert1, alert2, alert3, alert4, alert5]);
    // alertListObj.alertList = [alert1, alert2, alert3, alert4, alert5];
    // setAlertList2(alertListObj.alertList);
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
        {alertQueue.map((alertEl, index) => (
          <TimedAlertComponent
            // severity="error"
            alertObj={alertEl}
            index={index}
            key={index}
            onClose={() => {
              removeAlertItem(alertEl.id);
              console.log("removing alert", index);
            }}
            controls={controls}
          />
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
