import { useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="list-group">
          {cart.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
