import { atom, useAtom, Atom, SetStateAction } from "jotai";

class ListingsStore {
  public boolAtomList: Atom<boolean>[] = [];
  public boolAtomMap: { [key: string]: Atom<boolean> } = {};

  public addAtom(id: string): void {
    const newAtom: Atom<boolean> = atom<boolean>(false);
    this.boolAtomList.push(newAtom);
    this.boolAtomMap[id] = newAtom;
  }

  public getAtom(id: string): Atom<boolean> {
    return this.boolAtomMap[id];
  }

  public setAtom(id: string, newAtom: Atom<boolean>): void {
    this.boolAtomMap[id] = newAtom;
  }

  public removeAtom(id: string): void {
    const index = this.boolAtomList.indexOf(this.boolAtomMap[id]);
    this.boolAtomList.splice(index, 1);
    delete this.boolAtomMap[id];
  }

  public getAtomList(): Atom<boolean>[] {
    return this.boolAtomList;
  }
}

const listingsStoreAtom = atom<ListingsStore>(new ListingsStore());

const useListingsStoreAtom = () => {
  return useAtom(listingsStoreAtom);
};

const useBoolAtom = (
  id: string
): [boolean, (update: SetStateAction<boolean>) => void] => {
  const [listingsStoreAtom] = useListingsStoreAtom();
  const boolAtom = listingsStoreAtom.getAtom(id);
  return useAtom(boolAtom);
};

export default listingsStoreAtom;
export { useListingsStoreAtom, useBoolAtom, ListingsStore };
