import { atomWithStorage } from "jotai/utils";

const sortByAtom = atomWithStorage<string>("sortBy", "asc");

export default sortByAtom;
