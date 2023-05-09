import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class Coordinates {
  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;
}

class Address {
  @IsOptional()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  zip: string;
}

export class CreateNeedDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @Type(() => Coordinates)
  @IsOptional()
  coordinates: Coordinates;

  @ValidateNested()
  @Type(() => Address)
  @IsNotEmptyObject()
  address: Address;

  @IsOptional()
  extraData: string;
}
