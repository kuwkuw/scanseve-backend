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

  @Get('hot-deals')
  @ApiQuery({ name: 'minDiscount', required: false, type: Number, description: 'Minimum discount percent (default 10)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Max number of deals to return (default 10)' })
  @ApiResponse({ status: 200, description: 'Get hot deals', type: [Product] })
  async getHotDeals(
    @Query('minDiscount') minDiscount?: string,
    @Query('limit') limit?: string,
  ): Promise<Product[]> {
    const parsedDiscount = minDiscount ? parseInt(minDiscount, 10) : 10;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.productService.findHotDeals(parsedDiscount, parsedLimit);
  }

  @Get('categories')
  @ApiResponse({ status: 200, description: 'Get all unique product categories', type: [String] })
  async getCategories(): Promise<string[]> {
    return this.productService.findAllCategories();
  }

  @Get('search')
  @ApiQuery({ name: 'query', required: true, type: String, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Search products', type: [Product] })
  async search(@Query('query') query: string): Promise<Product[]> {
    return this.productService.searchProducts(query);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Create product', type: Product })
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
