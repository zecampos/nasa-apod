import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./styles/theme";
import GlobalStyle from "./styles/global";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
