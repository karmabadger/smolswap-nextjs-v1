import { FC, useEffect, useState } from "react";

import {
  useWalletContext,
  useWeb3ModalContext,
  createWeb3ModalContext,
  useSigner,
} from "@atoms/walletAtom";

const ClientOnly: FC = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [web3ModalContext, setWeb3ModalContext] = useWeb3ModalContext();
  const { connectWallet } = useWalletContext();

  useEffect(() => {
    const newWeb3ModalContext = createWeb3ModalContext("light");
    setWeb3ModalContext(newWeb3ModalContext);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      if (web3ModalContext.web3Modal?.cachedProvider) {
        connectWallet().then(() => {
          console.log("connected automatically");
        });
      }
    }
  }, [hasMounted]);

  if (!hasMounted) {
    return null;
  }

  // if (!web3ModalContext.web3Modal) {
  //   return null;
  // }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
