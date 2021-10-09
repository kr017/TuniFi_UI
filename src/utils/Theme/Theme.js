const light = {
  palette: {
    type: "light",
    background: {
      default: "#fff",
    },
    spotify: "#1db954",
    secondary: {
      main: "#fff",
      dark: "#5f6368",
    },
    primary: {
      main: "#fff",
      dark: "#202124",
    },
    default: "#FFFFFF",
    red: "#f28983",
    orange: "#fbbc04",
    yellow: "#FFF475",
    green: "#CCFF90",
    teal: "#CBF0F8",
    blue: "#A7FFEB",
    darkblue: "#AECBFA",
    purple: "#D7AEFB",
    pink: "#FDCFE8",
    brown: "#E6C9A8",
    gray: "#E8EAED",

    hover: "#feefc3",
    transparent: "#ece9e9",

    outline: "#e0e0e0",
    border: "#e8eaed",

    //Google border
    primaryBorder: "#1A73E8",

    backCover: "#5f636829",
    overrides: {
      MuiAppBar: {
        root: {
          // "box-shadow": "none",
        },
      },

      MuiIconButton: {
        root: {
          padding: "0px 16px",
        },
      },
      MuiButton: {
        // -containedPrimary
        root: {
          backgroundColor: "#1a73e8",
        },
      },
    },
  },
};

const dark = {
  palette: {
    type: "dark",
    background: {
      default: "#181818",
      paper: "#202124",
    },
    spotify: "#1db954",
    secondary: {
      main: "#202124",
      dark: "#ffffffde",
    },
    primary: {
      main: "#202124", //"#202124",
      dark: "#fff",
    },
    sidebar: "#000000",
    default: "#202124",
    red: "#5c2b29",
    orange: "#614a19",
    yellow: "#635d19",
    green: "#345920",
    teal: "#16504b",
    blue: "#2d555e",
    darkblue: "#1e3a5f",
    purple: "#42275e",
    pink: "#5b2245",
    brown: "#442f19",
    gray: "#3c3f43",

    hover: "#282828",
    transparent: "#757575",
    outline: "#5f6368",
    border: "#656169",

    backCover: "#9aa0a60a",
    overrides: {
      MuiCssBaseline: {
        MuiAppBar: {
          root: {
            // "box-shadow": "none",
          },
        },

        MuiIconButton: {
          root: {
            padding: "0px 12px",
            color: "green",
          },
        },
      },
    },
  },
};

export const themes = { light, dark };
