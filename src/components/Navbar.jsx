"use client";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useCart } from '../app/context/CartContext';

export default function AppNavbar() {
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link href="/" className="navbar-brand glow-hover">Electronova</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" className="nav-link glow-hover">Home</Link>
            <Link href="/products" className="nav-link glow-hover">Products</Link>
            <Link href="/about" className="nav-link glow-hover">About</Link>
            <Link href="/contact" className="nav-link glow-hover">Contact</Link>
            <Link href="/cart" className="nav-link position-relative glow-hover">
              <i className="bi bi-cart-fill me-1"></i> Cart
              {cartItemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemsCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
