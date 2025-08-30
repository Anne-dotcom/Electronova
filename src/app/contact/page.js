"use client";
import { useState } from "react";
import { submitContactMessage } from "../../api/contact.js";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Sending...");
    
    try {
      console.log('Submitting contact form with data:', formData);
      
      const { data, error } = await submitContactMessage(formData);
      
      console.log('Contact form result:', { data, error });
      
      if (error) {
        console.error('Contact form API error:', error);
        setStatus(`Error: ${error.message}`);
      } else {
        console.log('✅ Contact message saved successfully:', data);
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // clear form
      }
    } catch (err) {
      console.error('Contact form unexpected error:', err);
      setStatus(`Unexpected error: ${err.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 contact-heading">Contact Us</h2>
      <p className="text-center text-muted">
        Have questions or need help? We&apos;d love to hear from you!
      </p>

      <div className="row mt-5">
        {/* Contact Details */}
        <div className="col-md-6 mb-4">
          <h4>Get in Touch</h4>
          <p><strong>Email:</strong> support@electronova.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123 Tech Park, Bangalore, India</p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <h4>Send Us a Message</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={formData.email} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows="4" 
                value={formData.message} 
                onChange={handleChange} 
                disabled={isLoading}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {status && (
            <div className={`mt-3 alert ${status.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}