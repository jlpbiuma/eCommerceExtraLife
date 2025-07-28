import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// Simple password hashing function
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedRoles() {
  const roles = [
    { name: 'admin', description: 'Administrator with full access' },
    { name: 'customer', description: 'Regular customer user' },
  ];

  console.log('Seeding roles...');
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
}

async function seedCategories() {
  const categories = [
    { name: 'Strategy', description: 'Games that emphasize strategic planning' },
    { name: 'Family', description: 'Games suitable for family entertainment' },
    { name: 'Party', description: 'Games ideal for social gatherings' },
    { name: 'Card Games', description: 'Games primarily using cards' },
    { name: 'Cooperative', description: 'Games where players work together' },
  ];

  console.log('Seeding categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
}

async function seedProducts() {
  // First get category IDs
  const strategyCategory = await prisma.category.findUnique({ where: { name: 'Strategy' } });
  const familyCategory = await prisma.category.findUnique({ where: { name: 'Family' } });
  
  if (!strategyCategory || !familyCategory) {
    throw new Error('Categories not found');
  }

  const products = [
    {
      name: 'Catan',
      description: 'Classic strategy game of trading and building',
      price: 49.99,
      category: { connect: { id: strategyCategory.id } },
      minPlayers: 3,
      maxPlayers: 4,
      playTimeMin: 60,
      playTimeMax: 120,
      ageRating: 10,
      weight: 1.5,
      dimensions: '9.5x9.5x3 inches',
      publisher: 'KOSMOS',
    },
    {
      name: 'Monopoly',
      description: 'Classic family board game of real estate trading',
      price: 29.99,
      category: { connect: { id: familyCategory.id } },
      minPlayers: 2,
      maxPlayers: 8,
      playTimeMin: 60,
      playTimeMax: 180,
      ageRating: 8,
      weight: 1.2,
      dimensions: '15.75x10.5x2 inches',
      publisher: 'Hasbro',
    },
  ];

  console.log('Seeding products...');
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: product.name,
        publisher: product.publisher
      }
    });

    if (existingProduct) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: product,
      });
    } else {
      const createdProduct = await prisma.product.create({
        data: product,
      });

      // Create inventory for each product
      await prisma.inventory.create({
        data: {
          productId: createdProduct.id,
          quantity: 50,
          lowStockThreshold: 10,
        },
      });
    }
  }
}

async function seedUsers() {
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  const customerRole = await prisma.role.findUnique({ where: { name: 'customer' } });

  if (!adminRole || !customerRole) {
    throw new Error('Roles not found');
  }

  const users = [
    {
      email: 'admin@example.com',
      passwordHash: hashPassword('admin123'),
      firstName: 'Admin',
      lastName: 'User',
      role: { connect: { id: adminRole.id } },
      phone: '123-456-7890',
      address: '123 Admin St, City, Country',
    },
    {
      email: 'customer@example.com',
      passwordHash: hashPassword('customer123'),
      firstName: 'John',
      lastName: 'Doe',
      role: { connect: { id: customerRole.id } },
      phone: '098-765-4321',
      address: '456 Customer Ave, City, Country',
    },
  ];

  console.log('Seeding users...');
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

async function seedReviews() {
  // Get a user and a product
  const customer = await prisma.user.findUnique({ where: { email: 'customer@example.com' } });
  const catan = await prisma.product.findFirst({ 
    where: { 
      name: 'Catan',
      publisher: 'KOSMOS'
    } 
  });

  if (!customer || !catan) return;

  const reviews = [
    {
      userId: customer.id,
      productId: catan.id,
      rating: 5,
      comment: 'Great strategy game! Perfect for game nights.',
    },
  ];

  console.log('Seeding reviews...');
  for (const review of reviews) {
    await prisma.review.upsert({
      where: {
        productId_userId: {
          productId: review.productId,
          userId: review.userId,
        },
      },
      update: {},
      create: review,
    });
  }
}

async function main() {
  try {
    // Seed in order due to relationships
    await seedRoles();
    await seedCategories();
    await seedUsers();
    await seedProducts();
    await seedReviews();

    console.log('🌱 Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main(); 