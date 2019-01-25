import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';
import Dashboard from '../dashboard';
import NewCertificate from '../newCertificate';
import DisplayCertificate from '../displayCertificate';

class App extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      address,
    };
  }

  render = () => {
    const {
      address,
    } = this.state;

    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" render={() => (<Dashboard address={address} />)} />
            <Route exact path="/new" render={() => (<NewCertificate address={address} />)} />
            <Route path="/certificate/:certificateId" render={props => (<DisplayCertificate {...props} address={address} />)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  address: PropTypes.string.isRequired,
};

export default App;
