import { atom, useAtom } from "jotai";

import { ethers } from "ethers";
import Web3Modal, { IProviderOptions } from "web3modal";

import config from "@config/config";

import { defaultProviderOptions } from "@utilities/wallet/createWeb3Modal";
import createWeb3Modal from "@utilities/wallet/createWeb3Modal";

interface Web3ModalContext {
  web3Modal: Web3Modal | null;
  providerOptions: IProviderOptions;
}

const createWeb3ModalContext = (
  themeMode: string,
  providerOptions: IProviderOptions = defaultProviderOptions
): Web3ModalContext => {
  const web3Modal = createWeb3Modal(themeMode, providerOptions);
  return {
    web3Modal,
    providerOptions,
  };
};

const web3ModalContextAtom = atom<Web3ModalContext>({
  web3Modal: null,
  providerOptions: defaultProviderOptions,
});

const useWeb3ModalContext = () => {
  const web3ModalContext = useAtom(web3ModalContextAtom);
  return web3ModalContext;
};

const signerAtom = atom<ethers.Signer | null>(null);
const accountAtom = atom<string | null>(null);
const connectedAtom = atom<boolean>(false);
const networkAtom = atom<ethers.providers.Network | null>(null);

interface WalletContext {
  web3ModalContext: Web3ModalContext;
  account: string | null;
  signer: ethers.Signer | null;
  connected: boolean;
  network: ethers.providers.Network | null;
  connectWallet: () => Promise<ethers.Signer | null>;
}

const useWalletContext = () => {
  const [web3ModalContext, setWeb3ModalContext] = useWeb3ModalContext();

  const [signer, setSigner] = useSigner();
  const [account, setAccount] = useAccount();
  const [connected, setConnected] = useConnected();
  const [network, setNetwork] = useNetwork();

  return {
    web3ModalContext,
    signer,
    account,
    connected,
    network,
    connectWallet: async (): Promise<ethers.Signer | null> => {
      try {
        const web3Modal = web3ModalContext.web3Modal;
        if (web3Modal) {
          const newProviderEngine = await web3Modal.connect();
          const newProvider = new ethers.providers.Web3Provider(
            newProviderEngine,
            "any"
          );

          // events
          newProvider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
              setNetwork(newNetwork);
            }

            console.log("network", newNetwork, oldNetwork);
          });

          window.ethereum.on("accountsChanged", (accounts: string[]) => {
            // Time to reload your interface with accounts[0]!
            console.log("accountsChanged", accounts);
            setAccount(accounts[0]);
          });

          const newSigner = newProvider.getSigner();
          const newAccount = await newSigner.getAddress();
          const newNetwork = await newProvider.getNetwork();

          setSigner(newSigner);
          setAccount(newAccount);
          setConnected(true);
          setNetwork(newNetwork);

          return newSigner;
        }
        return null;
      } catch (e) {
        if (e === "Modal closed by user") {
          return signer;
        } else if (e == "Error: User closed modal") {
          return signer;
        }
        console.log("error|" + e + "|");
        // alert("Failed to connect to wallet. Fix that first.");

        return signer;
      }
    },
    disconnectWallet: (): void => {
      setSigner(null);
      setAccount(null);
      setConnected(false);
      setNetwork(null);
    },
  };
};

const useSigner = () => {
  const signer = useAtom(signerAtom);
  return signer;
};

const useAccount = () => {
  const account = useAtom(accountAtom);
  return account;
};

const useConnected = () => {
  const connected = useAtom(connectedAtom);
  return connected;
};

const useNetwork = () => {
  const network = useAtom(networkAtom);
  return network;
};

interface IUpdateWallet {
  signer: ethers.Signer | null;
  account: string | null;
  connected: boolean;
  network: ethers.providers.Network | null;
}
// const setWalletAtom = atom(null, (get, set, update: IUpdateWallet) => {
//   set(signerAtom, update.signer);
//   set(accountAtom, update.account);
//   set(connectedAtom, update.connected);
//   set(networkAtom, update.network);
// });

export {
  type Web3ModalContext,
  createWeb3ModalContext,
  useWeb3ModalContext,
  signerAtom,
  useSigner,
  accountAtom,
  useAccount,
  connectedAtom,
  useConnected,
  networkAtom,
  useNetwork,
  type WalletContext,
  useWalletContext,
};
