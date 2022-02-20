import { FC } from "react";

import { styled, useTheme, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@mui/styles";

import Link from "next/link";

import {
  collectionNameToPath,
  collectionPathToName,
} from "utils/data/collectionData";
import { Collection } from "@graphql/generated/marketplace/react-apollo";

const useStyles = makeStyles({
  paper: {
    background: "black",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface NavbarDrawerPropTypes {
  open: boolean;
  handleDrawerClose: () => void;
  drawerWidth: number;
  matchesDownSM: boolean;
  matchesDownMD: boolean;
  collections: Collection[];
}

const NavbarDrawer: FC<NavbarDrawerPropTypes> = ({
  open,
  handleDrawerClose,
  drawerWidth,
  matchesDownSM,
  matchesDownMD,
  collections,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const baseRoute = process.env.NEXT_PUBLIC_BASE_ROUTE;

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {collections.map((collection, index) => (
          <ListItem button sx={{ px: "24px" }} key={index}>
            <Link
              href={`${baseRoute}collection/${collectionNameToPath(
                collection.name
              )}`}
              passHref
            >
              <a>
                <Typography variant="h6">{collection.name}</Typography>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavbarDrawer;
