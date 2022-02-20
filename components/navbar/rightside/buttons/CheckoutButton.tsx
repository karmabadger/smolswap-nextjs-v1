import { FC } from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
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
      <IconButton
        disabled={true}
        color="secondary"
        aria-label="shopping cart checkout"
        sx={{ p: "12px", mx: "5px" }}
        //   onClick={handleClick}
      >
        <ShoppingCartCheckoutIcon />
      </IconButton>
    );
  }

  return (
    <Link href={"/checkout"} passHref>
      <a>
        <IconButton
          disabled={signer == null}
          color="secondary"
          aria-label="shopping cart checkout"
          sx={{ p: "12px", mx: "5px" }}
          //   onClick={handleClick}
        >
          <ShoppingCartCheckoutIcon />
        </IconButton>
      </a>
    </Link>
  );
};

export default CheckoutButton;
