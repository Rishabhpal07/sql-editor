import { executePostgresQuery } from './postgres.js';

export const createTables = async () => {
  console.log(' Creating PostgreSQL tables...');
  await executePostgresQuery(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INT,
      city VARCHAR(50),
      country VARCHAR(50),
      joined_date DATE NOT NULL,
      is_active BOOLEAN DEFAULT true
    )
  `);
  console.log('users table created');

  await executePostgresQuery(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL,
      created_date DATE NOT NULL,
      is_available BOOLEAN DEFAULT true
    )
  `);
  console.log(' products table created');

  await executePostgresQuery(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      order_date DATE NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending'
    )
  `);
  console.log(' orders table created');

  await executePostgresQuery(`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT NOT NULL REFERENCES orders(id),
      product_id INT NOT NULL REFERENCES products(id),
      quantity INT NOT NULL,
      unit_price DECIMAL(10, 2) NOT NULL
    )
  `);
  console.log('order_items table created');

  await executePostgresQuery(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL REFERENCES products(id),
      user_id INT NOT NULL REFERENCES users(id),
      rating INT CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      review_date DATE NOT NULL
    )
  `);
  console.log(' reviews table created');
};

export const insertSeedData = async () => {
  console.log(' Inserting seed data...');

  await executePostgresQuery(`
    INSERT INTO users (name, email, age, city, country, joined_date, is_active)
    VALUES
      ('Alice Johnson', 'alice.johnson@example.com', 28, 'New York', 'USA', '2023-01-15', true),
      ('Bob Smith', 'bob.smith@example.com', 35, 'Los Angeles', 'USA', '2023-02-20', true),
      ('Charlie Brown', 'charlie.brown@example.com', 42, 'Chicago', 'USA', '2023-03-10', true),
      ('Diana Prince', 'diana.prince@example.com', 31, 'London', 'UK', '2023-04-05', true),
      ('Eve Davis', 'eve.davis@example.com', 26, 'Sydney', 'Australia', '2023-05-12', true),
      ('Frank Miller', 'frank.miller@example.com', 38, 'Toronto', 'Canada', '2023-06-01', false),
      ('Grace Lee', 'grace.lee@example.com', 29, 'Tokyo', 'Japan', '2023-07-08', true),
      ('Henry Wilson', 'henry.wilson@example.com', 45, 'Berlin', 'Germany', '2023-08-15', true),
      ('Iris Martinez', 'iris.martinez@example.com', 33, 'Madrid', 'Spain', '2023-09-22', true),
      ('Jack Taylor', 'jack.taylor@example.com', 27, 'Dublin', 'Ireland', '2023-10-10', true)
    ON CONFLICT (email) DO NOTHING
  `);
  console.log(' Users inserted');

  await executePostgresQuery(`
    INSERT INTO products (name, category, price, stock, created_date, is_available)
    VALUES
      ('Laptop Pro', 'Electronics', 1299.99, 50, '2023-01-01', true),
      ('Wireless Mouse', 'Electronics', 29.99, 200, '2023-01-05', true),
      ('USB-C Cable', 'Electronics', 9.99, 500, '2023-01-10', true),
      ('Monitor 4K', 'Electronics', 399.99, 30, '2023-02-01', true),
      ('Mechanical Keyboard', 'Electronics', 149.99, 75, '2023-02-15', true),
      ('Coffee Maker', 'Home & Garden', 79.99, 40, '2023-03-01', true),
      ('Desk Lamp', 'Home & Garden', 45.99, 100, '2023-03-10', true),
      ('Office Chair', 'Furniture', 249.99, 25, '2023-04-01', true),
      ('Notebook Set', 'Stationery', 12.99, 300, '2023-04-15', true),
      ('Wireless Headphones', 'Electronics', 199.99, 60, '2023-05-01', true)
  `);
  console.log(' Products inserted');

  await executePostgresQuery(`
    INSERT INTO orders (user_id, order_date, total_amount, status)
    VALUES
      (1, '2024-01-05', 1329.98, 'completed'),
      (1, '2024-01-20', 249.99, 'completed'),
      (2, '2024-01-10', 399.99, 'completed'),
      (2, '2024-02-03', 199.99, 'pending'),
      (3, '2024-02-15', 79.99, 'completed'),
      (4, '2024-03-01', 1299.99, 'completed'),
      (5, '2024-03-10', 249.98, 'shipped'),
      (6, '2024-03-15', 45.99, 'pending'),
      (7, '2024-04-01', 459.97, 'completed'),
      (8, '2024-04-10', 199.99, 'completed'),
      (9, '2024-04-20', 149.99, 'shipped'),
      (10, '2024-05-05', 1479.96, 'pending')
  `);
  console.log('Orders inserted');

  await executePostgresQuery(`
    INSERT INTO order_items (order_id, product_id, quantity, unit_price)
    VALUES
      (1, 1, 1, 1299.99),
      (1, 2, 1, 29.99),
      (2, 8, 1, 249.99),
      (3, 4, 1, 399.99),
      (4, 10, 1, 199.99),
      (5, 6, 1, 79.99),
      (6, 1, 1, 1299.99),
      (7, 3, 3, 9.99),
      (7, 7, 1, 45.99),
      (8, 7, 1, 45.99),
      (9, 5, 1, 149.99),
      (9, 2, 2, 29.99),
      (10, 10, 1, 199.99),
      (11, 5, 1, 149.99),
      (12, 4, 2, 399.99),
      (12, 2, 2, 29.99)
  `);
  console.log(' Order items inserted');

  await executePostgresQuery(`
    INSERT INTO reviews (product_id, user_id, rating, comment, review_date)
    VALUES
      (1, 1, 5, 'Excellent laptop! Very fast and reliable.', '2024-01-10'),
      (1, 2, 4, 'Good product, arrived on time.', '2024-01-15'),
      (2, 3, 5, 'Perfect mouse, very comfortable.', '2024-01-20'),
      (4, 4, 5, 'Amazing 4K monitor, crystal clear.', '2024-01-25'),
      (5, 5, 4, 'Great keyboard for typing.', '2024-02-05'),
      (6, 3, 5, 'Makes perfect coffee every time!', '2024-02-10'),
      (7, 4, 3, 'Nice desk lamp but a bit dim.', '2024-02-15'),
      (8, 5, 5, 'Very comfortable office chair.', '2024-02-20'),
      (9, 1, 4, 'Good quality notebooks.', '2024-03-01'),
      (10, 2, 5, 'Best headphones I ever owned!', '2024-03-10'),
      (3, 6, 4, 'Durable cables.', '2024-03-15'),
      (1, 7, 5, 'Absolutely worth the price!', '2024-03-25')
  `);
  console.log(' Reviews inserted');
};

export const dropAllTables = async () => {
  console.log('🗑️  Dropping all tables...');

  try {
    await executePostgresQuery('DROP TABLE IF EXISTS reviews CASCADE');
    await executePostgresQuery('DROP TABLE IF EXISTS order_items CASCADE');
    await executePostgresQuery('DROP TABLE IF EXISTS orders CASCADE');
    await executePostgresQuery('DROP TABLE IF EXISTS products CASCADE');
    await executePostgresQuery('DROP TABLE IF EXISTS users CASCADE');
    console.log(' All tables dropped');
  } catch (err) {
    console.error('Error dropping tables:', err.message);
  }
};
