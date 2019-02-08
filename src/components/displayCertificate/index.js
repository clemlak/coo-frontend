import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
  Input,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';
import CertificateIcon from '../../common/img/certificate.png';

import TransferCertificate from '../transferCertificate';
import AddData from '../addData';
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
      data: [],
      toggleTransferModal: false,
      toggleAddDataModal: false,
      toggleCreateSaleModal: false,
    };

    this.toggleTransferModal = this.toggleTransferModal.bind(this);
    this.toggleAddDataModal = this.toggleAddDataModal.bind(this);
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

  toggleAddDataModal = () => {
    const {
      toggleAddDataModal,
    } = this.state;

    this.setState({
      toggleAddDataModal: !toggleAddDataModal,
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
        } = certificate;

        this.setState({
          assetId,
          name,
          label,
          price,
          timestamp,
          factomEntryHash,
          anotherEncryptionKey,
        });

        return CooContract.methods.getCertificateData(certificateId).call({
          from: address,
        });
      })
      .then((data) => {
        this.setState({
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

    const datalist = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        datalist.push(
          <ListGroupItem key={i}>
            {data[i]}
          </ListGroupItem>,
        );
      }

      return (
        <ListGroup>
          {datalist}
        </ListGroup>
      );
    }

    return (
      <p className="mb-0">
        This certificate does not have any data yet.
      </p>
    );
  }

  render = () => {
    const {
      address,
      certificateId,
      assetId,
      name,
      label,
      price,
      timestamp,
      factomEntryHash,
      anotherEncryptionKey,
      data,
      toggleTransferModal,
      toggleAddDataModal,
      toggleCreateSaleModal,
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
              <Button color="danger" onClick={this.toggleCreateSaleModal}>
                Sell
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-center pb-2">
            <Col md="6">
              <Input type="textarea" rows="6" />
            </Col>
          </Row>

          <Row className="py-1 mt-3 justify-content-center">
            <Col md="6" className="text-center">
              <Button
                color="primary"
                size="sm"
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
