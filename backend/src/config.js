export const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  },
  postgres: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || 'sql_practice_sandbox',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'password'
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sql_practice'
  },
  llm: {
    provider: process.env.LLM_PROVIDER || 'openai',
    openaiApiKey: process.env.OPENAI_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY
  }
};
