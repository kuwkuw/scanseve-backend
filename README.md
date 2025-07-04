<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# ScanSave Backend (NestJS)

This is the backend API for ScanSave, built with [NestJS](https://nestjs.com/).

## Features

- RESTful API for products (`/products`)
- Latest products endpoint with filtering (`/products/latest`)
- DTO validation with `class-validator`
- Swagger API docs at `/api`
- In-memory product storage (easy to swap for PostgreSQL)
- Ready for TypeORM/PostgreSQL integration

## Project Structure

```
src/
  app.controller.ts      # Root controller
  app.module.ts          # Root module
  app.service.ts         # Root service
  main.ts                # Entry point
  config/
    typeorm.config.ts    # TypeORM configuration for PostgreSQL
  product/
    dto/
      create-product.dto.ts # DTO for product creation
    product.controller.ts   # Product endpoints
    product.entity.ts       # Product type definition
    product.module.ts       # Product module
    product.service.ts      # Product business logic
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - By default, products are stored in memory.
   - To use PostgreSQL, copy `.env.example` to `.env` and set your DB connection details.
   - See `src/config/typeorm.config.ts` for more info.

3. **Start the backend in development mode:**
   ```bash
   npm run start:dev
   ```

4. **Open Swagger API docs:**
   [http://localhost:3000/api](http://localhost:3000/api)

## API Usage

### Get All Products
- `GET /products`

### Get Latest Products (with optional filtering)
- `GET /products/latest`
- Query parameters:
  - `limit` (number, optional): Max number of products to return (default: 10)
  - `category` (string, optional): Filter by category
  - `store` (string, optional): Filter by store
- Example:
  ```bash
  curl "http://localhost:3000/products/latest?limit=5&category=Electronics&store=Amazon"
  ```

### Create Product
- `POST /products`
- Body: JSON matching the CreateProductDto schema

See the Swagger docs for full details and try out endpoints interactively.

## Testing

- Run all tests:
  ```bash
  npm run test
  ```
- Run e2e tests:
  ```bash
  npm run test:e2e
  ```
- Check test coverage:
  ```bash
  npm run test:cov
  ```

## Database

- By default, products are stored in memory.
- To use PostgreSQL, configure your `.env` file with DB connection details and see `src/config/typeorm.config.ts`.

## Deployment

See [NestJS deployment docs](https://docs.nestjs.com/deployment) for production best practices.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Discord channel](https://discord.gg/G7Qnnhy)
- [Courses](https://courses.nestjs.com/)
- [NestJS Devtools](https://devtools.nestjs.com)
- [Jobs board](https://jobs.nestjs.com)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
