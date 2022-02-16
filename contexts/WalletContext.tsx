import { createContext } from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletLink from "walletlink";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId,
    },
  },
  walletlink: {
    package: WalletLink, // Required
    options: {
      appName: "My Awesome App", // Required
      infuraId: infuraId, // Required unless you provide a JSON RPC url; see `rpc` below
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      // Mikko's TESTNET api key
      key: process.env.NEXT_PUBLIC_INFURA_FORTMATIC_PROJECT_ID as string,
    },
  },
};

const web3Modal: Web3Modal = new Web3Modal({
  network: "mainnet", // optional
  //   network: process.env.NEXT_PUBLIC_CHAIN_ID as string, // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

interface IWalletContext {
  web3Modal: Web3Modal;
  signer?: ethers.Signer;
  setSigner?: (signer: ethers.Signer) => void;
}

const defaultContext: IWalletContext = {
  web3Modal: web3Modal,
};

const WalletContext = createContext(defaultContext);

export default WalletContext;

export { type IWalletContext, defaultContext, web3Modal, providerOptions };
