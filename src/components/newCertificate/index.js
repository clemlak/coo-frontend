import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardFooter,
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
    };
  }

  handleUpdate = (e) => {
    if (e.target.name === 'assetIdInput') {
      this.setState({ assetId: e.target.value });
    } else if (e.target.name === 'nameInput') {
      this.setState({ name: e.target.value });
    } else if (e.target.name === 'labelInput') {
      this.setState({ label: e.target.value });
    } else if (e.target.name === 'priceInput') {
      this.setState({ price: e.target.value });
    } else if (e.target.name === 'factomEntryHashInput') {
      this.setState({ factomEntryHash: e.target.value });
    } else if (e.target.name === 'anotherEncryptionKeyInput') {
      this.setState({ anotherEncryptionKey: e.target.value });
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
    };

    this.setState({
      buttonText: 'Waiting approval in MetaMask...',
      txState: 'waitingApproval',
    });

    CooContract.methods.createCertificate(certificate).send({
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

  render = () => {
    const {
      assetId,
      name,
      label,
      price,
      factomEntryHash,
      anotherEncryptionKey,
      buttonText,
      txState,
    } = this.state;

    return (
      <div>
        <Container>
          <Row className="py-4 justify-content-center">
            <Col xs="12" sm="8" lg="8">
              <p className="h5 mb-3">
                Create a new certificate
              </p>
              <Card className="shadow-sm">
                <CardBody>
                  <Form>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="assetIdInput">
                            <small className="font-weight-bold">Asset id</small>
                          </Label>
                          <Input
                            type="number"
                            name="assetIdInput"
                            id="assetIdInput"
                            placeholder="1234"
                            onChange={this.handleUpdate}
                            value={assetId}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="nameInput">
                            <small className="font-weight-bold">Asset name</small>
                          </Label>
                          <Input
                            type="text"
                            name="nameInput"
                            id="nameInput"
                            placeholder="An amazing asset"
                            onChange={this.handleUpdate}
                            value={name}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="labelInput">
                            <small className="font-weight-bold">Asset label</small>
                          </Label>
                          <Input
                            type="text"
                            name="labelInput"
                            id="labelInput"
                            placeholder="AAS"
                            onChange={this.handleUpdate}
                            value={label}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="priceInput">
                            <small className="font-weight-bold">Asset price</small>
                          </Label>
                          <Input
                            type="number"
                            name="priceInput"
                            id="priceInput"
                            placeholder="200"
                            onChange={this.handleUpdate}
                            value={price}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="factomEntryHashInput">
                            <small className="font-weight-bold">Asset Factom entry hash</small>
                          </Label>
                          <Input
                            type="text"
                            name="factomEntryHashInput"
                            id="factomEntryHashInput"
                            placeholder="ABCDE"
                            onChange={this.handleUpdate}
                            value={factomEntryHash}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="anotherEncryptionKeyInput">
                            <small className="font-weight-bold">Asset another encryption key</small>
                          </Label>
                          <Input
                            type="text"
                            name="anotherEncryptionKeyInput"
                            id="anotherEncryptionKeyInput"
                            placeholder="ABCDE"
                            onChange={this.handleUpdate}
                            value={anotherEncryptionKey}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <Row>
                    <Col>
                      <CardText>
                        <small className="text-muted">
                          Note: More data can be added later.
                        </small>
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button
                    color="primary"
                    onClick={this.createCertificate}
                    disabled={txState !== 'null' && true}
                    block
                  >
                    {buttonText}
                  </Button>
                </CardFooter>
              </Card>
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
