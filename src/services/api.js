import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/auth/register', { name, email, password });
};

export const getProducts = () => {
  return api.get('/products');
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const getUsers = async () => {
  try {
    return await api.get('/auth/users');
  } catch (error) {
    // Mock data when backend is not available
    console.log('Backend not available, using mock users');
    return {
      data: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'user' },
        { id: 5, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
      ]
    };
  }
};

export const getUserOrders = async (userId) => {
  try {
    return await api.get(`/auth/users/${userId}/orders`);
  } catch (error) {
    // Mock data when backend is not available
    console.log('Backend not available, using mock user orders');
    const mockOrders = {
      1: [
        { id: 1, productId: 1, quantity: 1, total: 7500, status: 'Delivered' },
        { id: 2, productId: 3, quantity: 1, total: 120000, status: 'Processing' }
      ],
      2: [
        { id: 3, productId: 2, quantity: 1, total: 5200, status: 'Shipped' },
        { id: 4, productId: 4, quantity: 1, total: 45000, status: 'Pending' }
      ],
      3: [
        { id: 5, productId: 5, quantity: 2, total: 9600, status: 'Delivered' },
        { id: 6, productId: 6, quantity: 1, total: 8200, status: 'Processing' }
      ],
      4: [
        { id: 7, productId: 7, quantity: 3, total: 1050, status: 'Shipped' },
        { id: 8, productId: 8, quantity: 1, total: 3550, status: 'Pending' }
      ],
      5: []
    };
    return { data: mockOrders[userId] || [] };
  }
};

export const getAllOrders = async () => {
  try {
    return await api.get('/auth/orders');
  } catch (error) {
    // Mock data when backend is not available
    console.log('Backend not available, using mock orders');
    return {
      data: [
        { id: 1, userId: 1, productId: 1, quantity: 1, total: 7500, status: 'Delivered', User: { name: 'John Doe' }, Product: { name: 'Classic Chronograph' } },
        { id: 2, userId: 1, productId: 3, quantity: 1, total: 120000, status: 'Processing', User: { name: 'John Doe' }, Product: { name: 'Nautilus' } },
        { id: 3, userId: 2, productId: 2, quantity: 1, total: 5200, status: 'Shipped', User: { name: 'Jane Smith' }, Product: { name: 'Seamaster Diver 300M' } },
        { id: 4, userId: 2, productId: 4, quantity: 1, total: 45000, status: 'Pending', User: { name: 'Jane Smith' }, Product: { name: 'Royal Oak' } },
        { id: 5, userId: 3, productId: 5, quantity: 2, total: 9600, status: 'Delivered', User: { name: 'Mike Johnson' }, Product: { name: 'Carrera' } },
        { id: 6, userId: 3, productId: 6, quantity: 1, total: 8200, status: 'Processing', User: { name: 'Mike Johnson' }, Product: { name: 'Navitimer' } },
        { id: 7, userId: 4, productId: 7, quantity: 3, total: 1050, status: 'Shipped', User: { name: 'Sarah Wilson' }, Product: { name: 'Edge Ceramic' } },
        { id: 8, userId: 4, productId: 8, quantity: 1, total: 3550, status: 'Pending', User: { name: 'Sarah Wilson' }, Product: { name: 'Tank' } }
      ]
    };
  }
};

export default api; 