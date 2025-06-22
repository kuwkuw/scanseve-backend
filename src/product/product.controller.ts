import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all products', type: [Product] })
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('latest')
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Max number of products to return (default 10)' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Category to filter by' })
  @ApiQuery({ name: 'store', required: false, type: String, description: 'Store to filter by' })
  @ApiResponse({ status: 200, description: 'Get latest products (optionally filtered)', type: [Product] })
  async getLatest(
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('store') store?: string,
  ): Promise<Product[]> {
    // Parse limit as integer, fallback to 10 if not provided or invalid
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.productService.findLatestFiltered(parsedLimit, category, store);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Create product', type: Product })
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
