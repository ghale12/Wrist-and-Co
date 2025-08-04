require('dotenv').config();
const { sequelize } = require('./config/db');
const Product = require('./models/Product');

const products = [
    {
        id: 1, name: 'Classic Chronograph', brand: 'Rolex', price: 7500,
        imageUrl: '/assets/rolex.jpg', type: 'Chronograph', gender: 'Mens',
        strapMaterial: 'Stainless Steel', dialColor: 'Black', caseSize: '40mm',
        waterResistance: '100m', description: 'A timeless classic, the Rolex Chronograph is the epitome of style and performance.'
    },
    {
        id: 2, name: 'Seamaster Diver 300M', brand: 'Omega', price: 5200,
        imageUrl: '/assets/omega.jpg', type: 'Diver', gender: 'Mens',
        strapMaterial: 'Rubber', dialColor: 'Blue', caseSize: '42mm',
        waterResistance: '300m', description: 'The Omega Seamaster is a legendary timepiece, famous for its association with James Bond.'
    },
    {
        id: 3, name: 'Nautilus', brand: 'Patek Philippe', price: 120000,
        imageUrl: '/assets/patek.jpg', type: 'Luxury', gender: 'Unisex',
        strapMaterial: 'Stainless Steel', dialColor: 'Blue', caseSize: '40mm',
        waterResistance: '120m', description: 'The Patek Philippe Nautilus is an icon of watch design, with its distinctive porthole-shaped case.'
    },
    {
        id: 4, name: 'Royal Oak', brand: 'Audemars Piguet', price: 45000,
        imageUrl: '/assets/audemars.jpg', type: 'Luxury', gender: 'Mens',
        strapMaterial: 'Stainless Steel', dialColor: 'Blue', caseSize: '41mm',
        waterResistance: '50m', description: 'The Audemars Piguet Royal Oak is a revolutionary timepiece that created the luxury sports watch category.'
    },
    {
        id: 5, name: 'Carrera', brand: 'TAG Heuer', price: 4800,
        imageUrl: '/assets/tagheuer.jpg', type: 'Racing', gender: 'Mens',
        strapMaterial: 'Leather', dialColor: 'Black', caseSize: '43mm',
        waterResistance: '100m', description: 'The TAG Heuer Carrera is a classic racing watch, inspired by the thrilling world of motorsports.'
    },
    {
        id: 6, name: 'Navitimer', brand: 'Breitling', price: 8200,
        imageUrl: '/assets/breitling.jpg', type: 'Aviator', gender: 'Mens',
        strapMaterial: 'Stainless Steel', dialColor: 'Black', caseSize: '43mm',
        waterResistance: '30m', description: 'The Breitling Navitimer is a favorite of pilots and aviation enthusiasts, with its iconic slide rule bezel.'
    },
    {
        id: 7, name: 'Edge Ceramic', brand: 'Titan', price: 350,
        imageUrl: '/assets/titan.jpg', type: 'Fashion', gender: 'Unisex',
        strapMaterial: 'Ceramic', dialColor: 'Black', caseSize: '36mm',
        waterResistance: '30m', description: 'The Titan Edge is one of the slimmest watches in the world, a marvel of modern engineering.'
    },
    {
        id: 8, name: 'Tank', brand: 'Cartier', price: 3550,
        imageUrl: '/assets/cartier.jpg', type: 'Dress', gender: 'Unisex',
        strapMaterial: 'Leather', dialColor: 'White', caseSize: '33.7mm x 25.5mm',
        waterResistance: '30m', description: 'The Cartier Tank is a timeless and elegant timepiece, with a design inspired by the Renault tanks of WWI.'
    }
];

const seedDatabase = async () => {
  try {
    await sequelize.sync(); // Removed { force: true }
    // Check if products already exist to avoid duplication
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(products);
      console.log('Database seeded successfully!');
    } else {
      console.log('Database already seeded.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seeding
seedDatabase(); 