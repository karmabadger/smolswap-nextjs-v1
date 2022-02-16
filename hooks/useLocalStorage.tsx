// import { useEffect, useState } from "react";

// type useLocalStorageType = [string, (value: string) => void];

// function useLocalStorage(
//   name: string,
//   defaultValue: string
// ): useLocalStorageType {
//   const [value, setValue] = useState(defaultValue);

//   useEffect(() => {
//     const localValue = localStorage.getItem(name);
//     setValue(localValue || "light");
//   }, [value]);

//   return [value, setValue];
// }

// screw this, just use jotai's atomWithStorage
