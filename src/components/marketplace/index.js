import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

class Marketplace extends Component {
  constructor(props) {
    super(props);

    const { address } = this.props;

    this.state = {
      address,
      offers: [],
    };
  }

  getOffers = () => {

  }

  render = () => {
    const {
      address,
    } = this.state;

    return (
      <div>
        <Container>
          <Row className="py-4 justify-content-center">
            <Col xs="12" sm="8" lg="8">

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Marketplace.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Marketplace;
