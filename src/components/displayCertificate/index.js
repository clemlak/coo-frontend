import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse,
  Row,
  Col,
} from 'reactstrap';

import CooContract from '../../common/cooContract';

import TransferCertificate from '../transferCertificate';
import AddData from '../addData';

class DisplayCertificate extends Component {
  constructor(props) {
    super(props);

    const {
      match: {
        params: {
          certificateId,
        },
      },
      address,
    } = this.props;

    this.state = {
      address,
      certificateId,
      assetId: '',
      name: '',
      label: '',
      price: '',
      timestamp: '',
      factomEntryHash: '',
      anotherEncryptionKey: '',
      data: [],
      collapseTransfer: false,
      collapseAddData: false,
    };

    this.toggleAddData = this.toggleAddData.bind(this);
    this.toggleTransfer = this.toggleTransfer.bind(this);
  }

  componentDidMount = () => {
    this.getCertificate();
  }

  getCertificate = () => {
    const {
      certificateId,
      address,
    } = this.state;

    CooContract.methods.getCertificate(certificateId).call({
      from: address,
    })
      .then((certificate) => {
        const {
          assetId,
          name,
          label,
          price,
          timestamp,
          factomEntryHash,
          anotherEncryptionKey,
        } = certificate;

        this.setState({
          assetId,
          name,
          label,
          price,
          timestamp,
          factomEntryHash,
          anotherEncryptionKey,
        });

        return CooContract.methods.getCertificateData(certificateId).call({
          from: address,
        });
      })
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayData = () => {
    const {
      data,
    } = this.state;

    const datalist = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        datalist.push(
          <ListGroupItem key={i}>
            {data[i]}
          </ListGroupItem>,
        );
      }

      return (
        <ListGroup>
          {datalist}
        </ListGroup>
      );
    }

    return (
      <ListGroup>
        <ListGroupItem>
          No available data for the moment!
        </ListGroupItem>
      </ListGroup>
    );
  }

  toggleAddData = () => {
    const {
      collapseAddData,
    } = this.state;

    this.setState({
      collapseAddData: !collapseAddData,
    });
  }

  toggleTransfer = () => {
    const {
      collapseTransfer,
    } = this.state;

    this.setState({
      collapseTransfer: !collapseTransfer,
    });
  }

  render = () => {
    const {
      address,
      certificateId,
      assetId,
      name,
      label,
      price,
      timestamp,
      factomEntryHash,
      anotherEncryptionKey,
      collapseTransfer,
      collapseAddData,
      data,
    } = this.state;

    return (
      <div>
        <Card>
          <CardHeader className="font-weight-bold">
            {`Displaying certificate ${certificateId}`}
          </CardHeader>
          <CardBody>
            <p>
              <b>
                Certificate information:
              </b>
            </p>
            <ListGroup>
              <ListGroupItem>
                {`Asset id: ${assetId}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Asset name: ${name}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Asset label: ${label}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Asset price: ${price}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Certificate created at : ${timestamp}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Asset factomEntryHash: ${factomEntryHash}`}
              </ListGroupItem>
              <ListGroupItem>
                {`Asset anotherEncryptionKey: ${anotherEncryptionKey}`}
              </ListGroupItem>
            </ListGroup>
            <br />
            <p>
              <b>
                Additional data:
              </b>
            </p>
            {this.displayData()}
          </CardBody>
          <CardFooter>
            <Row>
              <Col>
                <Button color="primary" onClick={this.toggleAddData} block>
                  {collapseAddData ? 'Close add data' : 'Add data'}
                </Button>
              </Col>
              <Col>
                <Button color="primary" onClick={this.toggleTransfer} block>
                  {collapseTransfer ? 'Close transfer' : 'Transfer certificate'}
                </Button>
              </Col>
            </Row>
            <Collapse isOpen={collapseTransfer}>
              <TransferCertificate
                address={address}
                certificateId={certificateId}
              />
            </Collapse>
            <Collapse isOpen={collapseAddData}>
              <AddData
                address={address}
                certificateId={certificateId}
                data={data}
              />
            </Collapse>

          </CardFooter>
        </Card>
      </div>
    );
  }
}

DisplayCertificate.propTypes = {
  address: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      certificateId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DisplayCertificate;
