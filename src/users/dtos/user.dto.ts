import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'new user`s password' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'new user`s role' })
  readonly role: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'customer id for the user' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
