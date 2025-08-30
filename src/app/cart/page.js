"use client";
import { useState } from "react";
import { ListGroup, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import CartItem from "../../components/CartItem";
import { useCart } from "../context/CartContext";
import { createOrder } from "../../api/order.js";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState({ type: '', message: '' });
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Total cart price
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setOrderStatus({ type: '', message: '' }); // Clear any previous status
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setOrderStatus({ type: '', message: '' });
  };

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setOrderStatus({ type: '', message: '' });

    try {
      // Validate required fields
      if (!orderDetails.name.trim() || !orderDetails.email.trim() || !orderDetails.address.trim()) {
        setOrderStatus({ 
          type: 'error', 
          message: 'Please fill in all required fields (Name, Email, Address)' 
        });
        setIsLoading(false);
        return;
      }

      // Prepare order data for API (match database column names)
      const orderData = {
        customer_name: orderDetails.name,
        email: orderDetails.email,
        phone: orderDetails.phone,
        address: orderDetails.address,
        city: orderDetails.city,
        postal_code: orderDetails.postalCode
      };

      // Prepare cart items for API
      const cartItems = cart.map(item => ({
        product_id: item.id, // Assuming your cart items have 'id' field
        quantity: item.quantity,
        price: item.price
      }));

      console.log('Creating order with data:', { orderData, cartItems });

      // Call the API to create order
      const result = await createOrder(orderData, cartItems);

      if (result.error) {
        console.error('Order creation error:', result.error);
        setOrderStatus({ 
          type: 'error', 
          message: `Failed to place order: ${result.error.message}` 
        });
      } else {
        console.log('Order created successfully:', result.data);
        setOrderStatus({ 
          type: 'success', 
          message: `Order placed successfully! Order ID: ${result.data.order.id}` 
        });
        
        // Clear cart after successful order
        clearCart();
        
        // Clear form
        setOrderDetails({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Unexpected error placing order:', error);
      setOrderStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
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

          <div className="text-end">
            <h5>Subtotal: ₹{subtotal.toLocaleString()}</h5>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderStatus.message && (
            <Alert variant={orderStatus.type === 'error' ? 'danger' : 'success'}>
              {orderStatus.message}
            </Alert>
          )}
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={orderDetails.name} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={orderDetails.email} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={orderDetails.phone} 
                onChange={handleChange} 
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="address" 
                value={orderDetails.address} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                name="city" 
                value={orderDetails.city} 
                onChange={handleChange} 
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control 
                type="text" 
                name="postalCode" 
                value={orderDetails.postalCode} 
                onChange={handleChange} 
                disabled={isLoading}
              />
            </Form.Group>

            <div className="text-center mb-3">
              <strong>Total: ₹{subtotal.toLocaleString()}</strong>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handlePlaceOrder}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}