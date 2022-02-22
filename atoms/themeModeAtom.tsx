import { atomWithStorage, RESET } from "jotai/utils";
import { SetStateAction, useAtom } from "jotai";
import darkTheme from "@styles/theme/darkTheme";
import lightTheme from "@styles/theme/lightTheme";
import { useEffect, useState } from "react";
import { Theme } from "@mui/material";

const themeModes = ["light", "dark"];

type themeDictType = {
  [key: string]: Theme;
};
const themeDict: themeDictType = {
  light: lightTheme,
  dark: darkTheme,
};
const themeModeAtom = atomWithStorage<string>("themeMode", "light");
const useThemeMode = () => {
  const themeMode = useAtom(themeModeAtom);
  return themeMode;
};

type useThemeType = () => [
  Theme,
  (update: typeof RESET | SetStateAction<string>) => void
];

const useTheme: useThemeType = () => {
  const [themeMode, setThemeMode] = useThemeMode();
  const [theme, setTheme] = useState<Theme>(themeDict[themeMode]);

  useEffect(() => {
    if (themeMode !== undefined) {
      setTheme(themeDict[themeMode]);
    }
  }, [themeMode]);

  return [theme, setThemeMode];
};

export default themeModeAtom;
export {
  useThemeMode,
  themeModes,
  type themeDictType,
  themeDict,
  useTheme,
  type useThemeType,
};
