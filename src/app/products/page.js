"use client";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../app/context/CartContext";
import { useEffect, useState } from "react";

const productsData = [
  // Smartphones
  { id: 1, name: "iPhone 15 Pro", price: 99999, image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._UF1000,1000_QL80_.jpg" },
  { id: 2, name: "Samsung Galaxy S24", price: 84999, image: "https://m.media-amazon.com/images/I/717Q2swzhBL.jpg" },
  { id: 3, name: "Google Pixel 8 Pro", price: 89999, image: "https://m.media-amazon.com/images/I/71r0349s3cL.jpg" },
  { id: 4, name: "OnePlus 12", price: 69999, image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/304449_0_ngct1u.png?tr=w-600" },
  
  // Laptops
  { id: 5, name: "MacBook Pro 16-inch", price: 199999, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-silver-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673223" },
  { id: 6, name: "Dell XPS 15", price: 149999, image: "https://http2.mlstatic.com/D_Q_NP_714305-MLU77315373211_062024-O.webp" },
  { id: 7, name: "HP Spectre x360", price: 124999, image: "https://m.media-amazon.com/images/I/71KDRsw3VYL.jpg" },
  { id: 8, name: "ASUS ROG Zephyrus", price: 169999, image: "https://images-cdn.ubuy.co.in/64dbc39c91022274214ac5f4-asus-rog-zephyrus-duo-16-gx650-16.jpg" },
  
  // Headphones & Audio
  { id: 9, name: "Sony WH-1000XM5", price: 28999, image: "https://m.media-amazon.com/images/I/61ULAZmt9NL._UF1000,1000_QL80_.jpg" },
  { id: 10, name: "AirPods Pro (2nd Gen)", price: 24900, image: "https://m.media-amazon.com/images/I/2110TEYPKnL.jpg" },
  { id: 11, name: "JBL Flip 6 Bluetooth Speaker", price: 9999, image: "https://m.media-amazon.com/images/I/61P+C8bAhaL._UF1000,1000_QL80_.jpg" },
  { id: 12, name: "Bose QuietComfort Earbuds", price: 27900, image: "https://avshack.in/cdn/shop/files/BoseQuietComfortEarbuds-cl01.jpg?v=1733206830&width=1214" },
  
  // Smartwatches
  { id: 13, name: "Apple Watch Series 9", price: 41900, image: "https://m.media-amazon.com/images/I/81mHRsWENaL._UF1000,1000_QL80_.jpg" },
  { id: 14, name: "Samsung Galaxy Watch 6", price: 28999, image: "https://m.media-amazon.com/images/I/71sRBqqrOpL._UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Fitbit Charge 6", price: 14999, image: "https://m.media-amazon.com/images/I/51KJ3Pe2w5L._UF1000,1000_QL80_.jpg" },
  { id: 16, name: "Garmin Forerunner 265", price: 49990, image: "https://m.media-amazon.com/images/I/71vITm60zcL._UF1000,1000_QL80_.jpg" },
  
  // Digital Accessories
  { id: 17, name: "Samsung T7 Shield 1TB SSD", price: 8999, image: "https://m.media-amazon.com/images/I/714cd9DfoeL._UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Logitech MX Master 3S Mouse", price: 8995, image: "https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1" }
];

export default function Products() {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center animate-fade-in">Our Products</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {productsData.map((p, index) => (
          <div 
            key={p.id} 
            className={`product-card-wrapper animate-slide-in`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <ProductCard 
              product={p} 
              addToCart={() => handleAddToCart(p)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}