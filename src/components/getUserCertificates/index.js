import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {
  ListGroup,
  ListGroupItem,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import CooContract from '../../common/cooContract';

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

  render = () => {
    const {
      certificates,
    } = this.state;

    if (certificates.length === 0) {
      return (
        <Card>
          <CardHeader className="font-weight-bold">
            You do not have any certificate
          </CardHeader>
          <CardBody>
            <NavLink exact to="/new">
              Create a new one here.
            </NavLink>
          </CardBody>
        </Card>
      );
    }

    const certificatesList = [];

    for (let i = 0; i < certificates.length; i += 1) {
      certificatesList.push(
        <ListGroupItem key={i}>
          <NavLink to={`certificate/${certificates[i]}`}>
            {`Certificate #${certificates[i]}`}
          </NavLink>
        </ListGroupItem>,
      );
    }

    return (
      <Card>
        <CardHeader className="font-weight-bold">
          {`You have ${certificates.length} certificates`}
        </CardHeader>
        <CardBody>
          <ListGroup>
            {certificatesList}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

GetUserCertificates.propTypes = {
  address: PropTypes.string.isRequired,
};

export default GetUserCertificates;
