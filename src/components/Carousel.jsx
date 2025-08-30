// src/components/Carousel.jsx
"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel as BootstrapCarousel } from "bootstrap";

const Carousel = () => {
  useEffect(() => {
    const carouselElement = document.querySelector("#heroCarousel");
    new BootstrapCarousel(carouselElement, {
      interval: 3000,
      ride: "carousel",
      pause: "hover",
      wrap: true,
    });
  }, []);

  // Fixed height style for all slides
  const slideStyle = {
    height: "500px", // You can adjust this height
    objectFit: "cover",
    width: "100%",
  };

  return (
    <div id="heroCarousel" className="carousel slide">
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://www.apple.com/v/iphone/home/cd/images/meta/iphone__kqge21l9n26q_og.png"
            className="d-block w-100"
            alt="First slide"
            style={slideStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Welcome to ElectroNova</h5>
            <p>Your one-stop shop for electronic devices</p>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="https://istarmax.com/wp-content/uploads/2024/04/Starmax-Product-Range-Summer-2024-2.png"
            className="d-block w-100"
            alt="Second slide"
            style={slideStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Latest Smartphones</h5>
            <p>Explore top brands at unbeatable prices</p>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/surface-laptop-7th-edition-non-color-og-twitter-image?scl=1"
            className="d-block w-100"
            alt="Third slide"
            style={slideStyle}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Smart Home Gadgets</h5>
            <p>Make your life smarter and easier</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
