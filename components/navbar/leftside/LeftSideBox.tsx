import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { styled, useTheme, alpha } from "@mui/material/styles";

import logo from "./Logo/logo.svg";

import SearchBar from "./searchbar/SearchBar";

import SvgIcon from "@mui/material/SvgIcon";
import Icon from "@mui/material/Icon";

import Link from "next/link";

import Image from "next/image";
import { Collection } from "@graphql/generated/next/react-apollo";
import { FC } from "react";

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
  //   const theme = useTheme();

  const logoLink =
    (process.env.NEXT_PUBLIC_INDEX_REDIRECT_URL as string) || "/";

  console.log(logoLink);

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
        <Link
          href={logoLink}
          passHref
          //   style={{
          //     textDecoration: "none",
          //     color: theme.palette.text.primary,
          //     height: "100%",
          //     display: "flex",
          //     flexDirection: "column",
          //     justifyContent: "center",
          //   }}
        >
          <a>
            <Icon
              sx={{
                width: "auto",

                // height: '80%',
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
          // bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Link
          href={logoLink}
          //   style={{
          //     textDecoration: "none",
          //     color: theme.palette.text.primary,
          //     height: "100%",
          //     display: "flex",
          //     flexDirection: "column",
          //     justifyContent: "center",
          //   }}
          passHref
        >
          <a>
            <Icon
              sx={{
                width: "auto",

                // height: '80%',
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
        // borderRadius: 1,
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
        <Link
          href={logoLink}
          //   style={{
          //     textDecoration: "none",
          //     color: theme.palette.text.primary,
          //     height: "100%",
          //     display: "flex",
          //     flexDirection: "column",
          //     justifyContent: "center",
          //   }}
          passHref
        >
          <a>
            <Icon
              sx={{
                width: "auto",

                // height: '80%',
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
