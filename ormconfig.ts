import { DataSource } from 'typeorm';
import { Product } from './src/product/product.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
