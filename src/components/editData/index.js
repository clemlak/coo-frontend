import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

class EditData extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      certificateId,
      isOpen,
      data,
    } = this.props;

    this.state = {
      address,
      certificateId,
      isOpen,
      data,
      buttonText: 'Update data',
      isButtonDisabled: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    const {
      isOpen,
      data,
    } = this.props;

    if (prevProps.isOpen !== isOpen) {
      this.setState({
        isOpen,
      });
    }

    if (data !== prevProps.data) {
      this.setState({
        data,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  updateData = () => {
    const {
      certificateId,
      address,
      data,
    } = this.state;

    this.setState({
      buttonText: 'Waiting approval in MetaMask...',
      isButtonDisabled: true,
    });

    CooContract.methods.updateCertificateData(
      certificateId,
      data,
    ).send({
      from: address,
    })
      .on('transactionHash', () => {
        this.setState({
          buttonText: 'Transaction is pending...',
        });
      })
      .on('confirmation', () => {
        this.setState({
          buttonText: 'Transaction is confirmed!',
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
      data,
      isOpen,
      buttonText,
      isButtonDisabled,
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
                  Edit data
                </p>
              </Col>
            </Row>

            <Row className="pb-3 justify-content-around">
              <Col>
                <FormGroup>
                  <Label for="data">
                    <small className="font-weight-bold">
                      Enter your new data here
                    </small>
                  </Label>
                  <Input
                    type="textarea"
                    name="data"
                    id="data"
                    onChange={this.onChange}
                    value={data}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="pb-3">
              <Col className="text-right">
                <Button color="secondary" onClick={toggle}>
                  Close
                </Button>
                {' '}
                <Button
                  color="primary"
                  onClick={this.updateData}
                  disabled={isButtonDisabled}
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

EditData.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default EditData;
