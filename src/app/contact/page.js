export default function Contact() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 contact-heading">Contact Us</h2>
      <p className="text-center text-muted">
        Have questions or need help? We’d love to hear from you!
      </p>

      <div className="row mt-5">
        {/* Contact Details */}
        <div className="col-md-6 mb-4">
          <h4>Get in Touch</h4>
          <p>
            <strong>Email:</strong> support@electronova.com
          </p>
          <p>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <strong>Address:</strong> 123 Tech Park, Bangalore, India
          </p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <h4>Send Us a Message</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Your Message
              </label>
              <textarea className="form-control" id="message" rows="4" placeholder="Write your message here"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
