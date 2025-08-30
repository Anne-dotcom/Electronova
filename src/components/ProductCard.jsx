import { Card, Button } from 'react-bootstrap';

export default function ProductCard({ product, addToCart }) {
  return (
    <Card className="mb-3 me-3" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
