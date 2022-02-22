import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  // typography: {
  //   fontSize: 12,
  // },
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

export default darkTheme;
