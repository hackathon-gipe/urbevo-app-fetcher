import { IsNumber } from 'class-validator';

export class AddLikeDto {
  @IsNumber()
  like: number;
}
