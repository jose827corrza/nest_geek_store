import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private cateRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.cateRepo.find();
  }

  async findOne(id: number) {
    const category = await this.cateRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.cateRepo.create(data);
    return this.cateRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.cateRepo.findOne(id);
    this.cateRepo.merge(category, changes);
    return this.cateRepo.save(category);
  }

  remove(id: number) {
    return this.cateRepo.delete(id);
  }
}
