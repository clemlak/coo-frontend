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

const UnlockMetaMask = () => (
  <div>
    <Container fluid>
      <Row className="py-4 justify-content-center">
        <Col xs="8" sm="6" md="4" lg="4">
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle className="text-center">
                Please unlock MetaMask
              </CardTitle>
              <CardText>
                Click on MetaMask and unlock it to continue.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default UnlockMetaMask;
