import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

class TransferCertificate extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      certificateId,
    } = this.props;

    this.state = {
      address,
      certificateId,
      recipient: '',
    };
  }

  transferCertificate = () => {
    const {
      address,
      certificateId,
      recipient,
    } = this.state;

    CooContract.methods.transferFrom(address, recipient, certificateId).send({
      from: address,
    })
      .on('transactionHash', (transactionHash) => {
        console.log(`Transaction ${transactionHash} is pending`);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('confirmation', (confirmation) => {
        console.log(confirmation);
        console.log('Transaction is confirmed');
      })
      .on('error', (err) => {
        console.log(err.message);
      });
  }

  handleUpdate = (e) => {
    this.setState({
      recipient: e.target.value,
    });
  }

  render = () => {
    const {
      recipient,
    } = this.state;

    return (
      <div className="py-2">
        <Card>
          <CardBody>
            <InputGroup>
              <Input
                placeholder="Ethereum address"
                value={recipient}
                onChange={this.handleUpdate}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.transferCertificate}>
                  Transfer certificate
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

TransferCertificate.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
};

export default TransferCertificate;
