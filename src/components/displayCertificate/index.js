import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

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
      collapseTransfer: false,
      collapseAddData: false,
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
        <Container>
          <Row className="py-4 justify-content-center">
            <Col xs="12" sm="8" lg="8">
              <Row className="align-items-center mb-3">
                <Col>
                  <p className="h5 mb-0">
                    Your certificate
                  </p>
                </Col>
                <Col className="text-right">
                  <Button color="danger" size="sm" onClick={this.toggleTransferModal}>
                    Transfer
                  </Button>
                  {' '}
                  <Button color="success" size="sm" onClick={this.toggleCreateSaleModal}>
                    Sell
                  </Button>
                </Col>
              </Row>
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
            </Col>
          </Row>
          <Row className="py-4 justify-content-center">
            <Col xs="12" sm="8" lg="8">
              <Row className="align-items-center mb-3">
                <Col>
                  <p className="h5 mb-0">
                    Your data
                  </p>
                </Col>
                <Col className="text-right">
                  <Button color="primary" size="sm" onClick={this.toggleAddDataModal}>
                    Edit data
                  </Button>
                </Col>
              </Row>
              <Card className="shadow-sm">
                <CardBody>
                  <Row>
                    <Col>
                      {this.displayData()}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
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
