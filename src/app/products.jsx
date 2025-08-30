import { useState } from 'react';
import ProductList from '../components/ProductList';

const productsData = [
  { id: 1, name: 'Laptop', price: 55000, image: '/images/laptop.jpg' },
  { id: 2, name: 'Smartphone', price: 25000, image: '/images/phone.jpg' },
  { id: 3, name: 'Headphones', price: 5000, image: '/images/headphones.jpg' },
];

export default function Products() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h2>Products</h2>
      <ProductList products={productsData} addToCart={addToCart} />
    </div>
  );
}
