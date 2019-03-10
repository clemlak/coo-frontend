import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPFS from 'ipfs-api';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

class NewCertificate extends Component {
  constructor(props) {
    super(props);

    this.ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

    const {
      address,
    } = this.props;

    this.state = {
      address,
      assetId: '',
      name: '',
      label: '',
      price: '',
      factomEntryHash: '',
      anotherEncryptionKey: '',
      buttonText: 'Create certificate',
      txState: 'null',
      data: '',
      uri: '',
      isPicLoading: false,
    };
  }

  handleUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  captureFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.files.length === 1) {
      this.setState({
        isPicLoading: true,
      });

      const file = e.target.files[0];

      const reader = new window.FileReader();

      reader.onload = (r) => {
        const buffer = Buffer.from(r.target.result);
        const content = this.ipfs.types.Buffer.from(buffer);

        this.ipfs.files.add(content)
          .then((res) => {
            this.setState({
              isPicLoading: false,
              uri: `https://ipfs.infura.io/ipfs/${res[0].hash}`,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  }

  createCertificate = () => {
    const {
      address,
      assetId,
      name,
      label,
      price,
      factomEntryHash,
      data,
      uri,
      anotherEncryptionKey,
    } = this.state;

    const certificate = {
      assetId,
      name,
      label,
      price,
      timestamp: Math.round(Date.now() / 1000),
      factomEntryHash,
      anotherEncryptionKey,
      data,
    };

    this.setState({
      buttonText: 'Waiting approval in MetaMask...',
      txState: 'waitingApproval',
    });

    CooContract.methods.createCertificate(
      certificate,
      uri,
    ).send({
      from: address,
    })
      .on('transactionHash', () => {
        this.setState({
          buttonText: 'Transaction is pending...',
          txState: 'pending',
        });
      })
      .on('confirmation', () => {
        this.setState({
          buttonText: 'Transaction is confirmed!',
          txState: 'confirmed',
        });
      })
      .on('error', (err) => {
        this.setState({
          buttonText: err.message,
          txState: 'error',
        });
      });
  }

  displayPicture = () => {
    const {
      uri,
      isPicLoading,
    } = this.state;

    if (uri === '' && !isPicLoading) {
      return (
        <FormGroup>
          <Label for="Picture">
            <small className="font-weight-bold">Picture</small>
          </Label>
          <Input
            type="file"
            name="fileInput"
            id="fileInput"
            onChange={this.captureFile}
            required
          />
        </FormGroup>
      );
    }

    if (uri === '' && isPicLoading) {
      return (
        <p className="small text-muted text-center">
          Picture is loading...
        </p>
      );
    }

    if (uri !== '' && !isPicLoading) {
      return (
        <div>
          <Row>
            <Col>
              <p className="small font-weight-bold">Picture</p>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col className="text-center">
              <img className="img-fluid" src={uri} alt={uri} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button size="sm" color="secondary" onClick={() => this.setState({ uri: '' })}>
                Delete
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
  }

  render = () => {
    const {
      assetId,
      name,
      label,
      price,
      factomEntryHash,
      anotherEncryptionKey,
      data,
      buttonText,
      txState,
    } = this.state;

    return (
      <div>
        <Container fluid>
          <Row className="py-4 justify-content-center">
            <Col xs="12" sm="8" lg="8">
              <Form>

                <Row className="py-3 justify-content-around">
                  <Col md="5">
                    <FormGroup>
                      <Label for="assetId">
                        <small className="font-weight-bold">Asset id</small>
                      </Label>
                      <Input
                        type="number"
                        name="assetId"
                        id="assetId"
                        onChange={this.handleUpdate}
                        value={assetId}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label for="price">
                        <small className="font-weight-bold">Asset price</small>
                      </Label>
                      <Input
                        type="number"
                        name="price"
                        id="price"
                        onChange={this.handleUpdate}
                        value={price}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="py-3 justify-content-around">
                  <Col md="5">
                    <FormGroup>
                      <Label for="name">
                        <small className="font-weight-bold">Asset name</small>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.handleUpdate}
                        value={name}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label for="factomEntryHash">
                        <small className="font-weight-bold">Asset Factom entry hash</small>
                      </Label>
                      <Input
                        type="text"
                        name="factomEntryHash"
                        id="factomEntryHash"
                        onChange={this.handleUpdate}
                        value={factomEntryHash}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="py-3 justify-content-around">
                  <Col md="5">
                    <FormGroup>
                      <Label for="label">
                        <small className="font-weight-bold">Asset label</small>
                      </Label>
                      <Input
                        type="text"
                        name="label"
                        id="label"
                        onChange={this.handleUpdate}
                        value={label}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label for="anotherEncryptionKey">
                        <small className="font-weight-bold">Asset another encryption key</small>
                      </Label>
                      <Input
                        type="text"
                        name="anotherEncryptionKey"
                        id="anotherEncryptionKey"
                        onChange={this.handleUpdate}
                        value={anotherEncryptionKey}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="py-3 justify-content-around">
                  <Col md="10">
                    <FormGroup>
                      <Label for="data">
                        <small className="font-weight-bold">Data</small>
                      </Label>
                      <Input
                        type="textarea"
                        name="data"
                        id="data"
                        onChange={this.handleUpdate}
                        value={data}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="py-3 justify-content-around">
                  <Col md="10">
                    {this.displayPicture()}
                  </Col>
                </Row>

                <Row className="py-1 mt-3 justify-content-center">
                  <Col md="6" className="text-center">
                    <Button
                      color="primary"
                      onClick={this.createCertificate}
                      disabled={txState !== 'null' && true}
                      block
                    >
                      {buttonText}
                    </Button>
                  </Col>
                </Row>

              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

NewCertificate.propTypes = {
  address: PropTypes.string.isRequired,
};

export default NewCertificate;
