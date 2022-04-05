import { FC } from "react";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";

import { useWalletContext } from "@atoms/walletAtom";
// import { useSigner } from "@atoms/signerAtom";

interface CartButtonProps {
  openQuickCheckoutModal: boolean;
  setOpenQuickCheckoutModal: (openArg: boolean) => void;
}

const CartButton: FC<CartButtonProps> = ({
  openQuickCheckoutModal,
  setOpenQuickCheckoutModal,
}) => {
  const { signer } = useWalletContext();

  const handleClick = () => {
    setOpenQuickCheckoutModal(true);
  };

  return (
    <Tooltip title="Cart" arrow>
      <IconButton
        disabled={signer == null}
        color="secondary"
        aria-label="shopping cart checkout"
        sx={{ p: "12px", mx: "5px" }}
        onClick={handleClick}
      >
        <ShoppingCartIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CartButton;
