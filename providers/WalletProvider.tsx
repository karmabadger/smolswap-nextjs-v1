import { FC } from "react";
import WalletContext from "contexts/WalletContext";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

interface WalletProviderProps {
  web3Modal: Web3Modal;
  signer: ethers.Signer;
  setSigner: (signer: ethers.Signer) => void;
}
const WalletProvider: FC<WalletProviderProps> = ({
  children,
  web3Modal,
  signer,
  setSigner,
}) => {
  return (
    <WalletContext.Provider value={{ web3Modal, signer, setSigner }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
