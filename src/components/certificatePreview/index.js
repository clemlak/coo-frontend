import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

class CertificatePreview extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      certificateId,
    } = this.props;

    this.state = {
      address,
      certificateId,
      assetId: '',
      name: '',
      label: '',
      price: '',
      timestamp: '',
    };
  }

  componentDidMount = () => {
    this.getCertificate();
  }

  getCertificate = () => {
    const {
      address,
      certificateId,
    } = this.state;

    CooContract.methods.getCertificate(certificateId).call({
      from: address,
    })
      .then((certificate) => {
        const {
          assetId,
          name,
          label,
          price,
          timestamp,
        } = certificate;

        this.setState({
          assetId,
          name,
          label,
          price,
          timestamp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => {
    const {
      certificateId,
      assetId,
      name,
      label,
      price,
      timestamp,
    } = this.state;

    return (
      <div>
        <Card className="shadow-sm">
          <CardBody>
            Certificate id: {certificateId}
          </CardBody>
        </Card>
      </div>
    );
  }
}

CertificatePreview.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
};

export default CertificatePreview;
