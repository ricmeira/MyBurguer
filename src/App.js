import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  state = {
    show: true
  }

  /*componentDidMount() {
    setTimeout(() => {
      this.setState({show: false});
    }, 5000)
  }*/

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurguerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
}
export default withRouter(connect(null, mapDispatchToProps)(App));
