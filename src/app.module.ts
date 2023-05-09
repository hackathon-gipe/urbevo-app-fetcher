import { Module } from '@nestjs/common';
import { NeedsModule } from './needs/needs.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    NeedsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
