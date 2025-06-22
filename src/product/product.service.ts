import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }

  /**
   * Returns the latest products, optionally filtered by category or store.
   * @param limit Max number of products to return (default 10)
   * @param category Optional category to filter
   * @param store Optional store to filter
   */
  findLatestFiltered(limit: number = 10, category?: string, store?: string): Promise<Product[]> {
    const where: any = {};
    if (category) where.category = category;
    if (store) where.store = store;
    return this.productRepository.find({
      where,
      order: { lastUpdated: 'DESC' },
      take: limit,
    });
  }
}
