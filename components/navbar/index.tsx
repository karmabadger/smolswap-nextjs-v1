import { Dispatch, FC, SetStateAction, useState } from "react";

import { styled, useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import NavbarDrawer from "./drawer/NavbarDrawer";

import RightSideBox from "./rightside/RightSideBox";
import LeftSideBox from "./leftside/LeftSideBox";

const drawerWidth = 350;

interface Props {
  collections: any;
  openSettingsModal: boolean;
  setOpenSettingsModal: any;
  openQuickCheckoutModal: boolean;
  setOpenQuickCheckoutModal: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<Props> = ({
  collections,
  openSettingsModal,
  setOpenSettingsModal,
  openQuickCheckoutModal,
  setOpenQuickCheckoutModal,
}) => {
  const theme = useTheme();
  const matchesDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  // const [openSettingsModal, setOpenSettingsModal] = useState(false);
  // const [openQuickCheckoutModal, setOpenQuickCheckoutModal] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <LeftSideBox
            matchesDownMD={matchesDownMD}
            matchesDownSM={matchesDownSM}
            collections={collections}
          />
          <RightSideBox
            // matchesDownMD={matchesDownMD}
            // matchesDownSM={matchesDownSM}
            openSettingsModal={openSettingsModal}
            setOpenSettingsModal={setOpenSettingsModal}
            openQuickCheckoutModal={openQuickCheckoutModal}
            setOpenQuickCheckoutModal={setOpenQuickCheckoutModal}
          />
        </Toolbar>
      </AppBar>

      <NavbarDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        drawerWidth={drawerWidth}
        matchesDownMD={matchesDownMD}
        matchesDownSM={matchesDownSM}
        collections={collections}
      />
    </Box>
  );
};

export default Navbar;
