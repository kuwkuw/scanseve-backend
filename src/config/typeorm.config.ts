import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product],
  // synchronize should be false in production! Use migrations for schema changes.
  synchronize: false,
};
