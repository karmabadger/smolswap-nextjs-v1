import { atom, useAtom } from "jotai";
import { ethers } from "ethers";

const signerAtom = atom<ethers.Signer | null>(null);
const useSigner = () => {
  const signer = useAtom(signerAtom);
  return signer;
};

export default signerAtom;
export { useSigner };
