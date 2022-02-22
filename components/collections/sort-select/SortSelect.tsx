import { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

import {
  SortSelectOptionsERC721Type,
  SortSelectOptionsERC721,
  SortSelectERC721Dict,
  SortSelectERC721Obj,
  SortSelectOptionsERC721Obj,
  SortSelectOptionsERC1155Type,
  SortSelectERC1155Dict,
  SortSelectERC1155Obj,
  SortSelectOptionsERC1155,
  SortSelectOptionsERC1155Obj,
} from "./SortSelectOptions";

interface SortSelectProps {
  sortBy: SortSelectOptionsERC721Type | SortSelectOptionsERC1155Type;
  setSortBy: (
    // newSortBy: SortSelectOptionsERC721Type | SortSelectOptionsERC1155Type
    newSortBy: any
  ) => void;
  ercType: string;
}

const SortSelect: FC<SortSelectProps> = ({ sortBy, setSortBy, ercType }) => {
  const handleChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    const target = e.target as HTMLSelectElement;

    const value = target.value as
      | SortSelectOptionsERC721Type
      | SortSelectOptionsERC1155Type;
    if (
      target.value !== "" &&
      (SortSelectOptionsERC721.find((element) => element === value) ||
        SortSelectOptionsERC1155.find((element) => element === value))
    ) {
      setSortBy(value);
      //   console.log("changed", target.value);
    }

    // console.log(target.value, SortSelectOptionsERC721);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          //   defaultChecked={sortBy}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="SortBy"
          onChange={handleChange}
          size="small"
        >
          {ercType === "ERC1155"
            ? SortSelectOptionsERC721.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })
            : SortSelectOptionsERC721.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelect;
