import React, { useState } from 'react';
import './ContactPage.css';
import './Form.css'; // Reusing form styles

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Contact form submitted', formData);
    setFeedbackMessage('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have a question about a watch or need help with an order? We're here to help. Fill out the form or contact us directly.
          </p>
          <p><strong>Email:</strong> support@wristandco.com</p>
          <p><strong>Phone:</strong> +977 9813467840</p>
          <div className="social-media">
            <a href="https://www.facebook.com/wristandco" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/Wrist_and_co" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="contact-form form-container">
          {feedbackMessage && <div className="message success">{feedbackMessage}</div>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={message} onChange={onChange} required rows="5"></textarea>
            </div>
            <button type="submit" className="form-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 