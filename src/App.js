import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  state = {
    show: true
  }

  /*componentDidMount() {
    setTimeout(() => {
      this.setState({show: false});
    }, 5000)
  }*/

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurguerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
