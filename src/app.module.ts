import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
//, ConfigService
import { configService } from './config/config.service';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (config: ConfigService) => config.get('database'),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
})
export default class AppModule {}
