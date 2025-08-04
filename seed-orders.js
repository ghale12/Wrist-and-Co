require('dotenv').config();
const { sequelize } = require('./config/db');
const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');

const fakeOrders = [
  {
    userId: 1,
    productId: 1, // Rolex Classic Chronograph
    quantity: 1,
    total: 7500,
    status: 'Delivered'
  },
  {
    userId: 1,
    productId: 3, // Patek Philippe Nautilus
    quantity: 1,
    total: 120000,
    status: 'Processing'
  },
  {
    userId: 2,
    productId: 2, // Omega Seamaster
    quantity: 1,
    total: 5200,
    status: 'Shipped'
  },
  {
    userId: 2,
    productId: 4, // Audemars Piguet Royal Oak
    quantity: 1,
    total: 45000,
    status: 'Pending'
  },
  {
    userId: 3,
    productId: 5, // TAG Heuer Carrera
    quantity: 2,
    total: 9600,
    status: 'Delivered'
  },
  {
    userId: 3,
    productId: 6, // Breitling Navitimer
    quantity: 1,
    total: 8200,
    status: 'Processing'
  },
  {
    userId: 4,
    productId: 7, // Titan Edge Ceramic
    quantity: 3,
    total: 1050,
    status: 'Shipped'
  },
  {
    userId: 4,
    productId: 8, // Cartier Tank
    quantity: 1,
    total: 3550,
    status: 'Pending'
  }
];

const seedOrders = async () => {
  try {
    await sequelize.sync();
    
    // Check if orders already exist
    const count = await Order.count();
    if (count === 0) {
      await Order.bulkCreate(fakeOrders);
      console.log('Orders seeded successfully!');
    } else {
      console.log('Orders already exist in database.');
    }
    
    // Show all orders
    const orders = await Order.findAll({
      include: [
        { model: Product, attributes: ['name', 'brand'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    
    console.log('\nCurrent Orders:');
    orders.forEach(order => {
      console.log(`Order #${order.id}: ${order.Product.name} - $${order.total} - Status: ${order.status}`);
    });
    
  } catch (error) {
    console.error('Error seeding orders:', error);
  } finally {
    await sequelize.close();
  }
};

seedOrders(); 