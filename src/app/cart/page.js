"use client";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import CartItem from "../../components/CartItem";
import { useCart } from "../../app/context/CartContext";

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();

  const total = getCartTotal();

  const handleCheckout = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <p>Start shopping to add items to your cart!</p>
        </div>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cart.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </ListGroup>
          
          <Row className="justify-content-end">
            <Col md={6}>
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">Total: ₹{total.toLocaleString()}</h4>
                  <Button variant="primary" size="lg" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}