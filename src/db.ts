import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  database: 'todo_database',
  host: 'localhost',
  port: 5432
});

export { pool };
