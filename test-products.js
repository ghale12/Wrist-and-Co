require('dotenv').config();
const { sequelize } = require('./config/db');
const Product = require('./models/Product');

const testProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    
    const products = await Product.findAll();
    console.log(`Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`- ${product.name} (${product.brand}) - $${product.price}`);
    });
    
    if (products.length === 0) {
      console.log('No products found! Running seed...');
      const { exec } = require('child_process');
      exec('node seed.js', (error, stdout, stderr) => {
        if (error) {
          console.error('Error seeding:', error);
        } else {
          console.log('Seed completed');
        }
        process.exit(0);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
};

testProducts(); 