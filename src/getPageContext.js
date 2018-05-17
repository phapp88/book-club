/* eslint-disable no-underscore-dangle */

import { createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import { SheetsRegistry } from 'jss';
import teal from 'material-ui/colors/teal';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#eeeeee',
    },
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
  },
});

const createPageContext = () => ({
  theme,
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName(),
});

const getPageContext = () => {
  if (!process.browser) {
    return createPageContext();
  }

  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }
  return global.__INIT_MATERIAL_UI__;
};

export default getPageContext;
