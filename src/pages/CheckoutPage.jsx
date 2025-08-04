import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend to process the order
    console.log('Order placed:', { shippingInfo, paymentMethod, cartItems });
    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 3000); // Redirect to homepage after 3 seconds
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
          <p>You will be redirected to the homepage shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="shipping-form">
          <h2>Shipping Information</h2>
          <form id="shipping-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} required />
            </div>
          </form>
        </div>

        <div className="payment-and-summary">
          <div className="payment-options">
            <h2>Payment Method</h2>
            <div className="payment-tabs">
              <button className={paymentMethod === 'card' ? 'active' : ''} onClick={() => setPaymentMethod('card')}>Credit Card</button>
              <button className={paymentMethod === 'qr' ? 'active' : ''} onClick={() => setPaymentMethod('qr')}>QR Code</button>
            </div>

            {paymentMethod === 'card' && (
              <div className="payment-details">
                <h3>Enter Card Details</h3>
                {/* Dummy credit card form */}
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" placeholder="**** **** **** 1234" />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input type="text" id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" placeholder="123" />
                </div>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="payment-details qr-code">
                <h3>Scan to Pay</h3>
                <p>Use your mobile banking app to scan this QR code.</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/payment" alt="QR Code for Payment" />
              </div>
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="summary-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.imageUrl} alt={item.name} className="summary-item-image" />
                    <div className="summary-item-details">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="summary-total">
                <strong>Total:</strong>
                <strong>${getTotalPrice().toLocaleString()}</strong>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <button type="submit" form="shipping-form" className="btn-place-order">Place Order</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 