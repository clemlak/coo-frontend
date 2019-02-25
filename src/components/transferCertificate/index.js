import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Modal,
  ModalBody,
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
          <ModalBody>

            <Row className="pb-1">
              <Col>
                <p className="lead">
                  Transfer certificate
                </p>
              </Col>
            </Row>

            <Row className="pb-3">
              <Col>
                <p>
                  Please input the HERC address of the recipient.
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  value={recipient}
                  onChange={this.handleUpdate}
                />
              </Col>
            </Row>

            <Row className="pb-3">
              <Col>
                <p>
                  <small>
                    Warning: This action cannot be canceled!
                  </small>
                </p>
              </Col>
            </Row>

            <Row className="py-3">
              <Col className="text-right">
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
              </Col>
            </Row>

          </ModalBody>
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
