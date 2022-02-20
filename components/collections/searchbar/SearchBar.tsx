import { FC, KeyboardEventHandler, MouseEventHandler, useState } from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  //   shownSearchTerm: boolean;
  //   setShownSearchBar: (showSearchBar: boolean) => void;
}
const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [open, setOpen] = useState(false);

  const handleOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // console.log("handleOnClick", open);
    setOpen(true);
  };
  const handleClickAway = () => {
    // console.log('closing..');
    setOpen(false);
  };

  const handleOnKeyPressed: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchTerm(target.value);
      console.log("searching for:", target.value);
    }
    console.log(e.target, e.key);
  };

  return (
    <Box
      sx={{
        m: "0px",
        width: "100%",
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
          noValidate
          // autoComplete="off"
        >
          <TextField
            type="search"
            sx={{ margin: "0px", width: "100%" }}
            id="search-item"
            label="Search Item"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onClick={handleOnClick}
            placeholder="Enter an ID or search term..."
            onKeyPress={handleOnKeyPressed}
            size="small"
          />
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default SearchBar;
