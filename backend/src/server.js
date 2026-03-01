import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectPostgres } from './db/postgres.js';
import { connectMongoDB } from './db/mongodb.js';
import assignmentRoutes from './routes/assignments.js';
import executeRoutes from './routes/execute.js';
import hintRoutes from './routes/hint.js';

const app = express();

app.use(
  cors({
    origin: config.server.frontendUrl,
    credentials: true
  })
);
app.use(express.json());

app.use('/api/assignments', assignmentRoutes);
app.use('/api/execute', executeRoutes);
app.use('/api/hint', hintRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = config.server.port;

async function startServer() {
  try {
   await connectPostgres();
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
