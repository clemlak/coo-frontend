import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';

const WrongNetwork = () => (
  <div>
    <Container fluid>
      <Row className="py-4 justify-content-center">
        <Col xs="8" sm="6" md="4" lg="4">
          <Card>
            <CardBody>
              <CardTitle className="text-center">
                Please change your network to Ropsten
              </CardTitle>
              <CardText>
                Go to your MetaMask settings and change the current network to Ropsten to continue.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default WrongNetwork;
