import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Home from '../home';
import Navbar from '../navbar';
import NewCertificate from '../newCertificate';
import DisplayCertificate from '../displayCertificate';
import GetUserCertificates from '../getUserCertificates';

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
          <Container>
            <Row className="py-2 justify-content-center">
              <Col xs="12" sm="10" lg="8">
                <Navbar />
              </Col>
            </Row>
            <Row className="py-2 justify-content-center">
              <Col xs="12" sm="10" lg="8">
                <Switch>
                  <Route exact path="/" render={() => (<GetUserCertificates address={address} />)} />
                  <Route exact path="/new" render={() => (<NewCertificate address={address} />)} />
                  <Route path="/certificate/:certificateId" render={props => (<DisplayCertificate {...props} address={address} />)} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  address: PropTypes.string.isRequired,
};

export default App;
