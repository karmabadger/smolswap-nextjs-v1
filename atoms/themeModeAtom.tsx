import { atomWithStorage } from "jotai/utils";

const themeModeAtom = atomWithStorage<string>("themeMode", "light");

export default themeModeAtom;
