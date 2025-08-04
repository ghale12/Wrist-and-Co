import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ProductContext } from '../context/ProductContext.jsx';
import { deleteProduct, getUsers, getUserOrders, getAllOrders } from '../services/api';
import './Dashboard.css';

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { products, loading } = useContext(ProductContext);
  const [deletingId, setDeletingId] = useState(null);
  const [localProducts, setLocalProducts] = useState(products);
  const [showProducts, setShowProducts] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [ordersByUser, setOrdersByUser] = useState({});
  const [ordersLoadingId, setOrdersLoadingId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  React.useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setLocalProducts(localProducts.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      alert('Failed to fetch users.');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleToggleUsers = () => {
    setShowUsers(v => {
      if (!v) fetchUsers();
      return !v;
    });
  };

  const handleViewOrders = async (userId) => {
    setOrdersLoadingId(userId);
    try {
      const res = await getUserOrders(userId);
      setOrdersByUser(prev => ({ ...prev, [userId]: res.data }));
    } catch (err) {
      alert('Failed to fetch orders.');
    } finally {
      setOrdersLoadingId(null);
    }
  };

  const fetchAllOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders.');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleToggleOrders = () => {
    setShowOrders(v => {
      if (!v) fetchAllOrders();
      return !v;
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, Admin {user?.name}!</h1>
      <div className="dashboard-section">
        <button className="admin-toggle-btn" onClick={() => setShowProducts(v => !v)}>
          {showProducts ? 'Hide' : 'Manage Products'}
        </button>
        {showProducts && (
          <>
            <h2>Manage Products</h2>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>${product.price.toLocaleString()}</td>
                      <td>{product.stock ?? '-'}</td>
                      <td>
                        <button className="admin-btn">Edit</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(product.id)} disabled={deletingId === product.id}>
                          {deletingId === product.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <div className="dashboard-section">
        <button className="admin-toggle-btn" onClick={handleToggleUsers}>
          {showUsers ? 'Hide' : 'Manage Users'}
        </button>
        {showUsers && (
          <>
            <h2>Manage Users</h2>
            {usersLoading ? (
              <p>Loading users...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <React.Fragment key={user.id}>
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="admin-btn" onClick={() => handleViewOrders(user.id)}>
                            {ordersLoadingId === user.id ? 'Loading...' : 'View Orders'}
                          </button>
                        </td>
                      </tr>
                      {ordersByUser[user.id] && (
                        <tr>
                          <td colSpan="5">
                            <strong>Orders:</strong>
                            {ordersByUser[user.id].length === 0 ? (
                              <span> No orders found.</span>
                            ) : (
                              <ul>
                                {ordersByUser[user.id].map(order => (
                                  <li key={order.id}>
                                    Order #{order.id} - {order.status} - ${order.total} - Product ID: {order.productId} - Qty: {order.quantity}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <div className="dashboard-section">
        <button className="admin-toggle-btn" onClick={handleToggleOrders}>
          {showOrders ? 'Hide' : 'Manage Orders'}
        </button>
        {showOrders && (
          <>
            <h2>Manage Orders</h2>
            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.User ? order.User.name : order.userId}</td>
                      <td>{order.Product ? order.Product.name : order.productId}</td>
                      <td>{order.quantity}</td>
                      <td>${order.total}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage; 