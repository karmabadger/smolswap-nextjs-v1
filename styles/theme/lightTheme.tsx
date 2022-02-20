import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#651FFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#EF6C00",
      dark: "#B53D00",
      contrastText: "#fff",
    },
    text: { hint: "rgba(0, 0, 0, 0.38)" },
    background: {
      paper: "#FFF",
      default: "#FFF",
      paperDark: "#FAFAFA",
    },
  },
  typography: {
    smh1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "600",
      fontSize: "0.72rem",
      lineHeight: "1.2",
      letterSpacing: "0.00938em",
    },
    smbody: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "500",
      fontSize: "0.65rem",
      lineHeight: "1.2",
      letterSpacing: "0.00938em",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "sm" },
          style: {
            fontSize: "0.6rem",
          },
        },
      ],
    },
  },
} as any);

export default lightTheme;
