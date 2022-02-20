import { FC } from "react";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Wallet } from "@utilities/wallet";
import { useWallet } from "@atoms/walletAtom";
import { useSigner } from "@atoms/signerAtom";

interface CartButtonProps {
  openQuickCheckoutModal: boolean;
  setOpenQuickCheckoutModal: (openArg: boolean) => void;
}

const CartButton: FC<CartButtonProps> = ({
  openQuickCheckoutModal,
  setOpenQuickCheckoutModal,
}) => {
  const [wallet, setWallet] = useWallet();
  const [signer, setSigner] = useSigner();

  const handleClick = () => {
    setOpenQuickCheckoutModal(true);
  };

  if (wallet == null) {
    return (
      <IconButton
        disabled={true}
        color="secondary"
        aria-label="shopping cart checkout"
        sx={{ p: "12px", mx: "5px" }}
        // onClick={handleClick}
      >
        <ShoppingCartIcon />
      </IconButton>
    );
  }

  return (
    <IconButton
      disabled={signer == null}
      color="secondary"
      aria-label="shopping cart checkout"
      sx={{ p: "12px", mx: "5px" }}
      onClick={handleClick}
    >
      <ShoppingCartIcon />
    </IconButton>
  );
};

export default CartButton;
