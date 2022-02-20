import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Size } from "@components/collections/size-select/SizeSelectOptions";

const cardSizeAtom = atomWithStorage<Size>("cardSize", "SM");

const useCardSize = () => {
  const cardSize = useAtom(cardSizeAtom);
  return cardSize;
};

export default cardSizeAtom;
export { useCardSize };
