import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPFS from 'ipfs-api';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap';

import CooContract from '../../common/contracts/cooContract';

class EditData extends Component {
  constructor(props) {
    super(props);

    this.ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

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
      updatedContent: [],
      isContentLoading: false,
      buttonText: 'Update data',
      isButtonDisabled: false,
    };
  }

  componentDidMount = () => {
    const {
      data,
    } = this.state;
  }

  componentDidUpdate = (prevProps, prevState) => {
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

    if (data !== prevState.data) {
      this.loadContent();
    }
  }

  loadContent = () => {
    const {
      data,
    } = this.state;

    if (data !== '') {
      const content = [];

      this.ipfs.get(data, (err, files) => {
        files.forEach((file) => {
          const body = JSON.parse(file.content.toString('utf8'));

          for (let i = 0; i < body.length; i += 1) {
            content.push(body[i]);
          }

          this.setState({
            updatedContent: content,
          });
        });
      });
    }
  }

  displayContent = () => {
    const {
      updatedContent,
      isContentLoading,
    } = this.state;

    if (isContentLoading && updatedContent.length === 0) {
      return (
        <div className="text-center">
          <p className="mb-1 text-center text-muted small">
            Content is loading...
          </p>
        </div>
      );
    }

    if (!isContentLoading && updatedContent.length === 0) {
      return (
        <div className="text-center">
          <p className="mb-1 text-center text-muted small">
            This certificate does not have any data yet.
          </p>
        </div>
      );
    }

    const previews = [];

    for (let i = 0; i < updatedContent.length; i += 1) {
      previews.push(
        <Row key={i} className="py-2">
          <Col className="text-center">
            <img
              src={`https://ipfs.infura.io/ipfs/${updatedContent[i]}`}
              alt={updatedContent[i]}
              className="mb-1"
            />
            <br />
            <Button onClick={() => this.deleteData(i)}>
              Delete
            </Button>
          </Col>
        </Row>,
      );
    }

    return previews;
  }

  captureFile = (e) => {
    const {
      updatedContent,
    } = this.state;

    e.stopPropagation();
    e.preventDefault();

    if (e.target.files.length > 0) {
      this.setState({
        isContentLoading: true,
      });

      const file = e.target.files[0];

      const reader = new window.FileReader();

      reader.onload = (r) => {
        const buffer = Buffer.from(r.target.result);

        const content = this.ipfs.types.Buffer.from(buffer);

        this.ipfs.files.add(content)
          .then((hash) => {
            updatedContent.push(hash[0].hash);

            this.setState({
              updatedContent,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  }

  deleteData = (i) => {
    let {
      updatedContent,
    } = this.state;

    updatedContent = this.remove(updatedContent, updatedContent[i]);

    this.setState({
      updatedContent,
    });
  }

  remove = (array, element) => array.filter(el => el !== element)

  updateData = () => {
    const {
      updatedContent,
      certificateId,
      address,
    } = this.state;

    this.setState({
      buttonText: 'Updating data...',
      isButtonDisabled: true,
    });

    const content = this.ipfs.types.Buffer.from(JSON.stringify(updatedContent));

    this.ipfs.files.add(content)
      .then((res) => {
        return CooContract.methods.updateCertificateData(
          certificateId,
          res[0].hash,
        ).send({
          from: address,
        });
      })
      .then((tx) => {
        this.setState({
          buttonText: 'Data updated!',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => {
    const {
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

            <Row className="pb-3">
              <Col>
                {this.displayContent()}
              </Col>
            </Row>

            <Row className="pb-3">
              <Col className="text-center">
                <Input
                  type="file"
                  name="fileInput"
                  id="fileInput"
                  className="form-control-file upload__button"
                  onChange={this.captureFile}
                />
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
