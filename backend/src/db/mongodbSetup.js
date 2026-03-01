import { Assignment } from '../models/Assignment.js';
export const createAssignments = async () => {
  console.log('📚 Creating assignments...');

  const assignments = [
    {
      title: 'Count Total Users',
      difficulty: 'easy',
      description: 'Learn the basics of counting rows in a table.',
      question: 'How many users are registered in the system?',
      databaseSchema: {
        tables: [
          {
            name: 'users',
            columns: [
              { name: 'id', type: 'INT', description: 'User ID (Primary Key)' },
              { name: 'name', type: 'VARCHAR(100)', description: 'User full name' },
              { name: 'email', type: 'VARCHAR(100)', description: 'User email' },
              { name: 'age', type: 'INT', description: 'User age' },
              { name: 'city', type: 'VARCHAR(50)', description: 'City' },
              { name: 'country', type: 'VARCHAR(50)', description: 'Country' },
              { name: 'joined_date', type: 'DATE', description: 'Registration date' },
              { name: 'is_active', type: 'BOOLEAN', description: 'Active status' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'users',
        rows: [
          { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 28, city: 'New York', country: 'USA', joined_date: '2023-01-15', is_active: true },
          { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', age: 35, city: 'Los Angeles', country: 'USA', joined_date: '2023-02-20', is_active: true }
        ]
      },
      solutionQuery: 'SELECT COUNT(*) as total_users FROM users',
      hintPrompt: 'Use the COUNT() aggregate function to count all rows in the users table. What SQL keyword counts rows?'
    },
    {
      title: 'Active Users Only',
      difficulty: 'easy',
      description: 'Filter users based on a condition.',
      question: 'Get the names and emails of all active users.',
      databaseSchema: {
        tables: [
          {
            name: 'users',
            columns: [
              { name: 'id', type: 'INT', description: 'User ID (Primary Key)' },
              { name: 'name', type: 'VARCHAR(100)', description: 'User full name' },
              { name: 'email', type: 'VARCHAR(100)', description: 'User email' },
              { name: 'is_active', type: 'BOOLEAN', description: 'Active status' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'users',
        rows: [
          { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', is_active: true },
          { id: 6, name: 'Frank Miller', email: 'frank.miller@example.com', is_active: false }
        ]
      },
      solutionQuery: 'SELECT name, email FROM users WHERE is_active = true',
      hintPrompt: 'You need to filter the users table where is_active is true. Use the WHERE clause with = operator.'
    },
    {
      title: 'Products by Category',
      difficulty: 'easy',
      description: 'Group and filter data by category.',
      question: 'How many products are in the "Electronics" category?',
      databaseSchema: {
        tables: [
          {
            name: 'products',
            columns: [
              { name: 'id', type: 'INT', description: 'Product ID' },
              { name: 'name', type: 'VARCHAR(150)', description: 'Product name' },
              { name: 'category', type: 'VARCHAR(50)', description: 'Product category' },
              { name: 'price', type: 'DECIMAL(10,2)', description: 'Product price' },
              { name: 'stock', type: 'INT', description: 'Stock quantity' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'products',
        rows: [
          { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 50 },
          { id: 6, name: 'Coffee Maker', category: 'Home & Garden', price: 79.99, stock: 40 }
        ]
      },
      solutionQuery: 'SELECT COUNT(*) as electronics_count FROM products WHERE category = \'Electronics\'',
      hintPrompt: 'You need to count products WHERE the category equals "Electronics". Combine COUNT() with WHERE.'
    },
    {
      title: 'User Orders from 2024',
      difficulty: 'medium',
      description: 'Join tables and filter by date.',
      question: 'List all users who placed orders in 2024, with their order dates and total amounts.',
      databaseSchema: {
        tables: [
          {
            name: 'users',
            columns: [
              { name: 'id', type: 'INT', description: 'User ID' },
              { name: 'name', type: 'VARCHAR(100)', description: 'User name' }
            ]
          },
          {
            name: 'orders',
            columns: [
              { name: 'id', type: 'INT', description: 'Order ID' },
              { name: 'user_id', type: 'INT', description: 'Foreign key to users' },
              { name: 'order_date', type: 'DATE', description: 'Order date' },
              { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Order total' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'orders',
        rows: [
          { id: 1, user_id: 1, order_date: '2024-01-05', total_amount: 1329.98 },
          { id: 2, user_id: 1, order_date: '2024-01-20', total_amount: 249.99 }
        ]
      },
      solutionQuery: 'SELECT u.name, o.order_date, o.total_amount FROM users u JOIN orders o ON u.id = o.user_id WHERE EXTRACT(YEAR FROM o.order_date) = 2024',
      hintPrompt: 'You need to JOIN users with orders. Filter orders by year 2024 using EXTRACT(YEAR FROM ...) or date comparison. Select name, order_date, and total_amount.'
    },
    {
      title: 'Product Reviews Summary',
      difficulty: 'medium',
      description: 'Aggregate data with GROUP BY.',
      question: 'Get average rating for each product that has reviews, ordered by average rating descending.',
      databaseSchema: {
        tables: [
          {
            name: 'products',
            columns: [
              { name: 'id', type: 'INT', description: 'Product ID' },
              { name: 'name', type: 'VARCHAR(150)', description: 'Product name' }
            ]
          },
          {
            name: 'reviews',
            columns: [
              { name: 'id', type: 'INT', description: 'Review ID' },
              { name: 'product_id', type: 'INT', description: 'Foreign key' },
              { name: 'rating', type: 'INT', description: 'Rating (1-5)' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'reviews',
        rows: [
          { id: 1, product_id: 1, rating: 5 },
          { id: 2, product_id: 1, rating: 4 }
        ]
      },
      solutionQuery: 'SELECT p.name, AVG(r.rating) as avg_rating, COUNT(r.id) as review_count FROM products p JOIN reviews r ON p.id = r.product_id GROUP BY p.id, p.name ORDER BY avg_rating DESC',
      hintPrompt: 'Use JOIN to connect products and reviews. Group by product using GROUP BY. Use AVG() and COUNT() aggregate functions. Order by average rating in descending order.'
    },
    {
      title: 'High-Value Orders',
      difficulty: 'medium',
      description: 'Filter and sort aggregated data.',
      question: 'Which users have total orders exceeding $1000? Show user name and total spent.',
      databaseSchema: {
        tables: [
          {
            name: 'users',
            columns: [
              { name: 'id', type: 'INT', description: 'User ID' },
              { name: 'name', type: 'VARCHAR(100)', description: 'User name' }
            ]
          },
          {
            name: 'orders',
            columns: [
              { name: 'id', type: 'INT', description: 'Order ID' },
              { name: 'user_id', type: 'INT', description: 'User ID foreign key' },
              { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Order amount' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'orders',
        rows: [
          { id: 1, user_id: 1, total_amount: 1329.98 },
          { id: 2, user_id: 1, total_amount: 249.99 }
        ]
      },
      solutionQuery: 'SELECT u.name, SUM(o.total_amount) as total_spent FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name HAVING SUM(o.total_amount) > 1000 ORDER BY total_spent DESC',
      hintPrompt: 'Join users and orders. Use GROUP BY for users. Use SUM() aggregate. Filter with HAVING clause (not WHERE) for aggregates. Order by total_spent descending.'
    },
    {
      title: 'Complex Order Analysis',
      difficulty: 'hard',
      description: 'Multi-table JOIN with complex filtering.',
      question: 'For each user, show their total number of orders, total amount spent, and average order value. Only include users with more than 1 order.',
      databaseSchema: {
        tables: [
          {
            name: 'users',
            columns: [
              { name: 'id', type: 'INT', description: 'User ID' },
              { name: 'name', type: 'VARCHAR(100)', description: 'User name' }
            ]
          },
          {
            name: 'orders',
            columns: [
              { name: 'id', type: 'INT', description: 'Order ID' },
              { name: 'user_id', type: 'INT', description: 'User ID' },
              { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Total' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'orders',
        rows: [
          { id: 1, user_id: 1, total_amount: 1329.98 },
          { id: 2, user_id: 1, total_amount: 249.99 }
        ]
      },
      solutionQuery: 'SELECT u.name, COUNT(o.id) as order_count, SUM(o.total_amount) as total_spent, AVG(o.total_amount) as avg_order_value FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name HAVING COUNT(o.id) > 1 ORDER BY total_spent DESC',
      hintPrompt: 'Join users and orders using JOIN. Group by user. Use COUNT(), SUM(), and AVG() functions. Use HAVING to filter groups with more than 1 order. Order by total spent.'
    },
    {
      title: 'Order Items Analysis',
      difficulty: 'hard',
      description: 'Multiple JOINs with aggregate functions.',
      question: 'Get the total revenue by product category (from order_items), showing which categories generated the most revenue.',
      databaseSchema: {
        tables: [
          {
            name: 'products',
            columns: [
              { name: 'id', type: 'INT', description: 'Product ID' },
              { name: 'name', type: 'VARCHAR(150)', description: 'Product name' },
              { name: 'category', type: 'VARCHAR(50)', description: 'Category' }
            ]
          },
          {
            name: 'order_items',
            columns: [
              { name: 'id', type: 'INT', description: 'Item ID' },
              { name: 'product_id', type: 'INT', description: 'Product ID' },
              { name: 'quantity', type: 'INT', description: 'Quantity' },
              { name: 'unit_price', type: 'DECIMAL(10,2)', description: 'Price per unit' }
            ]
          }
        ]
      },
      sampleDataPreview: {
        table: 'order_items',
        rows: [
          { id: 1, product_id: 1, quantity: 1, unit_price: 1299.99 },
          { id: 2, product_id: 2, quantity: 1, unit_price: 29.99 }
        ]
      },
      solutionQuery: 'SELECT p.category, SUM(oi.quantity * oi.unit_price) as category_revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.category ORDER BY category_revenue DESC',
      hintPrompt: 'Join products and order_items. Calculate revenue as quantity * unit_price. Group by product category. Use SUM() for total revenue. Order by revenue descending.'
    }
  ];

  try {
    // Clear existing assignments
    await Assignment.deleteMany({});

    // Insert all assignments
    const created = await Assignment.insertMany(assignments);
    console.log(`✅ ${created.length} assignments created`);

    return created;
  } catch (err) {
    console.error('Error creating assignments:', err.message);
    throw err;
  }
};

/**
 * Get sample data for preview
 */
export const getAssignmentSampleData = (difficulty) => {
  const samples = {
    easy: 2,
    medium: 2,
    hard: 1
  };
  return samples[difficulty] || 2;
};
