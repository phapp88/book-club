import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import getPageContext from './getPageContext';

const withRoot = (Component) => {
  class WithRoot extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.shape({
      generateClassName: PropTypes.func,
      sheetsManager: PropTypes.object,
      sheetsRegistry: PropTypes.object,
      theme: PropTypes.object,
    }),
  };

  WithRoot.defaultProps = {
    pageContext: null,
  };

  WithRoot.getInitialProps = (ctx) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }
    return {};
  };

  return WithRoot;
};

export default withRoot;
