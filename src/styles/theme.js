import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006572",
    },
    secondary: {
      main: green[500],
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
