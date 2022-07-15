import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  Index,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

// @Index(['price', 'stock']) y asi se haria si se necesitara indexar mas de un campo, tambien haria falta la migracion
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Product id' })
  id: number;

  @Column({ type: 'varchar', length: '255' })
  @ApiProperty({ description: 'Product name' })
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Product description' })
  description: string;

  // @Index() este decorador hace que el precio sea indexado, tocaria realiar una migracion para que sirviera
  @Column({ type: 'int' })
  @ApiProperty({ description: 'Product price' })
  price: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Product stock in the store' })
  stock: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'Product image url' })
  image: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products) // esta many to one es la que reemplaza al join table
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_has_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];
}
