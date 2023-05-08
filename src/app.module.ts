import { Module } from '@nestjs/common';
import { NeedsModule } from './needs/needs.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NeedsModule, LoggerModule.forRoot(), ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
