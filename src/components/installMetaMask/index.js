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
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle className="text-center">
                Cannot find MetaMask
              </CardTitle>
              <CardText>
                We were unable to find MetaMask on your computer. If you don&apos;t have MetaMask on your computer, please install it.
                If you already have MetaMask, click on the MetaMask icon and grant us access to your account.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default InstallMetaMask;
