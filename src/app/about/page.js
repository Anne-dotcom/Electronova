"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="py-5 about-page">
      {/* Header */}
      <Row className="mb-5 fade-in-up">
        <Col>
          <h2 className="text-center mb-3 about-heading">About Electronova</h2>
          <p className="lead text-center">
            Welcome to <strong>Electronova</strong>, your trusted online store for 
            futuristic electronic devices. From laptops to smartphones, we bring 
            innovation and reliability to your doorstep.
          </p>
        </Col>
      </Row>

      {/* Mission / Vision / Why Choose Us */}
      <Row className="mb-5">
        <Col md={4} className="fade-in-up delay-1">
          <Card className="shadow-sm border-0 mb-3 hover-card">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To provide high-quality, affordable electronics while keeping 
                innovation and customer satisfaction at the core of everything we do.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="fade-in-up delay-2">
          <Card className="shadow-sm border-0 mb-3 hover-card">
            <Card.Body>
              <Card.Title>Why Choose Us?</Card.Title>
              <Card.Text>
                With fast delivery, secure checkout, and premium support, 
                we are redefining the way you shop for devices online.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="fade-in-up delay-3">
          <Card className="shadow-sm border-0 mb-3 hover-card">
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                To become the leading platform for futuristic electronics, 
                where technology meets lifestyle in the most seamless way.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* What We Offer */}
      <Row className="fade-in-up delay-4">
        <Col>
          <h3 className="text-center mb-4">What We Offer</h3>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="fade-in-up delay-1">
          <Card className="shadow-sm border-0 mb-3 text-center hover-card">
            <Card.Body>
              <Card.Title>Laptops</Card.Title>
              <Card.Text>High-performance laptops for work, play, and creativity.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="fade-in-up delay-2">
          <Card className="shadow-sm border-0 mb-3 text-center hover-card">
            <Card.Body>
              <Card.Title>Smartphones</Card.Title>
              <Card.Text>Stay connected with the latest and smartest mobile devices.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="fade-in-up delay-3">
          <Card className="shadow-sm border-0 mb-3 text-center hover-card">
            <Card.Body>
              <Card.Title>Accessories</Card.Title>
              <Card.Text>Enhance your setup with futuristic accessories and gadgets.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="fade-in-up delay-4">
          <Card className="shadow-sm border-0 mb-3 text-center hover-card">
            <Card.Body>
              <Card.Title>Customer Care</Card.Title>
              <Card.Text>24/7 support to ensure a smooth and reliable shopping journey.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
