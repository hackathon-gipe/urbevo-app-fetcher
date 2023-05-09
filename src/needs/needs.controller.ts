import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NeedsService } from './needs.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { AddLikeDto } from './dto/add-like.dto';

@Controller('need')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() need: CreateNeedDto) {
    return this.needsService.create(need);
  }

  @Get()
  findBySourceAndLocality(
    @Query('source') source: string,
    @Query('locality') locality: string,
  ) {
    if (!locality) {
      return [];
    }

    return this.needsService.findBySourceAndLocality(locality, source);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  addLikeToNeed(@Param('id') id: string, @Body() addLikeDto: AddLikeDto) {
    return this.needsService.addLikeToNeed(id, addLikeDto.like);
  }
}
