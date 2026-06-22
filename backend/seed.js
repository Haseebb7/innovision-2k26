require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/innovision');
    console.log('MongoDB Connected for Seeding...');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@innovision.com' });

    if (adminExists) {
      console.log('Admin user with email admin@innovision.com already exists. Seeding skipped.');
      process.exit(0);
    }

    const admin = new User({
      name: 'Innovision Admin',
      email: 'admin@innovision.com',
      password: 'admin123', // This will be hashed automatically by the pre-save middleware
      role: 'admin',
    });

    await admin.save();
    console.log('Admin seeded successfully!');
    console.log('Credentials: admin@innovision.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
