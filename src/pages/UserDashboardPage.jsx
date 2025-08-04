import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import './Dashboard.css';

const UserDashboardPage = () => {
  const { user } = useContext(AuthContext);

  // Placeholder data
  const orders = [
    { id: '123', date: '2024-07-24', total: 7500, status: 'Shipped' },
    { id: '124', date: '2024-07-20', total: 3550, status: 'Delivered' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <div className="profile-section">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>
      <div className="dashboard-content">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toLocaleString()}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage; 