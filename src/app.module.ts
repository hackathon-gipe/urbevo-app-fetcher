import { Module } from '@nestjs/common';
import { NeedsModule } from './needs/needs.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [NeedsModule, LoggerModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
