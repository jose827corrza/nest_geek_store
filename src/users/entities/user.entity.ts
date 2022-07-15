import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Customer } from './customer.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: "User's id" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "User's email" })
  @Column({ type: 'varchar', length: '255' })
  email: string;

  @Exclude() // con esto ya no nos va a retornar la contrasena hasheada
  @ApiProperty({ description: "User's password" })
  @Column({ type: 'varchar', length: '255' })
  password: string; //encrypt

  @ApiProperty({ description: "User's role" })
  @Column({ type: 'varchar', length: '255' })
  role: string;

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

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' }) // esta es la que va a cargar la referencia
  customer: Customer;
}
