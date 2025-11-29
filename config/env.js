import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); // to handle multiple env files
export const { PORT, NODE_ENV, DB_HOST, DB_USER, DB_PASS, DB_URI } = process.env;
