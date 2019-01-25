import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/cooContract';

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

    CooContract.methods.createCertificate(certificate).send({
      from: address,
    })
      .on('transactionHash', (transactionHash) => {
        console.log(`Transaction ${transactionHash} is pending`);
      })
      .on('confirmation', (confirmation) => {
        console.log(confirmation);
        console.log('Transaction is confirmed');
      })
      .on('error', (err) => {
        console.log(err.message);
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
    } = this.state;

    return (
      <div>
        <Card>
          <CardHeader className="font-weight-bold">
            Create a new certificate
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="assetIdInput" className="font-weight-bold text-muted">
                      Asset id
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
                    <Label for="nameInput" className="font-weight-bold text-muted">
                      Asset name
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
                    <Label for="labelInput" className="font-weight-bold text-muted">
                      Asset label
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
                    <Label for="priceInput" className="font-weight-bold text-muted">
                      Asset price
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
                    <Label for="factomEntryHashInput" className="font-weight-bold text-muted">
                      Asset Factom entry hash
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
                    <Label for="anotherEncryptionKeyInput" className="font-weight-bold text-muted">
                      Asset another encryption key
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
            <Button color="primary" onClick={this.createCertificate} block>
              Create certificate
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

NewCertificate.propTypes = {
  address: PropTypes.string.isRequired,
};

export default NewCertificate;
