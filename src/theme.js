import { createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';

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

export default theme;
