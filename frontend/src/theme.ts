import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#ffa31a", // orange
      contrastText: "#1b1b1b",
    },

    secondary: {
      main: "#808080", // gray
    },

    background: {
      default: "#1b1b1b",
      paper: "#292929",
    },

    text: {
      primary: "#ffffff",
      secondary: "#808080",
    },

    divider: "#292929",
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#292929",
        },
      },
    },
  },
});
