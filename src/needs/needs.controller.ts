import { Body, Controller, Post } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { CreateNeedDto } from './dto/create-need.dto';

@Controller('need')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Post()
  create(@Body() need: CreateNeedDto) {
    return 'This action adds a new need';
  }
}
