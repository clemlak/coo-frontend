import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Label,
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
      isOpen,
    } = this.props;

    this.state = {
      address,
      certificateId,
      recipient: '',
      isOpen,
      buttonText: 'Validate',
      txState: 'null',
    };
  }

  componentDidUpdate = (prevProps) => {
    const {
      isOpen,
    } = this.props;

    if (prevProps.isOpen !== isOpen) {
      this.setState({
        isOpen,
      });
    }
  }

  transferCertificate = () => {
    const {
      address,
      certificateId,
      recipient,
    } = this.state;

    this.setState({
      buttonText: 'Waiting approval in MetaMask...',
      txState: 'waitingApproval',
    });

    CooContract.methods.transferFrom(address, recipient, certificateId).send({
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

  handleUpdate = (e) => {
    this.setState({
      recipient: e.target.value,
    });
  }

  render = () => {
    const {
      recipient,
      isOpen,
      buttonText,
      txState,
    } = this.state;

    const {
      toggle,
    } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Transfer certificate</ModalHeader>
          <ModalBody>
            <p>
              Please input the address of the recipient.
            </p>
            <FormGroup>
              <Label for="address">
                <small className="font-weight-bold">
                  Recipient
                </small>
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="0x8e966e75dAB5FA5A22ea3FF1F6032851cB22C30D"
                value={recipient}
                onChange={this.handleUpdate}
              />
            </FormGroup>
            <p>
              <small>
                Warning: This action cannot be canceled!
              </small>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
            {' '}
            <Button
              color="primary"
              onClick={this.transferCertificate}
              disabled={txState !== 'null' && true}
            >
              {buttonText}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

TransferCertificate.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default TransferCertificate;
