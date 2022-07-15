import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

import { Order } from './../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orerRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.orerRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orerRepo.findOne(id, {
      relations: ['items', 'items.product'], // <- diciento items.product hace que la relacion vaya mucho mas alla
    });
    if (!order) {
      throw new NotFoundException('Not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orerRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orerRepo.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne(changes.customerId);
      order.customer = customer;
    }
    return this.orerRepo.save(order);
  }

  remove(id: number) {
    return this.orerRepo.delete(id);
  }

  async ordersByCustomer(userId: number) {
    const user = await this.userRepo.findOne(userId, {
      relations: ['customer'],
    });
    return await this.orerRepo.find({
      where: {
        customer: user.customer.id,
      },
      relations: ['items', 'items.product'],
    });
    console.log(test);
    return test;
  }
}
