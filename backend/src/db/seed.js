import 'dotenv/config.js';
import { connectPostgres, executePostgresQuery } from './postgres.js';
import { connectMongoDB } from './mongodb.js';
import { createTables, insertSeedData, dropAllTables } from './postgresSetup.js';
import { createAssignments } from './mongodbSetup.js';

async function seed() {
  try {
    console.log('\n Starting database seeding...\n');

    await connectMongoDB();
    await connectPostgres();

    console.log('\n MongoDB Setup:');
    await createAssignments();

    console.log('\nPostgreSQL Setup:');
    await dropAllTables();
    await createTables();
    await insertSeedData();

    process.exit(0);
  } catch (err) {
    console.error('\n Seeding error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

seed();
