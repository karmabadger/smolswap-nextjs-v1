import { FC } from "react";

import Box from "@mui/material/Box";

import ButtonsSection from "./buttons/ButtonsSection";

interface RightSideProps {
  openSettingsModal: boolean;
  setOpenSettingsModal: any;
  openQuickCheckoutModal: boolean;
  setOpenQuickCheckoutModal: any;
}
const RightSideBox: FC<RightSideProps> = ({
  //   matchesDownMD,
  openSettingsModal,
  setOpenSettingsModal,
  openQuickCheckoutModal,
  setOpenQuickCheckoutModal,
}) => {
  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          borderRadius: 1,
        }}
      >
        <ButtonsSection
          //   matchesDownMD={matchesDownMD}
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
          openQuickCheckoutModal={openQuickCheckoutModal}
          setOpenQuickCheckoutModal={setOpenQuickCheckoutModal}
        />
      </Box>
    </Box>
  );
};

export default RightSideBox;
