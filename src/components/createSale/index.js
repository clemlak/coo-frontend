import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import MarketplaceContract from '../../common/contracts/marketplaceContract';
import CooContract from '../../common/contracts/cooContract';

class CreateSale extends Component {
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
      isOpen,
      buttonText: 'Create',
      txState: 'null',
      price: '',
      deadline: '',
      deadlineUnit: '',
      isAuction: false,
      approvalButtonText: 'Approve now',
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

  handleUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createSale = () => {
    const {
      address,
      certificateId,
      price,
      deadline,
      deadlineUnit,
      isAuction,
    } = this.state;

    const now = Math.round(Date.now() / 1000);
    let deadlineUnitMultiplier;

    if (deadlineUnit === 'Minute(s)') {
      deadlineUnitMultiplier = 60;
    } else if (deadlineUnit === 'Hour(s)') {
      deadlineUnitMultiplier = 60 * 60;
    } else if (deadlineUnit === 'Day(s)') {
      deadlineUnitMultiplier = 60 * 60 * 24;
    } else if (deadlineUnit === 'Week(s)') {
      deadlineUnitMultiplier = 60 * 60 * 24 * 7;
    }

    const finalDeadline = now + deadline * deadlineUnitMultiplier;

    if (!isAuction) {
      MarketplaceContract.methods.createSale(
        certificateId,
        Web3.utils.toWei(price),
        finalDeadline,
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
    } else {
      MarketplaceContract.methods.createAuction(
        certificateId,
        Web3.utils.toWei(price),
        finalDeadline,
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
  }

  onCheckBoxChanged = () => {
    const {
      isAuction,
    } = this.state;

    this.setState({
      isAuction: !isAuction,
    });
  }

  approve = () => {
    const {
      address,
      certificateId,
    } = this.state;

    this.setState({
      approvalButtonText: 'Waiting for approval in MetaMask...',
    });

    CooContract.methods.approve(
      MarketplaceContract.options.address,
      certificateId,
    ).send({
      from: address,
    })
      .on('transactionHash', () => {
        this.setState({
          approvalButtonText: 'Transaction is pending...',
        });
      })
      .on('confirmation', () => {
        this.setState({
          approvalButtonText: 'Transaction is confirmed!',
        });
      })
      .on('error', (err) => {
        this.setState({
          buttonText: err.message,
        });
      });
  }

  render = () => {
    const {
      isOpen,
      buttonText,
      txState,
      price,
      deadline,
      isAuction,
      deadlineUnit,
      approvalButtonText,
    } = this.state;

    const {
      toggle,
    } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalBody>

            <Row>
              <Col>
                <p className="lead">
                  Create a new sale
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <p>
                  Please fill in the following form to create a new sale.
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <FormGroup>
                  <Label for="amount">
                    <small className="font-weight-bold">
                      Expected price (or starting price for an auction):
                    </small>
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={this.handleUpdate}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="pb-3 justify-content-center align-item-end">
              <Col md="5">
                <Label for="deadline">
                  <small className="font-weight-bold">
                    Expiry date from now:
                  </small>
                </Label>
                <Input
                  type="number"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  onChange={this.handleUpdate}
                />
              </Col>
              <Col md="5" className="align-self-end">
                <Input
                  type="select"
                  name="deadlineUnit"
                  id="deadlineUnit"
                  value={deadlineUnit}
                  onChange={this.handleUpdate}
                  className="sale__duration"
                >
                  <option>Minute(s)</option>
                  <option>Hour(s)</option>
                  <option>Day(s)</option>
                  <option>Week(s)</option>
                </Input>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md="10">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="isAuction"
                      id="isAuction"
                      checked={isAuction}
                      onChange={this.onCheckBoxChanged}
                    />
                    <p className="mb-0">
                      <small>
                        {' '}
                        This sale is an auction
                      </small>
                    </p>
                  </Label>
                </FormGroup>
              </Col>
            </Row>

            <Row className="pb-3 justify-content-center">
              <Col md="10">
                <p className="text-light tiny">
                  Note: Before creating a sale,
                  {' '}
                  please grant us the right to manipulate your certificate.
                  {' '}
                </p>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col className="text-right">
                <Button color="secondary" onClick={toggle}>
                  Close
                </Button>
                {' '}
                <Button
                  color="primary"
                  onClick={this.createSale}
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

CreateSale.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CreateSale;
