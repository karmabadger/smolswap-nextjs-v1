import Web3Modal, { IProviderOptions } from "web3modal";
import WalletLink from "walletlink";
import Fortmatic from "fortmatic";
import ethProvider from "eth-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import trezorConnect from "trezor-connect";

// import TrezorProvider from "@web3modal/trezor-provider";

import config from "@config/config";

const defaultProviderOptions: IProviderOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // infuraId: config.parsedEnv.INFURA_PROJECT_ID,
      rpc: {
        1: config.parsedEnv.RPC_URLS[0],
      },
    },
  },
  walletlink: {
    package: WalletLink, // Required
    options: {
      appName: "My Awesome App", // Required
      infuraId: config.parsedEnv.INFURA_PROJECT_ID, // Required unless you provide a JSON RPC url; see `rpc` below
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
  frame: {
    package: ethProvider, // required
  },
  // "custom-trezor": {
  //   display: {
  //     logo: "/static/images/trezor-wallet.png",
  //     name: "Trezor",
  //     description: "Connect to your Trezor account",
  //   },
  //   package: TrezorProvider,
  //   options: {
  //     rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  //   },
  //   connector: async (ProviderPackage, options) => {
  //     console.log("connector", ProviderPackage, options);
  //     const provider = new ProviderPackage(options);

  //     console.log("provider", provider);
  //     // await provider.enable();

  //     provider.start();
  //     return provider;

  //     // throw new Error("Not implemented");
  //   },
  // },
};

const createWeb3Modal = (
  themeMode: string,
  providerOptions?: IProviderOptions
): Web3Modal => {
  const web3Modal: Web3Modal = new Web3Modal({
    network: "mainnet", // optional
    //   network: process.env.NEXT_PUBLIC_CHAIN_ID as string, // optional
    cacheProvider: true, // optional
    providerOptions, // required
    theme: themeMode, // optional
  });

  web3Modal.on("connect", (input?: any) => {
    console.log("connected", input);
  });

  web3Modal.on("disconnect", (input?: any) => {
    console.log("disconnected", input);
  });

  web3Modal.on("error", (input?: any) => {
    console.log("error", input);
  });

  web3Modal.on("close", (input?: any) => {
    console.log("close", input);
  });
  return web3Modal;
};

export default createWeb3Modal;
export { defaultProviderOptions };
