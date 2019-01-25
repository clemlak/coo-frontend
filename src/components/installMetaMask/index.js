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

const InstallMetaMask = () => (
  <div>
    <Container fluid>
      <Row className="py-4 justify-content-center">
        <Col xs="8" sm="6" md="4" lg="4">
          <Card>
            <CardBody>
              <CardTitle className="text-center">
                Please install MetaMask
              </CardTitle>
              <CardText>
                You need to have MetaMask installed in your browser to continue.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default InstallMetaMask;
