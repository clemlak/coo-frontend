import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  Row,
  Col,
  CardDeck,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';
import CertificatePreview from '../certificatePreview';

class GetUserCertificates extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      certificates: [],
      address,
    };
  }

  componentDidMount = () => {
    this.getUserCertificates();
  }

  getUserCertificates = () => {
    const {
      address,
    } = this.state;

    const certificates = [];

    CooContract.methods.balanceOf(address).call()
      .then((balance) => {
        if (parseInt(balance, 10) > 0) {
          for (let i = 0; i < parseInt(balance, 10); i += 1) {
            CooContract.methods.tokenOfOwnerByIndex(address, i).call()
              .then((certificateId) => {
                certificates.push(certificateId);

                this.setState({
                  certificates,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayCertificates = () => {
    const {
      certificates,
      address,
    } = this.state;

    const cards = [];

    for (let i = 0; i < certificates.length; i += 1) {
      cards.push(
        <CertificatePreview
          key={i}
          address={address}
          certificateId={certificates[i]}
        />,
      );
    }

    return cards;
  }

  render = () => {
    const {
      certificates,
    } = this.state;

    return (
      <div>
        <Row>
          <Col>
            <p className="h5 mb-3">
              {`You have ${certificates.length} certificates`}
            </p>
          </Col>
          <Col className="text-right">
            <NavLink exact to="/new" className="nav-link" activeClassName="active">
              New certificate
            </NavLink>
          </Col>
        </Row>
        <CardDeck>
          {this.displayCertificates()}
        </CardDeck>
      </div>
    );
  }
}

GetUserCertificates.propTypes = {
  address: PropTypes.string.isRequired,
};

export default GetUserCertificates;
