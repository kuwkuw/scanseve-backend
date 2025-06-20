<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# ScanSave Backend (NestJS)

This is the backend API for ScanSave, built with [NestJS](https://nestjs.com/).

## Features

- RESTful API for products (`/products`)
- In-memory product storage (easy to swap for PostgreSQL)
- DTO validation with `class-validator`
- Swagger API docs at `/api`
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

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend in development mode:
   ```bash
   npm run start:dev
   ```

3. Open Swagger API docs at [http://localhost:3000/api](http://localhost:3000/api)

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
