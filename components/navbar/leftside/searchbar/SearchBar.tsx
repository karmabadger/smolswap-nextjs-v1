import {
  useState,
  useRef,
  FC,
  SyntheticEvent,
  KeyboardEventHandler,
  useEffect,
} from "react";

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import ResultsList from "./list/ResultsList";

import { collectionNameToPath } from "@utils/data/collectionData";
import { Collection } from "@graphql/generated/marketplace/react-apollo";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  // maxWidth: "800px",
  flexGrow: 1,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
}));

interface SearchBarProps {
  collections: Collection[];
}

const SearchBar: FC<SearchBarProps> = ({ collections }) => {
  const router = useRouter();
  const baseRoute = process.env.NEXT_PUBLIC_BASE_ROUTE;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef(null);

  const handleClick = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    setOpen(true);
    setAnchorEl(target as any);
  };

  const handleOnClickAway = (e: MouseEvent | TouchEvent) => {
    setOpen(false);
  };

  const [results, setResults] = useState(collections);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleOnChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    const filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(target.value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleOnKeyDown: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.key === "Enter") {
      if (results.length > 0) {
        router.push(
          `${baseRoute}collection/${collectionNameToPath(
            results[selectedIndex].name
          )}`
        );
      }
    } else if (e.key === "ArrowDown") {
      if (selectedIndex < results.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
    // console.log(e.key, selectedIndex);
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <Search ref={ref}>
      <ClickAwayListener onClickAway={handleOnClickAway}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="search"
            placeholder="Search Collection…"
            inputProps={{ "aria-label": "search" }}
            onClick={handleClick}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <StyledPopper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            disablePortal={false}
            modifiers={[
              {
                name: "flip",
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: true,
                  tether: true,
                  rootBoundary: "viewport",
                  padding: 8,
                },
              },
            ]}
          >
            <ResultsList
              widthValue={ref.current ? (ref.current as any)?.offsetWidth : 0}
              collections={results}
              selectedIndex={selectedIndex}
            />
          </StyledPopper>
        </Box>
      </ClickAwayListener>
    </Search>
  );
};

export default SearchBar;
