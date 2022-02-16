import {
  useState,
  useEffect,
  useRef,
  FC,
  SyntheticEvent,
  KeyboardEventHandler,
} from "react";

import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VirtualizedList from "./VirtualizedList/VirtualizedList";

import {
  collectionNameToPath,
  collectionPathToName,
} from "@utils/data/collectionData";
import { Collection } from "@graphql/generated/next/react-apollo";
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
  const baseRoute = process.env.NEXT_PUBLIC_BASE_ROUTE;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();
  const ref = useRef(null);

  const router = useRouter();

  const handleClick = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    console.log(target);
    setOpen(true);
    setAnchorEl(target as any);
    // console.log("width", ref.current.offsetWidth);
  };

  const handleOnClickAway = (e: MouseEvent | TouchEvent) => {
    // console.log('closing..');
    setOpen(false);
  };

  const [results, setResults] = useState(collections);
  // const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (e: SyntheticEvent<Element, Event>) => {
    const target = e.target as HTMLInputElement;
    // setSearchValue(e.target.value);
    const filtered = collections.filter((collection) =>
      collection.name.toLowerCase().includes(target.value.toLowerCase())
    );
    setResults(filtered);
    // console.log("filtered", filtered);
  };

  const handleOnKeyDown: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.key === "Enter") {
      console.log("navigate");
      if (results.length > 0) {
        // navigate(
        //   `${baseRoute}collection/${collectionNameToPath(results[0].name)}`,
        //   {
        //     replace: false,
        //   }
        // );

        router.push(
          `${baseRoute}collection/${collectionNameToPath(results[0].name)}`
        );
      }
    }
  };
  // useEffect(() => {
  //     console.log("width", ref.current.offsetWidth);
  // }, [ref]);

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
            <VirtualizedList
              widthValue={ref.current ? (ref.current as any)?.offsetWidth : 0}
              collections={results}
            />
          </StyledPopper>
        </Box>
      </ClickAwayListener>
    </Search>
  );
};

export default SearchBar;
