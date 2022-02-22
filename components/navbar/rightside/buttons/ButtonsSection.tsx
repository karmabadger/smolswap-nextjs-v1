import { FC } from "react";

import Box from "@mui/material/Box";

import { useWallet } from "@atoms/walletAtom";

import CartButton from "./CartButton";
import CheckoutButton from "./CheckoutButton";
import ConnectButton from "./ConnectButton";
import SettingsButton from "./SettingsButton";

interface ButtonsSectionProps {
  // matchesDownMD,
  openSettingsModal: boolean;
  setOpenSettingsModal: any;
  openQuickCheckoutModal: boolean;
  setOpenQuickCheckoutModal: () => void;
}
const ButtonsSection: FC<ButtonsSectionProps> = ({
  // matchesDownMD,
  openSettingsModal,
  setOpenSettingsModal,
  openQuickCheckoutModal,
  setOpenQuickCheckoutModal,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        // bgcolor: 'background.paper',
        alignItems: "center",
        borderRadius: 1,
      }}
    >
      <ConnectButton />
      <CartButton
        openQuickCheckoutModal={openQuickCheckoutModal}
        setOpenQuickCheckoutModal={setOpenQuickCheckoutModal}
      />
      {/* <CheckoutButton /> */}
      <SettingsButton
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
    </Box>
  );
  //   if (matchesDownMD) {
  //     if (signer == null) {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "row-reverse",
  //             // bgcolor: 'background.paper',
  //             alignItems: "center",
  //             borderRadius: 1,
  //           }}
  //         >
  //           <ConnectButton />
  //         </Box>
  //       );
  //     } else {
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "row-reverse",
  //             // bgcolor: 'background.paper',
  //             alignItems: "center",
  //             borderRadius: 1,
  //           }}
  //         >
  //           <CartButton
  //             openQuickCheckoutModal={openQuickCheckoutModal}
  //             setOpenQuickCheckoutModal={setOpenQuickCheckoutModal}
  //           />
  //           <CheckoutButton />
  //           <SettingsButton
  //             openSettingsModal={openSettingsModal}
  //             setOpenSettingsModal={setOpenSettingsModal}
  //           />
  //         </Box>
  //       );
  //     }
  //   } else {
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row-reverse",
  //           // bgcolor: 'background.paper',
  //           alignItems: "center",
  //           borderRadius: 1,
  //         }}
  //       >
  //         <ConnectButton />
  //         <CartButton
  //           openQuickCheckoutModal={openQuickCheckoutModal}
  //           setOpenQuickCheckoutModal={setOpenQuickCheckoutModal}
  //         />
  //         <CheckoutButton />
  //         <SettingsButton
  //           openSettingsModal={openSettingsModal}
  //           setOpenSettingsModal={setOpenSettingsModal}
  //         />
  //       </Box>
  //     );
  //   }
};

export default ButtonsSection;
