import { createTheme } from "@mui/material/styles";

const primaryMain = "#191d2b";
const secondaryMain = "#27AE60";
const white = "#FFFFFF";
const black = "#000";
const grey0 = "#f8f8f8";
const grey1 = "#dbe1e8";
const grey2 = "#b2becd";
const grey3 = "#6c7983";
const grey4 = "#454e56";
const grey5 = "#2a2e35";
const grey6 = "#12181b";
const boxShadow1 = "0 3px 15px rgba(0, 0, 0, .3)";
const borderRadiusSm2 = "14px";

const createCustomTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: primaryMain,
      },
      secondary: {
        main: secondaryMain,
      },
      common: {
        white: white,
        black: black,
      },
      grey: {
        50: grey0,
        100: grey1,
        200: grey2,
        300: grey3,
        400: grey4,
        500: grey5,
        600: grey6,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
                    /* Global CSS reset */
                    *, *::before, *::after {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.5;
                    }
                    a {
                        text-decoration: none;
                        color: inherit;
                    }
                    ul, ol {
                        list-style: none;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        margin: 0;
                    }
                    button {
                        background: none;
                        border: none;
                        cursor: pointer;
                    }
                    input, textarea {
                        border: none;
                        outline: none;
                        font-family: inherit;
                    }
                `,
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: boxShadow1,
            borderRadius: borderRadiusSm2,
          },
        },
      },
    },
    typography: {
    },
  });
};

export const theme = createCustomTheme();
