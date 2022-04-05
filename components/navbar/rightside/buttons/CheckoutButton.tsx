import { FC } from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { useWalletContext } from "@atoms/walletAtom";

interface CartButtonProps {}
const CheckoutButton: FC<CartButtonProps> = ({}) => {
  const { connectWallet, disconnectWallet, account, signer } =
    useWalletContext();

  //   const handleClick = () => {
  //     navigate("/checkout");
  //   };

  return (
    <Link href={"/checkout"} passHref>
      <a>
        <Tooltip title="Cart: Please Connect Your Wallet First" arrow>
          <IconButton
            disabled={signer == null}
            color="secondary"
            aria-label="shopping cart checkout"
            sx={{ p: "12px", mx: "5px" }}
            //   onClick={handleClick}
          >
            <ShoppingCartCheckoutIcon />
          </IconButton>
        </Tooltip>
      </a>
    </Link>
  );
};

export default CheckoutButton;
