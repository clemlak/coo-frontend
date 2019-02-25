import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
} from 'reactstrap';

import GetUserCertificates from '../getUserCertificates';
import DisplayAccount from '../displayAccount';

class Dashboard extends Component {
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
      <div>
        <Container fluid>
          <DisplayAccount address={address} />
          <GetUserCertificates address={address} />
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Dashboard;
