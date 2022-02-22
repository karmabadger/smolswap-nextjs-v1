import { FC } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";

import Button from "@mui/material/Button";

import PropertySection from "./sections/PropertySection";
import { AttributesObj } from "@utils/parse/attributesQuery";

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

interface PropertiesDrawerProps {
  drawerWidth: number;
  drawerMinWidth: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  attributesObj: AttributesObj;
  attributesBoolList: boolean[];
  setAttributesBoolList: (attributesBoolList: boolean[]) => void;
}
const PropertiesDrawer: FC<PropertiesDrawerProps> = ({
  drawerWidth,
  drawerMinWidth,
  open,
  setOpen,
  attributesObj,
  attributesBoolList,
  setAttributesBoolList,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clearAll = () => {
    const newAttributesBoolList = attributesBoolList.map(() => false);
    setAttributesBoolList(newAttributesBoolList);
  };

  return (
    <Box sx={{}}>
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
        <Box>
          <Box sx={{}}>
            {attributesObj.propertiesListWithAttributes.map(
              (property, index) => (
                <PropertySection
                  key={index}
                  attributesChecked={attributesBoolList}
                  setAttributesChecked={setAttributesBoolList}
                  property={property}
                />
              )
            )}
          </Box>
          <Divider />

          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              size="large"
              sx={{
                width: "90%",
              }}
              variant="contained"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box
        sx={{
          m: 0,
          height: "100%",
        }}
      >
        <Box sx={{ width: drawerMinWidth, height: "100%" }}>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertiesDrawer;
