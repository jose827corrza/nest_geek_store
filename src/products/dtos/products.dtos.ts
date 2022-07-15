import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';//Si se usa este partialType puede generar problemas con el dto de update

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `product's stock in the store` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `product's image URL` })
  readonly image: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: ' Reference to the brand which the product belongs',
  })
  readonly brandId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: ' Reference to the categories which the product belongs',
  })
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @Min(0)
  @IsOptional()
  offset: number;

  @IsPositive()
  @IsOptional()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
