import { FC } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

import { Collection } from "@graphql/generated/marketplace/react-apollo";

import logo from "./Logo/logo.svg";

import SearchBar from "./searchbar/SearchBar";



interface PropTypes {
  collections: Collection[];
  matchesDownSM: boolean;
  matchesDownMD: boolean;
}

const LeftSideBox: FC<PropTypes> = ({
  matchesDownSM,
  matchesDownMD,
  collections,
}) => {
  const logoLink =
    (process.env.NEXT_PUBLIC_INDEX_REDIRECT_URL as string) || "/";

  if (matchesDownSM) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          borderRadius: 1,
        }}
      >
        <Link href={logoLink} passHref>
          <a>
            <Icon
              sx={{
                width: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  minWidth: "0px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 1,
                }}
              >
                <img src={logo} alt="logo" />
              </Box>
            </Icon>
          </a>
        </Link>
      </Box>
    );
  } else if (matchesDownMD) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          borderRadius: 1,
        }}
      >
        <Link href={logoLink} passHref>
          <a>
            <Icon
              sx={{
                width: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  minWidth: "0px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 1,
                }}
              >
                <img src={logo} alt="logo" />
              </Box>
            </Icon>
          </a>
        </Link>
        <SearchBar collections={collections} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          height: "200%",
          display: "flex",
          flexDirection: "column",
          py: "0.5rem",
          px: "0.5rem",
        }}
      >
        <Link href={logoLink} passHref>
          <a>
            <Icon
              sx={{
                width: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  minWidth: "0px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 1,
                }}
              >
                <img src={logo} alt="logo" />
              </Box>
            </Icon>
          </a>
        </Link>
      </Box>
      <SearchBar collections={collections} />
    </Box>
  );
};

export default LeftSideBox;
