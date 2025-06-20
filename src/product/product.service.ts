import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private idCounter = 1;

  findAll(): Product[] {
    return this.products;
  }

  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: this.idCounter++,
      ...dto,
    };
    this.products.push(product);
    return product;
  }
}
