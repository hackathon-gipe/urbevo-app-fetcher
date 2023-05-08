import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class Coordinates {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

class Address {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
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
  coordinates: Coordinates;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  extraData: string;
}
