import { atom, useAtom } from "jotai";
import { Wallet } from "@utilities/wallet";

const walletAtom = atom<Wallet | null>(null);
const useWallet = () => {
  const wallet = useAtom(walletAtom);
  return wallet;
};

export default walletAtom;
export { useWallet };
