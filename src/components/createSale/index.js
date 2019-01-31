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
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import CooContract from '../../common/contracts/marketplaceContract';

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
      price: 0,
      deadline: 0,
      isAuction: false,
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

  render = () => {
    const {
      isOpen,
      buttonText,
      txState,
      price,
      deadline,
      isAuction,
    } = this.state;

    const {
      toggle,
    } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Create a new sale</ModalHeader>
          <ModalBody>
            <p>
              Please fill in the following form to create a new sale.
            </p>
            <FormGroup>
              <Label for="amount">
                <small className="font-weight-bold">
                  Expected price in HERC:
                </small>
              </Label>
              <InputGroup>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="1000"
                  value={price}
                  onChange={this.handleUpdate}
                  className="text-right"
                />
                <InputGroupAddon addonType="append">
                  HERC
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <Row className="align-items-center">
              <Col md="8">
                <Label for="deadline">
                  <small className="font-weight-bold">
                    Expiry date (days):
                  </small>
                </Label>
                <Row>
                  <Col>
                    <Input
                      type="number"
                      name="deadline"
                      id="deadline"
                      placeholder="1000"
                    />
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="deadlineUnit"
                        id="deadlineUnit"
                      >
                        <option>minute(s)</option>
                        <option>hour(s)</option>
                        <option>day(s)</option>
                        <option>week(s)</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    {' '}
                    This sale is an auction
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
            {' '}
            <Button
              color="primary"
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

CreateSale.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CreateSale;
