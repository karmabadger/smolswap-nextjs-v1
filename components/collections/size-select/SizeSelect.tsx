import { FC, ReactNode, SyntheticEvent, useState } from "react";

import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { SizeSelectOptions, Size } from "./SizeSelectOptions";

interface SizeSelectProps {
  cardSize: Size;
  setCardSize: (cardSize: Size) => void;
}
const SizeSelect: FC<SizeSelectProps> = ({ cardSize, setCardSize }) => {
  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const target = event.target as HTMLSelectElement;
    const value = target.value as Size;
    if (
      target.value !== "" &&
      SizeSelectOptions.find((element) => element === value)
    ) {
      setCardSize(target.value as Size);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cardSize}
          label="Size"
          onChange={handleChange}
          size="small"
        >
          {SizeSelectOptions.map((option, index) => {
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

export default SizeSelect;
