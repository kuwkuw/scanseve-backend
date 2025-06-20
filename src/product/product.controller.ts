import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all products', type: [Product] })
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Create product', type: Product })
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }
}
