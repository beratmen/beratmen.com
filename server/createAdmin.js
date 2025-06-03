// Add admin user script
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function createAdmin() {
  const username = 'admin';
  const password = 'Admin123!'; // You should change this to a secure password
  
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the admin user
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    });
    
    console.log('Admin user created successfully:', {
      id: admin.id,
      username: admin.username
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
