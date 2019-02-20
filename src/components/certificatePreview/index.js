import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';
import {
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
      name: '',
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
          name,
          timestamp,
        } = certificate;

        this.setState({
          name,
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
      name,
      timestamp,
    } = this.state;

    const addedOn = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return (
      <div className="dashboard__certificate p-3">
        <Row>
          <Col className="text-center">
            <NavLink exact to={`/certificate/${certificateId}`} className="nav-link">
              <img src={CertificateIcon} alt="Certificate icon" />
            </NavLink>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="font-weight-bold mb-0">
              {name}
            </p>
            <p className="text-highlight">
              <small>
                {`Added on ${addedOn.toLocaleDateString('en-US', options)}`}
              </small>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

CertificatePreview.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
};

export default CertificatePreview;
