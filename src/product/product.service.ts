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
   * Returns products with optional pagination and filtering.
   */
  async findProducts({ limit = 20, offset = 0, category, store }: { limit?: number; offset?: number; category?: string; store?: string } = {}): Promise<{ products: Product[]; total: number }> {
    const where: Partial<Record<keyof Product, any>> = {};
    if (category) where.category = category;
    if (store) where.store = store;
    const [products, total] = await this.productRepository.findAndCount({
      where,
      order: { lastUpdated: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { products, total };
  }

  /**
   * Returns products that are hot deals: oldPrice > price and at least 10% discount
   * @param minDiscount Minimum discount percent (default 10)
   * @param limit Max number of deals to return (default 10)
   */
  async findHotDeals(minDiscount: number = 10, limit: number = 10): Promise<Product[]> {
    // For SQL: (oldPrice IS NOT NULL AND oldPrice > price AND (oldPrice - price)/oldPrice >= minDiscount/100)
    return this.productRepository.createQueryBuilder('product')
      .where('product.oldPrice IS NOT NULL')
      .andWhere('product.oldPrice > product.price')
      .andWhere('(product.oldPrice - product.price) / product.oldPrice >= :minDiscount', { minDiscount: minDiscount / 100 })
      .orderBy('product.lastUpdated', 'DESC')
      .limit(limit)
      .getMany();
  }

  /**
   * Returns a list of unique product categories.
   */
  async findAllCategories(): Promise<string[]> {
    const result = await this.productRepository.createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where("product.category IS NOT NULL AND product.category != ''")
      .getRawMany();
    return result.map((row: { category: string }) => row.category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productRepository.createQueryBuilder('product')
      .where('LOWER(product.name) LIKE :query', { query: `%${query.toLowerCase()}%` })
      .orderBy('product.lastUpdated', 'DESC')
      .getMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }
}
