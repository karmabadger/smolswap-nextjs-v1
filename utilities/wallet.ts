import { ethers } from "ethers";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletLink from "walletlink";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";

import signerAtom from "@atoms/signerAtom";
import { useAtom } from "jotai";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const defaultProviderOptions: IProviderOptions = {
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


const createWeb3Modal = (themeMode: string, providerOptions?: IProviderOptions): Web3Modal => {
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

    web3Modal.on("error", (input?: any) => {
        console.log("error", input);
    });

    web3Modal.on("close", (input?: any) => {
        console.log("close", input);
    });
    return web3Modal;
}

type signerAtomType = typeof signerAtom;

class Wallet {
    public web3Modal: Web3Modal;

    public signerAtom = signerAtom;
    public provider: ethers.providers.Web3Provider | null;
    public providerOptions: IProviderOptions;

    constructor(themeMode: string, providerOptions?: IProviderOptions, web3Modal?: Web3Modal, provider?: ethers.providers.Web3Provider,) {
        this.providerOptions = providerOptions || defaultProviderOptions;
        this.web3Modal = web3Modal || createWeb3Modal(themeMode, this.providerOptions);
        this.provider = provider ? provider : null;
    }

    public useSigner = () => {
        return useAtom(this.signerAtom);
    }
}

async function connectWallet(web3Modal: Web3Modal, signer: ethers.Signer | null, setSigner: (newSigner: ethers.Signer) => void): Promise<ethers.Signer | null> {

    try {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);

        // if (signer) {
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts: string[]) => {
            console.log("accountsChanged", accounts);
        });

        provider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                // window.location.reload();
            }

            console.log("network", newNetwork, oldNetwork);
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId: number) => {
            console.log("chainChanged", chainId);
        });

        // Subscribe to provider connection
        provider.on("connect", (info: { chainId: number }) => {
            console.log(info);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error: { code: number; message: string }) => {
            console.log(error);
        });
        // }

        const newSigner = provider.getSigner();
        if (setSigner) {
            setSigner(newSigner);
        }

        return newSigner;
    } catch (e) {
        if (e === "Modal closed by user") {
            return signer;
        }
        console.log("error|" + e + "|");
        alert("Failed to connect to wallet. Fix that first.");

        return signer;
    }
}

export { Wallet, createWeb3Modal, defaultProviderOptions, connectWallet };
