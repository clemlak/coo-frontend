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
  <div className="warning__background">
    <Container fluid>
      <Row className="py-4 justify-content-center">
        <Col xs="8" sm="8" md="8" lg="4">
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle className="font-weight-bold">
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
