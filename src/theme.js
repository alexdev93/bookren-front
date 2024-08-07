import { createTheme } from "@mui/material/styles";

const boxShadow1 = "0 3px 15px rgba(0, 0, 0, .3)";
const borderRadiusSm2 = "14px";

const createCustomTheme = () => {
  return createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
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
      MuiTableContainer: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            border: "none",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "collapse",
            boxShadow: "none",
            border: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: "none",
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            padding: 0,
            margin: 0,
            boxShadow: "none",
          },
        },
      },
    },
    typography: {},
  });
};

export const theme = createCustomTheme();
