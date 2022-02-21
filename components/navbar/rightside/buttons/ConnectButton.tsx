import { FC, useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styled, useTheme } from "@mui/material/styles";

import { useWallet } from "@atoms/walletAtom";
import { useSigner } from "@atoms/signerAtom";
import { connectWallet } from "@utilities/wallet";

interface ConnectButtonProps {}
const ConnectButton: FC<ConnectButtonProps> = ({}) => {
  const [wallet, setWallet] = useWallet();
  const [signer, setSigner] = useSigner();
  // const theme = useTheme();

  // console.log("theme", theme.palette.secondary.dark);

  if (wallet == null) {
    return (
      <IconButton
        color="secondary"
        aria-label="shopping cart checkout"
        sx={{ p: "12px", mx: "5px" }}
        // onClick={handleConnect}
      >
        <AccountBalanceWalletIcon />
      </IconButton>
    );
  }

  const handleConnect = async () => {
    const signer2 = await connectWallet(wallet.web3Modal, signer, setSigner);
    // console.log(signer2);
  };

  return (
    <Tooltip title="Wallet"  arrow>
      <IconButton
        // color={"secondary"}
        // color={theme.palette.secondary}
        aria-label="wallet-button"
        sx={{ p: "12px", mx: "5px" }}
        onClick={handleConnect}
        // disabled={signer != null}
      >
        <AccountBalanceWalletIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ConnectButton;
