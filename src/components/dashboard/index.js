import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
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
        <Container>
          <Row className="py-2 justify-content-center">
            <Col xs="12" sm="8" lg="8">
              <GetUserCertificates address={address} />
            </Col>
            <Col xs="12" sm="4" lg="4">
              <DisplayAccount address={address} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Dashboard;
