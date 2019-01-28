import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';
import CertificateIcon from '../../common/img/certificate.png';

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

    const addedOn = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return (
      <div>
        <Card className="shadow-sm">
          <CardBody>
            <Row className="align-items-center py-3">
              <Col>
                <div className="certificate-logo-placeholder rounded align-items-center" />
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="font-weight-bold mb-0">
                  {name}
                  <br />
                  <small>
                    {`Added on ${addedOn.toLocaleDateString('en-US', options)}`}
                  </small>
                </p>
              </Col>
            </Row>

          </CardBody>
        </Card>
      </div>
    );
  }
}

CertificatePreview.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.number.isRequired,
};

export default CertificatePreview;
