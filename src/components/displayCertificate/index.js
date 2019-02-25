import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';
import CertificateIcon from '../../common/img/certificate.png';

import TransferCertificate from '../transferCertificate';
import EditData from '../editData';
import CreateSale from '../createSale';

class DisplayCertificate extends Component {
  constructor(props) {
    super(props);

    const {
      match: {
        params: {
          certificateId,
        },
      },
      address,
    } = this.props;

    this.state = {
      address,
      certificateId,
      assetId: '',
      name: '',
      label: '',
      price: '',
      timestamp: '',
      factomEntryHash: '',
      anotherEncryptionKey: '',
      data: '',
      toggleTransferModal: false,
      toggleEditDataModal: false,
      toggleCreateSaleModal: false,
    };

    this.toggleTransferModal = this.toggleTransferModal.bind(this);
    this.toggleEditDataModal = this.toggleEditDataModal.bind(this);
    this.toggleCreateSaleModal = this.toggleCreateSaleModal.bind(this);
  }

  componentDidMount = () => {
    this.getCertificate();
  }

  toggleTransferModal = () => {
    const {
      toggleTransferModal,
    } = this.state;

    this.setState({
      toggleTransferModal: !toggleTransferModal,
    });
  }

  toggleEditDataModal = () => {
    const {
      toggleEditDataModal,
    } = this.state;

    this.setState({
      toggleEditDataModal: !toggleEditDataModal,
    });
  }

  toggleCreateSaleModal = () => {
    const {
      toggleCreateSaleModal,
    } = this.state;

    this.setState({
      toggleCreateSaleModal: !toggleCreateSaleModal,
    });
  }

  getCertificate = () => {
    const {
      certificateId,
      address,
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
          factomEntryHash,
          anotherEncryptionKey,
          data,
        } = certificate;

        this.setState({
          assetId,
          name,
          label,
          price,
          timestamp,
          factomEntryHash,
          anotherEncryptionKey,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayData = () => {
    const {
      data,
    } = this.state;

    if (data === '') {
      return (
        <p className="mb-0 text-center text-muted small">
          This certificate does not have any data yet.
        </p>
      );
    }
  }

  render = () => {
    const {
      address,
      certificateId,
      name,
      timestamp,
      toggleTransferModal,
      toggleCreateSaleModal,
      toggleEditDataModal,
    } = this.state;

    const addedOn = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return (
      <div>
        <TransferCertificate
          address={address}
          certificateId={certificateId}
          isOpen={toggleTransferModal}
          toggle={this.toggleTransferModal}
        />
        <CreateSale
          address={address}
          certificateId={certificateId}
          isOpen={toggleCreateSaleModal}
          toggle={this.toggleCreateSaleModal}
        />
        <EditData
          address={address}
          certificateId={certificateId}
          isOpen={toggleEditDataModal}
          toggle={this.toggleEditDataModal}
        />
        <Container fluid>

          <Row className="justify-content-center py-4 pb-2">
            <Col className="text-center" xs="12" sm="8" lg="8">
              <p className="h5 mb-0">
                Your certificate
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center py-2">
            <Col className="text-center">
              <img src={CertificateIcon} alt="Certificate icon" />
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

          <Row className="justify-content-center pt-2">
            <Col md="3">
              <p>
                Your data
              </p>
            </Col>
            <Col md="3" className="text-right">
              <Button color="success" onClick={this.toggleTransferModal}>
                Transfer
              </Button>
              {' '}
              <Button color="danger" onClick={this.toggleCreateSaleModal} disabled>
                Sell
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-center pb-2">
            <Col md="6">
              {this.displayData()}
            </Col>
          </Row>

          <Row className="py-1 mt-3 justify-content-center">
            <Col md="6" className="text-center">
              <Button
                color="primary"
                size="sm"
                onClick={this.toggleEditDataModal}
              >
                Edit data
              </Button>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

DisplayCertificate.propTypes = {
  address: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      certificateId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DisplayCertificate;
