"use client";
import { useState } from 'react';
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import { Orbitron } from 'next/font/google';
import { useCart } from '../app/context/CartContext';

// Load a sleek/tech font
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const { addToCart } = useCart();
  
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 99999,
      image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 84999,
      image: "https://m.media-amazon.com/images/I/717Q2swzhBL.jpg"
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: 89999,
      image: "https://m.media-amazon.com/images/I/71r0349s3cL.jpg"
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 69999,
      image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/304449_0_ngct1u.png?tr=w-600"
    },
    {
      id: 5,
      name: "Xiaomi 14 Ultra",
      price: 79999,
      image: "https://www.dxomark.com/wp-content/uploads/medias/post-171171/bdc0df40e7c3983b73802b3d47dd20c4600x60085.jpg"
    },
    {
      id: 6,
      name: "Nothing Phone (2)",
      price: 44999,
      image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/301920_0_thffrs.png"
    },
    {
      id: 7,
      name: "Motorola Edge 50 Fusion",
      price: 21985,
      image: "https://www.mytrendyphone.eu/images/Motorola-Edge-50-Fusion-512GB-Hot-Pink-0840023270918-17052024-01-p.webp"
    },
    {
      id: 8,
      name: "Vivo V40",
      price: 32999,
      image: "https://img-prd-pim.poorvika.com/product/vivo-v40-5g-Purple-256gb-8gb-ram-front-back-view-01.png"
    }
  ]);

  // Function to handle adding to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <div className="position-relative" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
        {/* Video background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ 
            width: '100vw',
            height: '70vh', 
            objectFit: 'cover',
            minHeight: '400px',
            display: 'block'
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Text overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}>
          <h1 
            className={`display-4 fw-bold mb-3 fade-in-text ${orbitron.className}`}
          >
            Welcome to Electronova
          </h1>
          <p 
            className={`fs-5 fade-in-text-delayed ${orbitron.className}`}
          >
            Your one-stop shop for the latest electronic devices.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '8rem' }}></div>

      <Carousel />

      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <ProductList products={products} addToCart={handleAddToCart} />
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                  <p className="card-text">&quot;The best electronics store I have ever shopped at. Fast delivery and great prices!&quot;</p>
                  <footer className="blockquote-footer mt-3">Sarah Johnson</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                  <p className="card-text">&quot;Amazing customer service and the products are always top quality. Highly recommend!&quot;</p>
                  <footer className="blockquote-footer mt-3">Michael Chen</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                  <p className="card-text">&quot;Their deals are unbeatable, and the products arrive in perfect condition every time.&quot;</p>
                  <footer className="blockquote-footer mt-3">Emma Rodriguez</footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-in-text {
          opacity: 0;
          animation: fadeIn 2s ease-out forwards;
        }

        .fade-in-text-delayed {
          opacity: 0;
          animation: fadeIn 2s ease-out forwards;
          animation-delay: 2.2s; /* wait until heading is done */
        }
      `}</style>
    </div>
  );
}