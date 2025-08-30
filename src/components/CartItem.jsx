"use client";
import { ListGroup, Button, Row, Col, Image } from "react-bootstrap";

export default function CartItem({ item, removeFromCart, updateQuantity }) {
  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        {/* Product Image */}
        <Col md={2} className="mb-2 mb-md-0">
          <Image 
            src={item.image} 
            alt={item.name}
            fluid
            rounded
            style={{ maxHeight: '80px', objectFit: 'cover' }}
          />
        </Col>
        
        {/* Product Name and Price */}
        <Col md={4} className="mb-2 mb-md-0">
          <div>
            <strong>{item.name}</strong>
            <div className="text-muted">₹{item.price.toLocaleString()}</div>
          </div>
        </Col>
        
        {/* Quantity Controls */}
        <Col md={3} className="mb-2 mb-md-0">
          <div className="d-flex align-items-center">
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            
            <span className="mx-3" style={{ minWidth: '30px', textAlign: 'center' }}>
              {item.quantity}
            </span>
            
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </Col>
        
        {/* Item Total and Remove Button */}
        <Col md={3} className="text-md-end">
          <div className="mb-2">
            <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
          </div>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}