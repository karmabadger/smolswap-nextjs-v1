import { FC } from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { useWallet } from "@atoms/walletAtom";
import { useSigner } from "@atoms/signerAtom";

interface CartButtonProps {}
const CheckoutButton: FC<CartButtonProps> = ({}) => {
  const [wallet, setWallet] = useWallet();
  const [signer, setSigner] = useSigner();
  //   const handleClick = () => {
  //     navigate("/checkout");
  //   };

  if (wallet == null) {
    return (
      <Tooltip title="Cart" arrow>
        <IconButton
          disabled={true}
          color="secondary"
          aria-label="shopping cart checkout"
          sx={{ p: "12px", mx: "5px" }}
          //   onClick={handleClick}
        >
          <ShoppingCartCheckoutIcon />
        </IconButton>
      </Tooltip>
    );
  }

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
