import { FC, useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styled, useTheme } from "@mui/material/styles";

import Popover from "@mui/material/Popover";

import { useWalletContext } from "@atoms/walletAtom";
import { Typography } from "@mui/material";

interface ConnectButtonProps {}
const ConnectButton: FC<ConnectButtonProps> = ({}) => {
  const { connectWallet, disconnectWallet, connected, account, signer } =
    useWalletContext();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log("account", account);
  const handleConnect = async () => {
    const signer2 = await connectWallet();
    // console.log(signer2);
  };

  const handleClickWallet = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!connected) {
    return (
      <Tooltip title="Wallet" arrow>
        <IconButton
          color={"secondary"}
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
  }

  return (
    <>
      <IconButton
        color={"primary"}
        // color={theme.palette.secondary}
        aria-label="wallet-button"
        sx={{ p: "12px", mx: "5px" }}
        onClick={handleClickWallet}
      >
        <AccountBalanceWalletIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>account: {account}</Typography>
      </Popover>
    </>
  );
};

export default ConnectButton;
